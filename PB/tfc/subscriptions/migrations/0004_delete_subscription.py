# Generated by Django 4.1.3 on 2022-11-14 19:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0003_alter_subscriptionplan_period'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Subscription',
        ),
    ]
