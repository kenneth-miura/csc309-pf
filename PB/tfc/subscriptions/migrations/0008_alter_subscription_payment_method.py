# Generated by Django 4.1.3 on 2022-11-17 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0007_subscription_next_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='payment_method',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subscriptions.paymentmethod'),
        ),
    ]