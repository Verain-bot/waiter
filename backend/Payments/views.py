from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse
from . import responseMsg as msg 
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import timedelta
from django.utils import timezone
from api.models import Order
from django.conf import settings
from .models import PaymentStatus
import json
from django.views.decorators.csrf import csrf_exempt
import base64
import uuid  
from .tasks import process_payment_for_order
import razorpay
from .helper import canPayforOrder

class RazorPayPayment(APIView):
    
    def post(self, request):
        order_id = int(request.data.get('order_id'))
        print(order_id)
        if not order_id:
            return Response(msg.ORDER_ID_NOT_PASSED, status=400)

        order = get_object_or_404(Order, id=order_id)

        if not canPayforOrder(order):
            return Response(msg.ORDER_CANT_PAY, status=400)

        payment = PaymentStatus.objects.filter(order__id=request.data.get('order_id'))
        if payment.exists():
            return Response({'RZP_Order_ID': payment.first().payment_id})

        client = razorpay.Client(auth=('rzp_test_LTygpkM0cIuy85','zz4WggINF67hf0YMuf0QLw62'))
        client.set_app_details({"title" : "Django App", "version" : "121.21"})

        x = client.order.create({
            "amount": order.price * 100,
            "currency": "INR",
            "receipt": f"ORDER #{order.id}",
            "partial_payment": False,
        })
        
        id = x.get("id")
        if not id:
            return Response(msg.ORDER_SERVER_ERROR, status=400)
        
        PaymentStatus.objects.create(order=order, payment_id=id , payment_gateway=PaymentStatus.PaymentGatewayChoices.RZP, data=x).save()
        
        return Response({'RZP_Order_ID': id})

class RazorPayCallback(APIView):
    def post(self, request):

        razorpay_order_id = request.data.get('razorpay_order_id')
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        razorpay_signature = request.data.get('razorpay_signature')

        if not razorpay_order_id or not razorpay_payment_id or not razorpay_signature:
            return Response(msg.ORDER_INVALID_FIELDS_PASSED, status=400)
        
        client = razorpay.Client(auth=('rzp_test_LTygpkM0cIuy85','zz4WggINF67hf0YMuf0QLw62'))
        client.set_app_details({"title" : "Django App", "version" : "121.21"})

        try:
            data= {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            }
            signature = client.utility.verify_payment_signature(data)

            process_payment_for_order.delay(razorpay_order_id,data, signature)
            return Response({'status': signature})
        except:
            return Response(msg.ORDER_NOT_PAID, status=400)

class RazorPayCheckStatus(APIView):
    def post(self, request):
        order_id = request.data.get('order_id')
        if not order_id:
            return Response(msg.ORDER_ID_NOT_PASSED, status=400)
        
        order = get_object_or_404(Order, id=order_id)
        
        payments = get_list_or_404(PaymentStatus, order=order)
        latest_payment = payments[0]

        client = razorpay.Client(auth=('rzp_test_LTygpkM0cIuy85','zz4WggINF67hf0YMuf0QLw62'))
        client.set_app_details({"title" : "Django App", "version" : "121.21"})

        #get payment from orderID
        data = client.order.payments(latest_payment.payment_id)
        x = data.get('items')
        success = False

        for item in x:
            if item.get('status') == 'captured':
                success = True
                break
        
        process_payment_for_order.delay(latest_payment.payment_id, data, success)

        #print(success)
        return Response(msg.ORDER_STATUS_CHECK_MESSAGE(success))