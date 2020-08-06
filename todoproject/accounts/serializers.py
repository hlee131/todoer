from rest_framework import serializers

from django.contrib.auth.models import User
from django.apps import apps

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