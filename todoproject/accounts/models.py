from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.db import models

from rest_framework.authtoken.models import Token

def get_expiration_date():
    return datetime.now() + timedelta(weeks=1)

class ResetToken(models.Model):
    token = models.BinaryField(bytes) 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='token')
    expiration_date = models.DateField(default=get_expiration_date)
    email = models.EmailField()