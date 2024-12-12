from django.shortcuts import render,get_object_or_404,get_list_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer,UserAddressSerializer
from .models import User,User_Address
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import login, logout
import random
import re
from rest_framework.response import Response
# Create your views here.
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.authtoken.models import Token


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))


@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid paramenter only'})
    print("hello login")

    # print(request.POST.get('email', None))  - if you will not get email, None will be printed
    username = request.POST['email']
    password = request.POST['password']

    # print(username)
    # print(password)

# validation part

    #for checking for email validation
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error': 'Enter a valid email'})

    # for checking passowrd length
    if len(password) < 3:
        return JsonResponse({'error': 'Password needs to be at least of 3 char'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usr_dict = UserModel.objects.filter(
                email=username).values().first()
            usr_dict.pop('password')
      
            # if user.session_token != "0":
            #     user.session_token = "0"
            #     user.save()
            #     return JsonResponse({'error': "Previous session exists!"})

            # token = generate_session_token()
            # user.session_token = token
            # user.save()
            user_session_token = str(Token.objects.get(user=user.id))
            login(request, user)
            print(user_session_token)
            return JsonResponse({'token': user_session_token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Invalid password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})
    except exceptions as error:
        print(error)

@csrf_exempt
def social_signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid paramenter only'})
    token = str(request.POST['token'])

    email = str(request.POST['userEmail'])
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=email)

        usr_dict = UserModel.objects.filter(email=email).values().first()
        usr_dict.pop('password')
        return JsonResponse({'token': token, 'user': usr_dict})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})
  
    return JsonResponse({'error': 'Invalid Email and token'})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout success'})



class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]


class UserAddressSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = User_Address.objects.all().order_by('id')
    serializer_class = UserAddressSerializer
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]

    #lookup_field = 'id'







# class UserAddressSet(viewsets.ModelViewSet):
#     queryset = User_Address.objects.all().order_by('id')
#     serializer_class = UserAddressSerializer
    

    # def retrieve(self, request, pk=None):
    #     queryset = User_Address.objects.all()
    #     user_address = get_list_or_404(queryset, id=pk)
    #     serializer = UserAddressSerializer(user_address)
    #     return Response(serializer.data)

# class UserGetAddressSet(viewsets.ModelViewSet):
#     queryset = CustomUser.objects.all().order_by('id')
#     serializer_class = UserGetAddressSerializer