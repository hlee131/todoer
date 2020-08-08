from rest_framework import viewsets, permissions, response, status
from rest_framework.decorators import action

from .models import Todo
from .serializers import TodoSerializer, CategorySerializer
from .mixins import AddUserMixin

class TodoViewset(AddUserMixin, viewsets.ModelViewSet):
    """
    Viewset for creating, retrieving, deleting, etc. Todo objects. All methdods require user to be authenticated.
    PUT requests not allowed to prevent editing of crucial info such as user primary key. Create function
    customized to add user's primary to data before serializing.
    """
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['get', 'post', 'head', 'patch', 'delete']

    def get_queryset(self):
        """ Queryset is all user's todos """
        return self.request.user.todos.all()

    @action(detail=False, methods=['delete'], permission_classes=(permissions.IsAuthenticated,))
    def clear_todos(self, request):
        """ Clears all a user's completed todos """
        for todo in self.get_queryset():
            if todo.completed:
                todo.delete()

        return response.Response({'Message': 'Completed todos cleared'}, status=status.HTTP_204_NO_CONTENT)

class CategoryViewset(AddUserMixin, viewsets.ModelViewSet):
    """
    API endpoint for retrieving a list of categories, update category, and delete category
    All todos provided by TodoViewset, each categories will be filtered using React.
    """
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['get', 'post', 'head', 'patch', 'delete']

    def get_queryset(self):
        """ Query all of a user's categories """
        return self.request.user.categories.all()

