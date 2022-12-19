from rest_framework import serializers
from classes.models import ClassOffering, TimeInterval, ClassInstance
from studios.serializers import StudioSerializer
from .models import ClassOffering, ClassInstance, TimeInterval


class ClassOfferingSerializer(serializers.ModelSerializer):
    studio = StudioSerializer(read_only=True)
    studio_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ClassOffering
        fields = ["id", "name", "description", "coach", "capacity", "start_recursion_date", "end_recursion_date", "studio",
                  "studio_id"]

class TimeIntervalSerializer(serializers.ModelSerializer):
    class_offering = ClassOfferingSerializer(read_only=True)

    class Meta:
        model = TimeInterval
        fields = ["start_time", "end_time", "day", "class_offering"]


class ClassInstanceSerializer(serializers.ModelSerializer):
    class_offering = ClassOfferingSerializer(read_only=True)
    time_interval = TimeIntervalSerializer(read_only=True)
    current_user_enrolled = serializers.SerializerMethodField()

    def get_current_user_enrolled(self, obj):
        user = self.context.get("user")
        if user:
            print(obj.userinstanceenroll_set)
            return obj.userinstanceenroll_set.filter(user=user).exists()
        return None

    class Meta:
        model = ClassInstance
        fields = ["id", "date", "capacity_count", "class_offering", "time_interval", "current_user_enrolled"]

