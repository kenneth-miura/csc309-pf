from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from django.core.exceptions import MultipleObjectsReturned
from rest_framework import status
from rest_framework.generics import RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from .serializers import TFCUserSerializer
from .models import TFCUser
from classes.models import ClassOffering, UserInstanceEnroll, ClassInstance, TimeInterval
from classes.serializers import ClassOfferingSerializer, ClassInstanceSerializer
from datetime import *
from rest_framework import mixins


# Create your views here.

# This takes a POST request.
class CreateUserView(APIView):
    """
    Registers a new user.

    The form data must include:
        `username`, `password`, `email`, `first_name`, `last_name`, `phone_number`, `avatar` - an Image
    """
    serializer_class = TFCUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = TFCUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        if "username" in request.data and TFCUser.objects.filter(username=request.data["username"]).exists:
            return Response({"Message": "User already exists"}, status=status.HTTP_409_CONFLICT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RetrieveUserView(RetrieveAPIView):
    """
    Retrieves a studio with the id `studio_id`.
    """
    serializer_class = TFCUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id

        return get_object_or_404(TFCUser, id=user_id)


# Use PUT when you are updating *all* fields of the user profile.
# Use PATCH when updating *one* field of the user profile.
class UpdateUserProfileView(UpdateAPIView):
    """
    Updates the user's profile with user id `user_id`.

    The payload data can include:
        `username`, `password`, `email`, `first_name`, `last_name`, `phone_number`, `avatar` - an Image
    """

    permission_classes = [IsAuthenticated]
    serializer_class = TFCUserSerializer

    def get_object(self):
        curr = self.request.user

        return get_object_or_404(TFCUser, id=curr.id)


class RetrieveClassScheduleView(APIView):
    """
    Returns a list of ClassOfferings that the user is enrolled in.

    Params:
        `?page=` - Specifies the page # of the class schedule list.
    """
    serializer_class = ClassOfferingSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id

        filtered_lst = UserInstanceEnroll.objects.filter(user__id=user_id)

        schedule = list(set([o.class_offering for o in filtered_lst]))

        schedule_sorted = []

        for s in schedule:
            try:
                time_interval = TimeInterval.objects.get(class_offering=s)
            except MultipleObjectsReturned:
                time_interval = TimeInterval.objects.filter(class_offering=s).first()

            schedule_sorted.append((s, time_interval.day, time_interval.start_time))

        schedule_sorted.sort(key=lambda tup: (tup[1], tup[2]))

        serialized_lst = [ClassOfferingSerializer(c[0]).data for c in schedule_sorted]

        total_count = len(serialized_lst)

        page_class_lst = Paginator(serialized_lst, 10)

        pg = request.GET.get("page")

        if pg is not None:
            page_num = int(pg)

            # If you have only 2 pages, but the query param sends in page=3,
            # it will just return the last page (page 2)
            return Response({"total_count": total_count, "items": page_class_lst.get_page(page_num).object_list})
        else:
            # Defaults to returning the whole list of studios if no page is given.
            return Response(serialized_lst)


class EnrolledClassesView(APIView):

    serializer_class = ClassInstanceSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        today = datetime.now()

        enroll_objs = UserInstanceEnroll.objects.filter(user__id=user_id)

        filtered_history = []

        for c in enroll_objs:
            c_instance = c.class_instance
            c_offering = c.class_offering

            try:
                time_interval = TimeInterval.objects.get(class_offering=c_offering)
            except MultipleObjectsReturned:
                time_interval = TimeInterval.objects.filter(class_offering=c_offering).first()

            combined_date = datetime.combine(c_instance.date, time_interval.start_time)

            if combined_date > today:
                filtered_history.append((c_instance, combined_date))

        filtered_history.sort(key=lambda tup: tup[1])

        serialized_lst = [ClassInstanceSerializer(o[0], context={'user': request.user}).data for o in filtered_history]

        total_count = len(serialized_lst)

        page_class_lst = Paginator(serialized_lst, 10)

        pg = request.GET.get("page")

        if pg is not None:
            page_num = int(pg)

            # If you have only 2 pages, but the query param sends in page=3,
            # it will just return the last page (page 2)
            return Response({"total_count": total_count, "items": page_class_lst.get_page(page_num).object_list})
        else:
            # Defaults to returning the whole list of studios if no page is given.
            return Response(serialized_lst)


class RetrieveClassHistoryView(APIView):
    """
    Returns a list of ClassInstances that the user with `user_id` has attended in the past.

    Params:
        `?page=` - Specifies the page # of the class history list.
    """
    serializer_class = ClassInstanceSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = datetime.now()
        user_id = request.user.id

        enroll_objs = UserInstanceEnroll.objects.filter(user__id=user_id)

        filtered_history = []

        for c in enroll_objs:
            c_instance = c.class_instance
            c_offering = c.class_offering

            try:
                time_interval = TimeInterval.objects.get(class_offering=c_offering)
            except MultipleObjectsReturned:
                time_interval = TimeInterval.objects.filter(class_offering=c_offering).first()

            combined_date = datetime.combine(c_instance.date, time_interval.start_time)

            if combined_date < today:
                filtered_history.append((c_instance, combined_date))

        filtered_history.sort(key=lambda tup: tup[1])

        serialized_lst = [ClassInstanceSerializer(o[0]).data for o in filtered_history]

        total_count = len(serialized_lst)

        page_class_lst = Paginator(serialized_lst, 10)

        pg = request.GET.get("page")

        if pg is not None:
            page_num = int(pg)

            # If you have only 2 pages, but the query param sends in page=3,
            # it will just return the last page (page 2)
            return Response({"total_count": total_count, "items": page_class_lst.get_page(page_num).object_list})
        else:
            # Defaults to returning the whole list of studios if no page is given.
            return Response(serialized_lst)
