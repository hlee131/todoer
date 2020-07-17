from rest_framework import generics, mixins, permissions, status
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer

# Register
class UserAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    """ API endpoint for user accepts POST and DELETE, for creating new account and deleting account respectively """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        destroy = self.destroy(request, *args, **kwargs)
        return Response({"Message": "User deleted"}, status=destroy.status_code)

    def get_object(self):
        return get_object_or_404(self.get_queryset(), username=self.request.user.username)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = (permissions.AllowAny,)

        elif self.request.method == 'DELETE':
            permission_classes = (permissions.IsAuthenticated,)

        return [permission() for permission in permission_classes]