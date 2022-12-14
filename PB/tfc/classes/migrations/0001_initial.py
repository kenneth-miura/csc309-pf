# Generated by Django 4.1.3 on 2022-11-13 20:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('studios', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('capacity_count', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ClassOffering',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=200)),
                ('coach', models.CharField(max_length=200)),
                ('times', models.CharField(max_length=200)),
                ('capacity', models.PositiveIntegerField()),
                ('end_recursion_date', models.DateField()),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
        migrations.CreateModel(
            name='UserEnroll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_instance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.classinstance')),
                ('class_offering', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.classoffering')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TimeInterval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('day', models.CharField(choices=[(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday')], max_length=1)),
                ('class_offering', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.classoffering')),
            ],
        ),
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=200)),
                ('class_offering', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.classoffering')),
            ],
        ),
        migrations.AddField(
            model_name='classinstance',
            name='class_offering',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_offering', to='classes.classoffering'),
        ),
    ]
