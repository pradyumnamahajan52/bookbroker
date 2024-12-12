from django.db import models
from api.user.models import User,User_Address
from api.product.models import Product

# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_address = models.ForeignKey(User_Address, on_delete=models.CASCADE)
    product_id =  models.ForeignKey(Product, on_delete=models.CASCADE)
    total_products = models.CharField(max_length=500, default=0)
    total_amount = models.DecimalField(max_digits=16,decimal_places=0,default=0)
    transaction_id = models.CharField(max_length=150, default=0)
    amount = models.DecimalField(max_digits=16,decimal_places=0,default=0)
    transaction_status =  models.CharField(max_length=250, default=0)
    payment_status = models.BooleanField(default=False)
    order_confirm = models.BooleanField(default=False)
    order_shipped = models.BooleanField(default=False)
    delivery = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)+" - "+str(self.user)