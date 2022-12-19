from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from .models import Subscription, SubscriptionPlan, PaymentMethod, PaymentHistory, \
    has_active_subscription, get_period, has_payment_method
from classes.models import ClassInstance
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import SubscriptionSerializer, PaymentHistorySerializer, PaymentMethodSerializer, SubscriptionSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import mixins
from django.core.paginator import Paginator


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
    return { "unenrolled": unenrolled}


# Create your views here.


class PaymentMethodView(GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(PaymentMethod, user=self.request.user)
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        print(request.data)
        return self.update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        serializer = PaymentMethodSerializer(data= request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(request.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GetNextPayment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        subscription_plan = get_object_or_404(Subscription,
                                            user =user, active=True)
        future_payment = subscription_plan.subscription_type.price
        return Response({
            "price": future_payment,
            "date": subscription_plan.next_payment_date
        })


class GetPaymentHistory(APIView, LimitOffsetPagination):
    """
    Retrieve payment history and future payment for the current user

    Params:
        `?page=` - Specifies the page # of the list of studios.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = self.request.user

        payment_historys = get_list_or_404(PaymentHistory,
                                            user = user_id)
        serialized_payment_history = [PaymentHistorySerializer(payment_history).data for payment_history in payment_historys]
        page_payment_history_lst = Paginator(serialized_payment_history, 10)
        pg = request.GET.get("page")

        if pg is not None:
            page_num = int(pg)
            curr_page = page_payment_history_lst.get_page(page_num)
            return Response({
                "has_next": curr_page.has_next(),
                "total_count": page_payment_history_lst.count,
                "num_pages": page_payment_history_lst.num_pages,
                "items": curr_page.object_list
            })
        else:
            return Response(serialized_payment_history)





class SubscriptionPlanDetail(APIView):

    def get(self, request, *args, **kwargs):
        subscription_plan = SubscriptionPlan.objects.all()
        data = {}
        for plan in subscription_plan:
            data[plan.get_period_as_string()]= {
                "price": plan.price,
                "id": plan.id
            }

        user = self.request.user
        subscription_query = Subscription.objects.filter(user=user).filter(active=True)
        if subscription_query.exists():
            user_subscription_plan = subscription_query.get().subscription_type
            data["user_plan"] = user_subscription_plan.get_period_as_string()
        return Response(data, status=status.HTTP_200_OK)


class HasSubscription(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = self.request.user

        return Response({"has_active_subscription": has_active_subscription(user.pk)})


class HasPaymentMethod(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = self.request.user
        return Response({"has_payment_method": has_payment_method(user.pk) })

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

    def put(self, request, *args, **kwargs):
        """
            Only overwrites the subscription plan, not payment
        """
        subscription_query = Subscription.objects.filter(active=True).filter(user=request.user)
        if subscription_query.exists():
            # overwrite pre-existing
            orig_subscription = subscription_query.get()
            new_subscription_type_id = request.data["subscription_type_id"]
            altered_subscription = orig_subscription.change_subscription_type(new_subscription_type_id)
            serializer = SubscriptionSerializer(altered_subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            if not has_payment_method(request.user.id):
                return Response({"Message": "User has no payment method"}, status=status.HTTP_409_CONFLICT)
            subscription_serializer = SubscriptionSerializer(data=request.data,
                                                            context={'user': request.user})
            if subscription_serializer.is_valid():
                subscription = subscription_serializer.save()
                return Response(subscription_serializer.data, status=status.HTTP_201_CREATED)
            return Response(subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        if not has_payment_method(request.user.id):
            return Response({"Message": "User has no payment method"},
                            status=status.HTTP_409_CONFLICT)
        subscription_serializer = SubscriptionSerializer(data=request.data, context={'user': request.user})



        if subscription_serializer.is_valid():
            subscription = subscription_serializer.save()

            return Response(subscription_serializer.data, status=status.HTTP_201_CREATED)


        return Response(subscription_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
