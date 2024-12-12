from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_delete
from django.apps import apps
from datetime import datetime
from api.category.models import Product_category
from api.user.models import User
from ckeditor.fields import RichTextField


class Product(models.Model):
    #for json// https://stackoverflow.com/questions/50043077/flask-sqlalchemy-mysql-json-column-update-not-working 
    '''
    id, product_category_id, subcategory_name , img
    '''
    product_category =  models.ForeignKey(Product_category,on_delete=models.CASCADE,default=None)
    name = models.CharField(max_length=250,default=None)
    is_active = models.BooleanField(default=True, blank=True)
    new = models.BooleanField(default=True,blank=True)
    mahasale = models.BooleanField(default=False,blank=True)
    product_by = models.ForeignKey(User,on_delete=models.DO_NOTHING,default=None,blank=True)
    image = models.ImageField(upload_to="product/") 
    Original_price = models.DecimalField(max_digits=16,decimal_places=0,default=0)
    price = models.DecimalField(max_digits=3,decimal_places=0,default=0)
    pub_date = models.DateTimeField(default=datetime.now)
    tag = models.TextField(null=True,default=None,blank=True)
    color = models.TextField(null=True,default=None,blank=True)
    size = models.TextField(null=True,default=None,blank=True)
    stock = models.IntegerField(default=0)
    variation =  models.TextField(default=None,null=True,blank=True)
    fashion = models.CharField(max_length=500,null=True,default=None,blank=True)
    material = models.CharField(max_length=50,null=True,default=None,blank=True)
    feature = models.CharField(max_length=2500,null=True,default=None,blank=True)
    point_desc = RichTextField(blank=True, null=True,default=None)
    short_desc = models.CharField(max_length=5000,null=True,default=None,blank=True)
    description = RichTextField(blank=True, null=True,default=None)
    weight =  models.IntegerField(default=0,null=True,blank=True)
    rating =  models.SmallIntegerField(default=0,null=True,blank=True)

    def __str__(self):
        return str(self.id)+" - "+self.name



class ProductImage(models.Model):
    product = models.ForeignKey(Product,related_name='productImages' ,default=None,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product/')

    def __str__(self):
        return str(self.id)+" - "+self.product.name


@receiver(post_delete, sender=Product)
def product_delete(sender, instance, **kwargs):
    instance.image.delete(False) 

@receiver(post_delete, sender=ProductImage)
def productImage_delete(sender, instance, **kwargs):
    instance.image.delete(False) 

