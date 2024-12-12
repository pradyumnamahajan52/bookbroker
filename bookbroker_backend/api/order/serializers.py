from rest_framework import serializers
from api.user.models import User
from .models import Order
from api.product.models import Product

class UserbySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name')


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
 
    class Meta:
        model = Product
        fields = ('id', 
        'name', 
        'image', 
        'product_by',
        )


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    product_id = ProductSerializer(read_only=True)
    user = UserbySerializer(read_only=True)

    class Meta:
        model = Order
        fields = ('id',
        'user',
        'product_id',
        'total_products',
        'total_amount',
        'transaction_id',
        'amount',
        'transaction_status',
        'payment_status',
        'order_confirm',
        'order_shipped',
        'delivery'
        )
        