from django.urls import path
from rest_framework.authtoken import views

from .api import UserAPI, ResetTokenAPI
from .views import reset_password

urlpatterns = [
    path('user', UserAPI.as_view(), name="user"),
    path('token', views.obtain_auth_token, name="token"),
    path('request-reset', ResetTokenAPI.as_view(), name="first-reset"),
    path(r'reset-password', reset_password, name="second-reset")
]