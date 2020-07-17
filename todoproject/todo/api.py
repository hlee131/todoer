from rest_framework import viewsets, permissions, response, status

from .models import Todo
from .serializers import TodoSerializer

class TodoViewset(viewsets.ModelViewSet):
    """
    Viewset for creating, retrieving, deleting, etc. Todo objects. All methdods require user to be authenticated.
    PUT requests not allowed to prevent editing of crucial info such as user primary key. Create function
    customized to add user's primary to data before serializing.
    """
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['get', 'post', 'head', 'patch', 'delete']

    def create(self, request, *args, **kwargs):
        """ 
        Sets 'user' attr in request.data to request user's primary key. Used to attatch user to todo.
        Additionally, prevents making api requests to change a todo's user as this would override it.
        """
        request.data['user'] = request.user.pk
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        """ Queryset is all user's todos """
        return self.request.user.todos.all()