# Generated by Django 4.1.3 on 2022-12-04 19:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('classes', '0009_alter_classoffering_end_recursion_date'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserEnroll',
            new_name='UserInstanceEnroll',
        ),
        migrations.CreateModel(
            name='UserOfferingEnrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_offering', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.classoffering')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
