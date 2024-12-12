from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CategorySerializer
from .models import Product_category
# Create your views here.


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Product_category.objects.all().order_by('category_name')
    serializer_class = CategorySerializer