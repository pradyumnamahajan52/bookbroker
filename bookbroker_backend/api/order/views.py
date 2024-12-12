from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from api.product.models import Product
from api.user.models import User_Address
from django.views.decorators.csrf import csrf_exempt
from decimal import Decimal
# Create your views here.


def validate_user_session(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Please re-login', 'code': '1'})

    if request.method == "POST":
        user_id = id
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']
        transaction_status = request.POST['status']
        is_success = request.POST['is_success']
        ad_id = int(request.POST['ad_id'])
        # print("type of ad_id: ",type(ad_id))
        # print("transaction_status: ",transaction_status)
        # print("is_success: ",bool(is_success))

        total_pro = len(products.split(',')[:-1])
        pro = products.split(',')[:-1]
        temp_ls = []
        for i in pro:
            temp_ls.append(int(i))
        # print(temp_ls)
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})
        user_address = User_Address.objects.get(id=ad_id)
        try:
            for pd1 in temp_ls:
                product = Product.objects.get(id=pd1)
                order = Order(user=user,
                user_address=user_address,
                product_id=product, 
                total_products=total_pro,
                transaction_id=transaction_id, 
                total_amount=amount,
                amount=product.price,
                transaction_status=transaction_status,
                payment_status=bool(is_success))
                order.save()

        except Exception as e:
            return JsonResponse({'error': e})
        

        return JsonResponse({'success': True, 'error': False, 'msg': 'Order placed Successfully'})

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer