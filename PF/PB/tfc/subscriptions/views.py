from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from .models import Subscription, SubscriptionPlan, PaymentMethod, PaymentHistory, \
    has_active_subscription, get_period
from classes.models import ClassInstance
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import SubscriptionSerializer, PaymentHistorySerializer, PaymentMethodSerializer, SubscriptionPlanSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination


def cancel_user_subscription(user):
    subscription = get_object_or_404(Subscription, user=user, active=True)
    print("FOUND SUBSCRIPTION")
    billing_period_end = subscription.get_billing_period_end()
    to_unenroll = ClassInstance.objects \
        .filter(userinstanceenroll__user__pk=user.id).filter(date__gt=billing_period_end)
    unenrolled = 0
    for class_instance in to_unenroll:
        try:
            class_instance.unenroll_user(user)
            unenrolled+=1
        except Exception as error:
            print(error)
    subscription.active=False
    subscription.save()
    payment_deletion = subscription.payment_method.delete()
    return {"payment_deletion": payment_deletion, "unenrolled": unenrolled}


# Create your views here.


class UpdatePaymentMethodView(UpdateAPIView):
    """
    Updates a payment method that is owned by user with id `user_id`.
    """
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(PaymentMethod, subscription__user=self.request.user)


class GetPaymentHistory(APIView, LimitOffsetPagination):
    """
    Retrieve payment history and future payment for the current user

    Params:
        `?limit=` - specifies limit per page of the list of payments
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user

        payment_historys = get_list_or_404(PaymentHistory,
                                            user = user_id)
        paginated_payment_historys = self.paginate_queryset(payment_historys, request, view=self)


        payment_history_serializer = PaymentHistorySerializer(paginated_payment_historys,
                                                              many=True)
        response_data = {"payment_history": payment_history_serializer.data}
        if has_active_subscription(user_id):
            subscription = get_object_or_404(Subscription, user=user_id, active=True)
            subscription_plan = get_object_or_404(Subscription,
                                                payment_method=subscription.payment_method)
            future_payment = subscription_plan.subscription_type.price
            response_data["future_payment"] = {"price": future_payment,
                                                "date": subscription_plan.next_payment_date}

        return self.get_paginated_response(response_data)

class SubscriptionPlanDetail(APIView):

    def get(self, request, *args, **kwargs):
        subscription_plan = SubscriptionPlan.objects.all()
        data = [{"price": plan.price, "period": plan.get_period_as_string()} for plan in subscription_plan]

        return Response(data, status=status.HTTP_200_OK)



class HasSubscription(APIView):
    def get(self, request, *args, **kwargs):
        user = self.request.user

        return Response({"has_active_subscription": has_active_subscription(user.pk)})


class SubscriptionDetail(APIView):
    """
    Create, Update and Delete a user's unique Subscription.

    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Subscription, pk=pk)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        user_subscription_plan = get_object_or_404(Subscription, user=user, active=True).subscription_type
        data = {"price": user_subscription_plan.price, "period": user_subscription_plan.get_period_as_string()}
        return Response(data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        orig_subscription = get_object_or_404(Subscription, user=request.user, active=True)
        new_subscription_type_id = request.data["subscription_type_id"]
        altered_subscription = orig_subscription.change_subscription_type(new_subscription_type_id)
        serializer = SubscriptionSerializer(altered_subscription)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        delete_result = cancel_user_subscription(request.user)

        return Response(delete_result, status=status.HTTP_200_OK)
        # drop classes

    def post(self, request, *args, **kwargs):
        if has_active_subscription(request.user.id):
            return Response({"Message": "User already has active subscription"},
                            status=status.HTTP_409_CONFLICT)
        subscription_serializer = SubscriptionSerializer(data=request.data,
                                                         context={'user': request.user})
        if subscription_serializer.is_valid():
            subscription = subscription_serializer.save()
            payment_method = subscription.payment_method

            payment_amount = get_object_or_404(SubscriptionPlan,
                                               pk=subscription.subscription_type.id).price

            payment_history_serializer = PaymentHistorySerializer(
                data={"amount": payment_amount, "payment_method_id": payment_method.id, "user_id": request.user.pk})
            if payment_history_serializer.is_valid():
                payment_history_serializer.save()
            else:
                return Response(payment_history_serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)

            return Response(subscription_serializer.data, status=status.HTTP_201_CREATED)

        return Response(subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
