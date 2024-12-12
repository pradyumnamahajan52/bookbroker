from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def home(request):
    return JsonResponse({'info':'django-react bookbroker project','owner':'Pradyumna Mahajan,Sandeep Kapse,Gaurav Verma'})
