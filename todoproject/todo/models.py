from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=30, unique=True, primary_key=True)

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    # TODO: Add confirmation before deleting category
    category = models.ForeignKey(Category, on_delete=models.CASCADE, 
        related_name="todos_in_category", null=True)
    item = models.CharField(max_length=50)
    added = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
