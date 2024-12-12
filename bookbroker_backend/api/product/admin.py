
from django.contrib import admin
from .models import Product,ProductImage


# Register your models here.

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]
    list_display = ("id","name")
    list_display_links = ('id','name')
    class Meta: 
        model=Product


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass


