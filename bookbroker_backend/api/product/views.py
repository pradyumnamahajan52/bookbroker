from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .serializers import ProductSerializer,ProductImageSerializer
from .models import Product,ProductImage
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    permission_classes_by_action = {
        'create': [AllowAny],
        'list': [AllowAny],
        'retrieve': [AllowAny],
        'update': [IsAuthenticated],
        'partial_update': [IsAuthenticated],
        'destroy': [IsAuthenticated],
    }

    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all().order_by('id')
    serializer_class = ProductImageSerializer
    



