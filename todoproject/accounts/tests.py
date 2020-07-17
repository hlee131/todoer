import json

from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User

from django.urls import reverse

# Create your tests here.
class TestUserAPI(APITestCase):
    def setUp(self):
        """
        First part, all sets up client, url, user that will be used in both test cases.
        Second part, sets up for test_destroy, creates user and grabs token.
        """
        # All
        self.client = APIClient()
        self.url = reverse('user')
        self.user = {
            "username": "asilcoiu314d",
            "password": "dfjerfoda9328",
            "email": "qfui49781@dfj.com"
        }

        # Setup for test_destroy
        # Create User
        user = User.objects.create(username=self.user['password'], email=self.user['email']) 
        user.set_password(self.user['username'])
        user.save()

        # Get Token
        response = self.client.post(reverse('token'), json.dumps({'username': self.user['password'], 
            'password': self.user['username']}), content_type="application/json")
        self.token = response.data['token']

    def test_create(self):
        """
        Test to check user creation endpoint works, tests:

        1. Response code = 201
        2. Response data = user without password
        3. User in database
        """
        response = self.client.post(self.url, json.dumps(self.user), content_type="application/json")
        self.assertEqual(response.status_code, 201, f'Expected 201 but recieved {response.status_code}\n INFO: {response.data}')
        self.assertEqual(response.data, {"username": self.user['username'], 
            "email": self.user['email']}, f'Expected user info without password, but received {response.data}')
        self.assertEqual(User.objects.all().filter(username=self.user['username']).exists(),
            True, f'Expected user but recieved no user')

    def test_destroy(self):
        """
        Test to check that user deletion works, tests: 

        1. Response code = 204
        2. User no longer in database
        """
        # Attatch token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        # Destroy User
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 204, f'Expected 204 but recieved {response.status_code}')
        self.assertEqual(User.objects.all().filter(username=self.user['username']).exists(),
            False, f'Expected no user but recieved user')
            