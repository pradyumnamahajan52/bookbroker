from django.urls import path,include

from rest_framework.authtoken import views
from django.contrib import admin
from .views import home

urlpatterns = [
    
    path('',home,name='api.home'),
    path('category/',include('api.category.urls')),
    path('product/',include('api.product.urls')),
    path('productImages/',include('api.product_image.urls')),
    path('user/',include('api.user.urls')),
    path('order/',include('api.order.urls')),
    path('payment/',include('api.payment.urls')),
    # path('api-token-auth',views.ObtainAuthToken,name='api_token_auth'),

]