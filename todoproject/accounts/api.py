from rest_framework import generics, mixins, permissions, status
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer

# Register
class UserAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    """ 
    API endpoint for user accepts POST, DELETE, and PATCH, 
    for creating new account, deleting account, and updating user info respectively 
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.is_active = False
        user.save()
        return Response({"Message": "User deactivated"}, status=status.HTTP_204_NO_CONTENT)

    def get_object(self):
        return get_object_or_404(self.get_queryset(), username=self.request.user.username)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = (permissions.AllowAny,)

        elif self.request.method in ['PATCH', 'DELETE']:
            permission_classes = (permissions.IsAuthenticated,)

        return [permission() for permission in permission_classes]