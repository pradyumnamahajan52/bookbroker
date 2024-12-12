from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models
# from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.conf import settings

class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        if email is None:
            raise TypeError('Users should have a Email')

        user = self.model( email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user( email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google',
                  'twitter': 'twitter', 'email': 'email'}


class User(AbstractBaseUser, PermissionsMixin):
    '''
    encryption=SHA512/256 || salt = 128 || my_encryption=psmweb5
    '''
    username = None
    first_name = models.CharField(max_length=50,default=None,blank=True,null=True) 
    last_name = models.CharField(max_length=50,default=None,blank=True,null=True) 
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    image = models.ImageField(blank=True,null=True,default=None)
    is_active = models.BooleanField(default=True)
    is_seller = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email
    


    # def tokens(self):
    #     refresh = RefreshToken.for_user(self)
    #     return {
    #         'refresh': str(refresh),
    #         'access': str(refresh.access_token)
    #     }

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class User_Address(models.Model):
    user_id =   models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=None)
    pincode = models.CharField(max_length=10,default=None)
    house_name = models.CharField(max_length=1000,default=None)
    Area = models.CharField(max_length=1000,default=None)
    Landmark = models.CharField(max_length=500,null=True,default=None,blank=True)
    city = models.CharField(max_length=50,default=None)
    state = models.CharField(max_length=50,default=None)
    
    def __str__(self):
        return str(self.id)+" - "+str(self.user_id)
