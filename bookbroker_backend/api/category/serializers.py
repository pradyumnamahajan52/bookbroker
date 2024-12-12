from rest_framework import serializers
from .models import Product_category



class CategorySerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    class Meta:
        model = Product_category
        fields = ('id','category_name','image')