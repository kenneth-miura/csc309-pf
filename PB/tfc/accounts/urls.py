from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import  RetrieveUserView, CreateUserView, UpdateUserProfileView, RetrieveClassScheduleView, RetrieveClassHistoryView, EnrolledClassesView

app_name = 'accounts'

urlpatterns = [
    path('register/', CreateUserView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('info/', RetrieveUserView.as_view()),
    path('update/', UpdateUserProfileView.as_view()),
    path('schedule/', RetrieveClassScheduleView.as_view()),
    path('history/', RetrieveClassHistoryView.as_view()),
    path('enrolled/', EnrolledClassesView.as_view())
]

# ABOUT:  path('login/', ...)
# The login flow uses the JWT built-in view to return an access token and a refresh token associated
# with the user that is logging in. The frontned should send the username and password to the backend as
# the payload.
# The Frontend should pull the "access" token from the 'return' of its call to the API
# and saves that access token in memory until it expires.
