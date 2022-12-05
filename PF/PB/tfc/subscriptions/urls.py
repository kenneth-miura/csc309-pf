from django.urls import path
from .views import (
    SubscriptionDetail,
    UpdatePaymentMethodView,
    GetPaymentHistory,
    SubscriptionPlanDetail,
    HasSubscription
)

app_name = 'subscriptions'

urlpatterns = [
    path('subscription/', SubscriptionDetail.as_view()),
    path('payment_method/', UpdatePaymentMethodView.as_view()),
    path('payment_history/', GetPaymentHistory.as_view()),
    path("plans/", SubscriptionPlanDetail.as_view()),
    path("has_subscription/", HasSubscription.as_view() )
]
