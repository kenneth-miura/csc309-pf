from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import TFCUser


class TFCUserSerializer(serializers.ModelSerializer):
    # username = serializers.ReadOnlyField()

    class Meta:
        model = TFCUser
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_number', 'avatar']

    def create(self, validated_data):
        user = TFCUser(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            avatar=validated_data['avatar'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):
        keys = validated_data.keys()
        print(keys)

        if 'username' in keys:
            instance.username = validated_data['username']
            instance.save()

        if 'first_name' in keys:
            instance.first_name = validated_data['first_name']
            instance.save()

        if 'last_name' in keys:
            instance.last_name = validated_data['last_name']
            instance.save()

        if 'email' in keys:
            instance.email = validated_data['email']
            instance.save()

        if 'phone_number' in keys:
            instance.phone_number = validated_data['phone_number']
            instance.save()

        if 'password' in keys:
            instance.set_password(validated_data['password'])
            instance.save()

        if 'avatar' in keys:
            instance.avatar = validated_data['avatar']
            instance.save()

        return instance