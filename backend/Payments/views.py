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

from phonepe.sdk.pg.payments.v1.payment_client import PhonePePaymentClient
from phonepe.sdk.pg.env import Env
from phonepe.sdk.pg.payments.v1.models.request.pg_pay_request import PgPayRequest


class PaymentPhonePe(APIView):
    def post(self, request):
        order_id = int(request.data.get('order_id'))
        
        if not order_id:
            return Response(msg.ORDER_ID_NOT_PASSED, status=400)

        order = get_object_or_404(Order, id=order_id)

        if order.paymentStatus in [Order.OrderPaymentStatusChoices.PAID, Order.OrderPaymentStatusChoices.REFUNDED] or order.price == 0 or order.time + timedelta(minutes=10) < timezone.now():
            return Response(msg.ORDER_CANT_PAY, status=400)

        merchant_id = settings.PHONE_PE_MERCHANT_ID
        salt_key = settings.PHONE_PE_SALT_KEY
        salt_index = 1 
        env = Env.UAT if settings.DEBUG else Env.PROD

        phonepe_client = PhonePePaymentClient(merchant_id=merchant_id, salt_key=salt_key, salt_index=salt_index, env=env)
        unique_transaction_id = str(uuid.uuid4())[:-2]

        s2s_callback_url = "https://4c07-103-184-74-194.ngrok-free.app/pay/two"
        amount = order.price * 100
        id_assigned_to_user_by_merchant = 'YOUR_USER_ID'  
        pay_page_request = PgPayRequest.pay_page_pay_request_builder(merchant_transaction_id=unique_transaction_id,  
                                                                    amount=amount,  
                                                                    merchant_user_id=id_assigned_to_user_by_merchant,  
                                                                    callback_url=s2s_callback_url)
        
        pay_page_response = phonepe_client.pay(pay_page_request)
        pay_page_url = pay_page_response.data.instrument_response.redirect_info.url

        #convert to json
        d = pay_page_response.data.__dict__
        d['instrument_response'] = d['instrument_response'].__dict__
        d['instrument_response']['redirect_info'] = d['instrument_response']['redirect_info'].__dict__

        print(d)
        
        PaymentStatus.objects.create(order=order, payment_id=unique_transaction_id , payment_gateway=PaymentStatus.PaymentGatewayChoices.PHONE_PE, data=d).save()

        return Response({'url': pay_page_url})

class PhonePeCallback(APIView):
    
    @csrf_exempt
    def post(self ,request):
        merchant_id = settings.PHONE_PE_MERCHANT_ID
        salt_key = settings.PHONE_PE_SALT_KEY
        salt_index = 1 

        env = Env.UAT if settings.DEBUG else Env.PROD
        phonepe_client = PhonePePaymentClient(merchant_id=merchant_id, salt_key=salt_key, salt_index=salt_index, env=env)
        is_valid = phonepe_client.verify_response(response=request.body, x_verify=request.headers['X-Verify'])
        
        if not is_valid:
            return Response({'status': 'error', 'message': 'Invalid response'}, status=400)

        data = base64.b64decode(json.loads(request.body).get("response", None).encode('utf-8'))
        data = json.loads(data)
        code = data.get("code", None)
        uid = data.get("data").get('merchantTransactionId',None)

        process_payment_for_order.delay(uid, data, code == 'PAYMENT_SUCCESS')

        return Response({'status': 'success', 'message': 'Payment successful'}, status=200)    

class PhonePeUPI_Intent(APIView):

    def get(self, request):

        merchant_id = settings.PHONE_PE_MERCHANT_ID
        salt_key = settings.PHONE_PE_SALT_KEY
        salt_index = 1 # insert your salt index
        
        env = Env.UAT
        should_publish_events = True
        phonepe_client = PhonePePaymentClient(merchant_id, salt_key, salt_index, env, should_publish_events)

        unique_transaction_id = str(uuid.uuid4())[:-2]
        s2s_callback_url = "https://www.merchant.com/callback"
        amount = 100
        id_assigned_to_user_by_merchant = '<YOUR_USER_ID>'

        os_where_the_link_will_be_used = "IOS"
        target_app_ios_gpay = "PHONEPE"  # other possible values, GPAY, PAYTM
        upi_intent_request = PgPayRequest.upi_intent_pay_request_builder(merchant_transaction_id=unique_transaction_id,
                                                                        amount=amount,
                                                                        target_app=target_app_ios_gpay,
                                                                        merchant_user_id=id_assigned_to_user_by_merchant,
                                                                        callback_url=s2s_callback_url,
                                                                        device_os=os_where_the_link_will_be_used,
                                                                        
                                                                        )
        upi_intent_response = phonepe_client.pay(upi_intent_request)
        upi_intent_url = upi_intent_response.data.instrument_response.intent_url


        return HttpResponse(f'<a href="{upi_intent_url}">{upi_intent_url}</a>')

class PhonePeCheckStatus(APIView):
    
    @csrf_exempt
    def post(self, request):

        order_id = request.data.get('order_id')
        if not order_id:
            return Response(msg.ORDER_ID_NOT_PASSED, status=400)
        
        order = get_object_or_404(Order, id=order_id)

        payments = get_list_or_404(PaymentStatus, order=order)
        latest_payment = payments[0]

        merchant_id = settings.PHONE_PE_MERCHANT_ID
        salt_key = settings.PHONE_PE_SALT_KEY
        salt_index = 1 
        env = Env.UAT
        should_publish_events = True
        phonepe_client = PhonePePaymentClient(merchant_id, salt_key, salt_index, env, should_publish_events)

        merchant_transaction_id = latest_payment.payment_id
        response = phonepe_client.check_status(merchant_transaction_id)
        
        d = response.__dict__
        d['data'] = d['data'].__dict__
        d['data']['payment_instrument'] = d['data']['payment_instrument'].__dict__
        del d['data']['payment_instrument']['type']
        
        pymtSuccess = response.code == 'PAYMENT_SUCCESS'
        process_payment_for_order.delay(merchant_transaction_id, d, pymtSuccess)

        return Response({'status': pymtSuccess, 'message': response.message, 'success': response.success}, status=200)

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