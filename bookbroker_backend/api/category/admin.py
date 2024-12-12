from django.contrib import admin
from .models import Product_category

@admin.register(Product_category)
class Product_categoryAdmin(admin.ModelAdmin):
    pass
