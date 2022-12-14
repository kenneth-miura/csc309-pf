from django.db import models
from django.db.models import CASCADE
from studios.models import Studio
from accounts.models import TFCUser
import datetime
from django.db.models.signals import pre_save
from django.dispatch import receiver
import dateutil.relativedelta as rd
import calendar
from .exceptions import EnrollmentException, CapacityException, NotSubscribedException, \
    TargetInPastException
from subscriptions.models import has_active_subscription, will_have_active_subscription
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError

# based on https://stackoverflow.com/questions/5966629/django-days-of-week-representation-in-model
DAYS_OF_WEEK = (
    (0, 'Monday'),
    (1, 'Tuesday'),
    (2, 'Wednesday'),
    (3, 'Thursday'),
    (4, 'Friday'),
    (5, 'Saturday'),
    (6, 'Sunday'),
)


def end_recursion_only_gte_today(value):
    today = datetime.date.today()

    if value < today:
        raise ValidationError("End_Recursion_Date cannot be in the past")

def get_past_weekday(date, day_num):
    relativedelta = None
    match day_num:
        case 0:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.MONDAY)
        case 1:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.TUESDAY)
        case 2:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.WEDNESDAY)
        case 3:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.THURSDAY)
        case 4:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.FRIDAY)
        case 5:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.SATURDAY)
        case 6:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.FRIDAY)
    return date - relativedelta


def get_next_weekday(date, day_num):
    """

    Args:
        date:
        day_num: Expects the day field from the DB


    """
    relativedelta = None
    match day_num:
        case 0:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.MONDAY)
        case 1:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.TUESDAY)
        case 2:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.WEDNESDAY)
        case 3:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.THURSDAY)
        case 4:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.FRIDAY)
        case 5:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.SATURDAY)
        case 6:
            relativedelta = rd.relativedelta(days=0, weekday=calendar.FRIDAY)
    return date + relativedelta


class DateTimeInterval():
    def __init__(self, date, start, end):
        self.date = date
        self.start = start
        self.end = end

    def __str__(self):
        return f"date is: {self.date}, start time is {self.start}, end time is {self.end}"


class ClassOffering(models.Model):
    name = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=200, null=False)
    coach = models.CharField(max_length=200, null=False)
    capacity = models.PositiveIntegerField(null=False)
    end_recursion_date = models.DateField(validators=[end_recursion_only_gte_today])
    start_recursion_date = models.DateField()
    studio = models.ForeignKey(to=Studio, on_delete=CASCADE)

    def delete_future_instances(self):
        today = datetime.date.today()
        class_instances = self.classinstance_set.filter(date__gte=today)
        class_instances.delete()

    def unenroll_user(self, user):
        if not has_active_subscription(user.id):
            raise NotSubscribedException

        offering_enrollment = self.userofferingenrollment_set.filter(user=user)
        # delete the users enrollment
        if offering_enrollment.exists():
            offering_enrollment.delete()
        # future occurrences
        today = datetime.date.today()
        future_class_instances = self.classinstance_set.filter(date__gte=today)
        num_deleted = 0
        for class_instance in future_class_instances:
            try:
                enrolled_class = class_instance.unenroll_user(user)
                num_deleted += 1
            except Exception:
                # ignore these
                pass
        return num_deleted

    def enroll_user(self, user):
        if not has_active_subscription(user.id):
            raise NotSubscribedException
        enrolled_classes = []

        if not self.userofferingenrollment_set.filter(user=user).exists():
            UserOfferingEnrollment.objects.create(class_offering=self, user=user)
        # future occurrences
        today = datetime.date.today()
        future_class_instances = self.classinstance_set.filter(date__gte=today)
        for class_instance in future_class_instances:
            print("trying to enroll in a class instance")
            try:
                enrolled_class = class_instance.enroll_user(user)
                enrolled_classes.append(enrolled_class)
            except Exception as e:
                print(e)
                # ignore these
                pass
        return enrolled_classes


# https://stackoverflow.com/questions/1355150/when-saving-how-can-you-check-if-a-field-has-changed
@receiver(pre_save, sender=ClassOffering)
def handle_recursion_date_change(sender, instance, **kwargs):
    try:
        old_obj = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        # Object is new, so we do nothing
        return

    # handle changing start date
    if not old_obj.start_recursion_date == instance.start_recursion_date:
        old_start_recursion_date = old_obj.start_recursion_date
        new_start_recursion_date = instance.start_recursion_date

        if new_start_recursion_date > old_start_recursion_date:
            for time_interval in instance.timeinterval_set.all():
                time_interval.delete_instances_before_date(new_recursion_date)
        elif new_start_recursion_date < old_start_recursion_date:
            for time_interval in instance.timeinterval_set.all():
                time_interval.generate_past_class_instances(new_start_recursion_date, old_start_recursion_date)

    # handle if end recursion date has changed
    if not old_obj.end_recursion_date == instance.end_recursion_date:
        # field has changed
        old_recursion_date = old_obj.end_recursion_date
        new_recursion_date = instance.end_recursion_date
        if new_recursion_date > old_recursion_date:
            # gen new class instances
            for time_interval in instance.timeinterval_set.all():
                earliest_new_instance_date = old_recursion_date + rd.relativedelta(days=1)
                time_interval.generate_future_class_instances(earliest_new_instance_date)
            pass
        elif new_recursion_date < old_recursion_date:
            for time_interval in instance.timeinterval_set.all():
                time_interval.delete_instances_after_date(new_recursion_date)


class TimeInterval(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    day = models.IntegerField(choices=DAYS_OF_WEEK)
    class_offering = models.ForeignKey(to=ClassOffering, on_delete=CASCADE)

    def delete_instances_after_date(self, exclusive_date):
        """

        Args:
            exclusive_date:  EXCLUSIVE date to delete after


        """

        self.classinstance_set.filter(date__gt=exclusive_date).delete()

    def delete_instances_before_date(self, exclusive_date):
        self.classinstance_set.filter(date__lt=exclusive_date).delete()

    def generate_past_class_instances(self, inclusive_start_date, exclusive_end_date):
        offering = self.class_offering
        next_class_date = get_past_weekday(inclusive_start_date, self.day)
        users_enrolled = [(user_offering_enroll.user, user_offering_enroll.date_enrolled) for user_offering_enroll in offering.userofferingenrollment_set.all()]

        while next_class_date < exclusive_end_date:
            class_instance = ClassInstance(date=next_class_date, class_offering=offering,
                                           time_interval=self)
            class_instance.save()
            for user,enroll_date in users_enrolled:
                try:
                    class_instance.enroll_user(user, enroll_date=enroll_date)
                except TargetInPastException as e:
                    print(e)
            next_class_date += rd.relativedelta(days=7)




    def generate_future_class_instances(self, start_date):
        """

        Args:
            start_date: INCLUSIVE start date (if time is correct) to start generating future class instances from

        Returns:

        """
        offering = self.class_offering
        end_recursion_date = offering.end_recursion_date
        next_class_date = get_next_weekday(start_date, self.day)

        users_enrolled = [user_offering_enroll.user for user_offering_enroll in offering.userofferingenrollment_set.all()]
        while next_class_date <= end_recursion_date:
            class_instance = ClassInstance(date=next_class_date, class_offering=offering,
                                           time_interval=self)

            class_instance.save()
            for user in users_enrolled:
                class_instance.enroll_user(user)
            next_class_date += rd.relativedelta(days=7)
        # can't use bulk create b/c I need the pks, which it doesn't support


    def clear_class_instances(self):
        self.classinstance_set.all().delete()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.clear_class_instances()
        recursion_start_date = self.class_offering.start_recursion_date
        self.generate_future_class_instances(recursion_start_date)


# https://stackoverflow.com/questions/13014411/django-post-save-signal-implementation


class Keyword(models.Model):
    keyword = models.CharField(max_length=200, null=False)
    class_offering = models.ForeignKey(to=ClassOffering, on_delete=CASCADE)


class ClassInstance(models.Model):
    date = models.DateField()
    capacity_count = models.PositiveIntegerField(default=0, null=False)
    class_offering = models.ForeignKey(to=ClassOffering, on_delete=CASCADE)
    time_interval = models.ForeignKey(to=TimeInterval, on_delete=CASCADE)

    def __str__(self):
        return f"pk: {self.pk}, date: {self.date}, capacity: {self.capacity_count}"

    def user_enrolled(self, user):
        return self.userinstanceenroll_set.filter(user=user).exists()

    def unenroll_user(self, user):
        if self.date <= datetime.date.today():
            raise TargetInPastException
        if not has_active_subscription(user.id):
            raise NotSubscribedException
        if not self.user_enrolled(user):
            raise EnrollmentException
        if self.capacity_count == 0:
            raise CapacityException
        self.capacity_count -= 1
        user_enrollment = get_object_or_404(UserInstanceEnroll, class_instance=self, user=user)
        user_enrollment.delete()
        self.save()

    def enroll_user(self, user, enroll_date=datetime.date.today()):
        # check that it is in the future
        if self.date <= datetime.date.today():
            raise TargetInPastException
        # check for subscription
        if not has_active_subscription(user.id):
            raise NotSubscribedException("User is not subscribed right now")
        if not will_have_active_subscription(user.id, date=self.date):
            raise NotSubscribedException(f"User will not have active subscription by {enroll_date}" )
        if self.capacity_count == self.class_offering.capacity:
            raise CapacityException
        if self.user_enrolled(user):
            raise EnrollmentException
        if enroll_date > self.date:
            raise TargetInPastException
        self.capacity_count += 1
        user_enroll = UserInstanceEnroll.objects.create(class_instance=self,
                                                class_offering=self.class_offering, user=user)
        user_enroll.save()
        self.save()

        return self


class UserInstanceEnroll(models.Model):
    class_instance = models.ForeignKey(to=ClassInstance, on_delete=CASCADE)
    class_offering = models.ForeignKey(to=ClassOffering, on_delete=CASCADE)
    user = models.ForeignKey(to=TFCUser, on_delete=CASCADE)

    def unenroll(self):
        """

        Returns: True if successfully unenrolled, false if the capacity is already at 0

        """

        if self.class_offering.capacity == 0:
            return False
        self.class_instance.capacity -= 1
        self.class_instance.save()
        self.delete()

class UserOfferingEnrollment(models.Model):
    class_offering = models.ForeignKey(to=ClassOffering, on_delete=CASCADE)
    user = models.ForeignKey(to=TFCUser, on_delete=CASCADE)
    date_enrolled = models.DateField(auto_now_add=True)
    # This
    pass
