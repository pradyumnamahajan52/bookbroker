from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes
from .models import User,User_Address
    
class UserAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_Address
        fields = ('id','user_id','pincode','house_name','Area','Landmark','city','state')



class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instace, attr, value)

        instance.save()
        return instance


    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('first_name','last_name','email', 'password', 'phone', 'is_seller',
                  'is_active', 'is_staff', 'is_superuser')



