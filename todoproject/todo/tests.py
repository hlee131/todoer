import json

from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token

from django.urls import reverse
from django.contrib.auth.models import User

from .models import Todo

# Create your tests here.
class TestTodoAPI(APITestCase):
    """ Only custom code is creation, so that's all I'm testing """
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('todo-list')

        # Create User
        user = User.objects.create(username='dds', email='something@df.com') 
        user.set_password('insecure')
        user.save()

        # Token
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_create(self):
        """
        Test that todo is properly created, tests:

        1. Response code = 201
        2. Todo in database
        """
        response = self.client.post(self.url, json.dumps({'item': 'Do good'}), 
            content_type='application/json')
        self.assertEqual(response.status_code, 201, 
            f'Expected 201 but recieved {response.status_code}\n INFO: {response.data}')
        items = Todo.objects.all().count()
        self.assertEqual(items, 1, f'Expected 1 item in database but found {items}')