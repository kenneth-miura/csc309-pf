# Generated by Django 4.1.3 on 2022-11-16 21:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0007_userenroll_timeslot'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userenroll',
            name='timeslot',
        ),
        migrations.AddField(
            model_name='classinstance',
            name='time_interval',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='classes.timeinterval'),
            preserve_default=False,
        ),
    ]
