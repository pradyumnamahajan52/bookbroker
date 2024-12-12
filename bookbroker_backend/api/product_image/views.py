from rest_framework import viewsets
from django.http import JsonResponse
from .serializers import ProductImageSerializer
from api.product.models import ProductImage
# Create your views here.



class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all().order_by('id')
    serializer_class = ProductImageSerializer
    
    
    



