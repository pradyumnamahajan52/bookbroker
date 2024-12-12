from django.urls import path,include
from rest_framework import routers

from django.contrib import admin
from . import views
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register(r'register', views.UserViewSet)
router.register(r'address', views.UserAddressSet)


# router.register(r'address/{id}/$', views.UserAddressSet)
# router.register(r'address/user/', views.UserGetAddressSerializer)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.signin, name='signin'),
    path('login/social/', views.social_signin, name='google_login_manual'),
    path('logout/<int:id>/', views.signout, name='signout'),
    path('', include(router.urls)),
    path('dj-rest-auth/facebook/', views.FacebookLogin.as_view(), name='fb_login'),
    path('dj-rest-auth/google/', views.GoogleLogin.as_view(), name='google_login'),


]