from rest_framework import routers
from django.urls import path,include
from . import views

router = routers.DefaultRouter()

router.register(r'',views.ProductViewSet)
# router.register(r'${id}/',views.ProductViewSet)
# router.register(r'ProductImages/',views.ProductImageViewSet)


urlpatterns = [
    path('',include(router.urls)),
]
