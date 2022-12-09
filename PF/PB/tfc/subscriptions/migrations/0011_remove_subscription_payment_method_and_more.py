# Generated by Django 4.1.3 on 2022-12-08 23:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscriptions', '0010_paymenthistory_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscription',
            name='payment_method',
        ),
        migrations.AddField(
            model_name='paymentmethod',
            name='user',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
