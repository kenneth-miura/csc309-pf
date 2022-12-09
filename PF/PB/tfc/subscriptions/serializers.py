from .models import Subscription, SubscriptionPlan, PaymentMethod, PaymentHistory
from accounts.models import TFCUser
from accounts.serializers import TFCUserSerializer
from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers
import datetime
from dateutil.relativedelta import relativedelta
from django.shortcuts import get_object_or_404


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ["price", "period"]


class PaymentMethodSerializer(serializers.ModelSerializer):
    user = TFCUserSerializer(read_only=True)
    class Meta:
        model = PaymentMethod
        fields = ["card_number", "security_code", "user"]
    def create(self, validated_data):
        user = self.context.get("user")

        card_number = validated_data['card_number']
        security_code = validated_data['security_code']

        return PaymentMethod.objects.create(user=user, card_number=card_number, security_code=security_code)



class PaymentHistorySerializer(serializers.ModelSerializer):
    payment_method = PaymentMethodSerializer(read_only=True)
    payment_method_id = serializers.IntegerField(write_only=True)
    user = TFCUserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)


    def create(self, validated_data):
        user_id = validated_data['user_id']
        user = get_object_or_404(TFCUser, pk=user_id)

        payment_method_id = validated_data['payment_method_id']
        payment_method = get_object_or_404(PaymentMethod, pk=payment_method_id)
        return PaymentHistory.objects.create(amount=validated_data['amount'], payment_method=payment_method, user=user)

    class Meta:
        model = PaymentHistory
        fields = ["amount", "date_time", "payment_method", "payment_method_id", "user", "user_id"]



class SubscriptionSerializer(serializers.ModelSerializer):
    subscription_type = SubscriptionPlanSerializer(read_only=True)

    subscription_type_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        user = self.context.get("user")

        subscription_type_id = validated_data["subscription_type_id"]
        subscription_type = get_object_or_404(SubscriptionPlan, pk=subscription_type_id).period

        last_payment_date = datetime.date.today()
        next_payment_date = None
        if subscription_type == 0:
            # yearly
            next_payment_date = last_payment_date + relativedelta(years=1)
        elif subscription_type == 1:
            # monthly
            next_payment_date = last_payment_date + relativedelta(months=1)

        subscription = Subscription.objects.create( user=user,
                                                   next_payment_date=next_payment_date,
                                                   **validated_data)
        return subscription

    class Meta:
        model = Subscription
        fields = ["subscription_type",  "subscription_type_id"]



