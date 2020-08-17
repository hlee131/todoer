import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
import os

from rest_framework import generics, mixins, permissions, status
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

from .serializers import UserSerializer, ResetTokenSerializer
from .models import ResetToken

class UserAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    """ 
    API endpoint for user accepts POST, DELETE, and PATCH, 
    for creating new account, deleting/deactivating account, and updating user info respectively 
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # TODO: Wrapping required?
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

class ResetTokenAPI(generics.CreateAPIView):
    """ 
    API endpoint for creating password reset tokens
    Also responsible for sending out reset emails
    """
    serializer_class = ResetTokenSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Delete past token if one exists, generate new one
            try: User.objects.get(email=request.data.get('email')).token.delete()
            except: pass
            token, email = self.perform_create(serializer)
            _send_email(token, email)

        else:
            print('invalid')
            pass

        return Response({"Message": "Email sent to server"}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        return serializer.save()
        
def _send_email(token, email):
    sender = 'scriptingtesting197@gmail.com'
    receiver = email
    file_path = str(Path(os.getcwd()).parent) + r'/SECRETS.txt'
    with open(file_path, 'r') as f:
        password = f.readlines()[0]

    message = MIMEMultipart("alternative")
    message['Subject'] = "Todoer Password Reset"
    message['From'] = sender
    message['To'] = receiver

    text = f"""
    Someone requested a password reset on Todoer. If you did not request for it, you can safely ignore this email. \n
    Otherwise, click on the link below to reset your password:\n\n
    http://localhost:8000/api/auth/reset-password?token={token}&email={email}\n\n
    Thanks, Todoer
    """
    html = f"""
     <html>
       <head>
         <style>
           body {
             display: flex;
             flex-direction: column;
             align-items: center;
             width: 75%;
             margin: 0 auto;}
           .btn {
             background-color: #edf2f7;
             width: 10rem;
             height: 2.5rem;
             display: flex;
             align-items: center;
             justify-content: center;}
           .btn a {text-decoration: none;}
         </style>
       </head>
       <body>
         <h1>TODOER</h1>
         <p>
           Someone requested a password reset on Todoer. If you did not request for it, you can safely ignore this email.
           Otherwise, click <a href="http://localhost:8000/api/auth/reset-password?token={token}&email={email}">here</a> to reset your password
         </p>
         <div class="btn">
           <a href="http://localhost:8000/api/auth/reset-password?token={token}&email={email}">Reset Password</a>
         </div>
         <p>
           Thanks, Todoer
         </p>
       </body>
     </html>
    """

    message.attach(MIMEText(text, "plain"))
    message.attach(MIMEText(html, 'html'))

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender, password)
        server.sendmail(sender, receiver, message.as_string())
