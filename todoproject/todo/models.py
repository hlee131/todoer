from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    item = models.CharField(max_length=50)
    added = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
