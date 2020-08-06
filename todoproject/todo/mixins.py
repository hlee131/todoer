from rest_framework import response, status
from rest_framework.serializers import ValidationError

class AddUserMixin:
    """ This mixin shares the create function used in Category and Todo Viewset """ 

    def _override_user(self, request, *args, **kwargs):
        """ 
        Sets 'user' attr in request.data to request user's primary key. Used to attatch user to category/todo.
        Additionally, prevents making api requests to change a todo/category's user as this would override 
        it to whoever is making said request.
        """
        request.data['user'] = request.user.pk
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return serializer

    def create(self, request, *args, **kwargs):
        serializer = self._override_user(request)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class ValidateUserMixin:
    """ This is a mixin to share the user validator between serializers """
    def validate_user(self, value):
        if self.instance and self.instance.user.pk != value:
            raise ValidationError('You may not edit user')
        return value
