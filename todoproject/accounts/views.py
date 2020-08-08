import hashlib
from datetime import datetime

from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.http import HttpResponse

from .models import ResetToken

def _verify_token(token, email):
    try:
        stored_token = ResetToken.objects.get(email=email)
    except ResetToken.DoesNotExist:
        return False

    # Verify token
    salt = stored_token.token[:32]
    key = stored_token.token[32:]
    new_key = hashlib.pbkdf2_hmac('sha256', token.encode('utf-8'), salt, 1000)

    if key == new_key:
        # Verify expiration
        ints = [int(num) for num in str(stored_token.expiration_date).split('-')]
        if datetime.now() < datetime(*ints):
            return True

    return False

def reset_password(request):
    """
    GET: Check if email has active token, then check token before allowing password modification 
    POST: Verify token, check passwords match, use email to grab user and set password
    """
    if request.method == 'GET':
        if _verify_token(request.GET.get('token'), request.GET.get('email')) == True:
            return render(request, 'accounts/index.html')

        else: return redirect('/')
        
    if request.method == 'POST':
        email = request.GET.get('email')
        if _verify_token(request.GET.get('token'), email) == True:
            password1 = request.POST.get('first-pass')
            password2 = request.POST.get('second-pass')

            if password1 != password2:
                return HttpResponse({'Message': 'Passwods must match'}, status=409)
            
            else:
                user = User.objects.get(email=email)
                user.set_password(password1)
                user.save()

                # Delete used token
                ResetToken.objects.get(email=email).delete()

                return redirect('/')

        else: return redirect('/')


