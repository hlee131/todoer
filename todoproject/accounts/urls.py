from django.urls import path
from rest_framework.authtoken import views

from .api import UserAPI

urlpatterns = [
    path('user', UserAPI.as_view(), name="user"),
    path('token', views.obtain_auth_token, name="token")
]