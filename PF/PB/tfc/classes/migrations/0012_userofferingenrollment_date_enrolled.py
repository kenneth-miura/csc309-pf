# Generated by Django 4.1.3 on 2022-12-05 17:18

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0011_classoffering_start_recursion_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='userofferingenrollment',
            name='date_enrolled',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
