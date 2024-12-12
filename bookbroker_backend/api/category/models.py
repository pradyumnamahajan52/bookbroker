from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_delete

from django.apps import apps
from datetime import datetime


class Product_category(models.Model):
    
    '''
    id,	category_name,img
    '''
    category_name = models.CharField(max_length=50,default=None)
    image = models.ImageField(upload_to="product_category/",null=True,default=None,blank=True)

    def __str__(self):
        return str(self.id)+" - "+self.category_name

@receiver(post_delete, sender=Product_category)
def Product_categoryImage_delete(sender, instance, **kwargs):
    instance.image.delete(False) 
