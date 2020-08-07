import secrets
import hashlib
import os

from rest_framework import serializers

from django.contrib.auth.models import User
from django.apps import apps

from .models import ResetToken

class UserSerializer(serializers.ModelSerializer):
    """ Serializer for default user model from django """
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """ 
        1. Customize create function to ensure that user's password is hash and not raw 
        2. Create a no_category category model for todo items that don't have category attatched by user
        """
        user = User.objects.create(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        category_model = apps.get_model('todo', 'Category')
        no_category = category_model(user=user, name='no_category')
        no_category.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        try:
            instance.set_password(validated_data['password'])
        except KeyError:
            pass
        instance.save()
        return instance

class ResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResetToken
        fields = ['email']

    def validate_email(self, value):
        try: user = User.objects.get(email=value)
        except User.DoesNotExist: raise serializers.ValidationError('No user')
        return value
         
    def create(self, validated_data):
        email = validated_data['email']
        unhashed_token = secrets.token_urlsafe()
        salt = os.urandom(32)
        key = hashlib.pbkdf2_hmac('sha256', unhashed_token.encode('utf-8'), salt, 1000)
        hashed_token = salt + key
        user = User.objects.get(email=email)
        token = ResetToken.objects.create(token=hashed_token, user=user, email=email)
        token.save()
        return (unhashed_token, email)
        