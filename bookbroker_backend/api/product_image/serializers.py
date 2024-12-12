from rest_framework import serializers

from api.product.models import Product,ProductImage


class ProductImageSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    
    class Meta:
        model = ProductImage
        fields = ('id', 
        'product',  
        'image'
        )