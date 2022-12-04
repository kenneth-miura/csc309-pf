# Generated by Django 4.1.3 on 2022-11-14 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_tfcuser_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tfcuser',
            name='avatar',
            field=models.ImageField(null=True, upload_to='user-images'),
        ),
        migrations.AlterField(
            model_name='tfcuser',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='tfcuser',
            name='first_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='tfcuser',
            name='last_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='tfcuser',
            name='phone_number',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
