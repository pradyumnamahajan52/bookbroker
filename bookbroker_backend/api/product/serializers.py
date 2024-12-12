from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Product,ProductImage
from api.user.models import User
from api.category.serializers import CategorySerializer 


class UserbySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name')


class ProductImageSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)

    class Meta:
        model = ProductImage
        fields = ('id','image')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    product_category = CategorySerializer(many=False,read_only=True)
    productImages = ProductImageSerializer(many=True,read_only=True)
    product_by = UserbySerializer(read_only=True)

 
    class Meta:
        model = Product
        fields = ('id', 
        'name', 
        'product_category', 
        'is_active', 
        'image', 
        'productImages',
        'Original_price',
        'price',
        'product_by',
        'tag',
        'color',
        'size',
        'stock',
        'variation',
        'material',
        'point_desc',
        'short_desc',
        'description'
        )
