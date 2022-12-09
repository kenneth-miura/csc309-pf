from django.urls import path
from .views import (
    SubscriptionDetail,
    PaymentMethodView,
    GetPaymentHistory,
    SubscriptionPlanDetail,
    HasSubscription,
    GetNextPayment

)

app_name = 'subscriptions'

urlpatterns = [
    path('subscription/', SubscriptionDetail.as_view()),
    path('payment_method/', PaymentMethodView.as_view()),
    path('payment_history/', GetPaymentHistory.as_view()),
    path("plans/", SubscriptionPlanDetail.as_view()),
    path("has_subscription/", HasSubscription.as_view() ),
    path("next_payment/", GetNextPayment.as_view() )
]
