from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Todo, Category
from .mixins import ValidateUserMixin

class TodoSerializer(ValidateUserMixin, ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'item', 'added', 'completed', 'user']

class CategorySerializer(ValidateUserMixin, ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'user', 'name']
    