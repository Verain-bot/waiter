from django.shortcuts import render
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from rest_framework import views, generics, viewsets
from .serializers import *
from .helper import sendOTPtoPhone
from rest_framework.response import Response
from django.core.cache import cache
from .permission import IsVerified, IsLoggedOut
from . import responseMessages as msg
from .enums import Ath
from django.contrib.auth import login, logout
from rest_framework.permissions import IsAuthenticated
from .tasks import sendOTP
from datetime import datetime

import bcrypt

class CustomerLogout(views.APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            logout(request)
            request.session.flush()
            return Response(msg.USER_LOGGED_OUT)
        
        request.session.flush()
        return Response(msg.USER_LOGGED_OUT, 400)

class SendOTPView(views.APIView):
    permission_classes = [IsLoggedOut]
    def post(self, request, *args, **kwargs):
        # if request.session.get(Ath.PHONE, None) and request.session.get(Ath.IS_VERIFIED, False) == True:
        #     existingUser = Customer.objects.filter(username=request.session[Ath.PHONE]).exists()
        #     return Response(msg.USER_ALREADY_VERIFIED(existingUser), 200)

        if 'phone' in request.data:
            try:
                phone = int(request.data['phone'])
            except:
                request.session.flush()
                return Response(msg.INVALID_REQUEST, status=400)

            #Prevent sending OTP if already sent in last 30 seconds            
            existing_cache = cache.get(phone)
            if existing_cache:
                if (datetime.now() - existing_cache.get('sentTime',1)).seconds < 30:
                    return Response(msg.OTP_WAIT_30_SEC, status=400)

            #Async task to send OTP
            sendOTP.delay(phone)

            request.session[Ath.PHONE] = phone
            request.session[Ath.IS_VERIFIED] = False

            return Response(msg.OTP_SENT(phone))
        
        return Response(msg.INVALID_REQUEST, status=400)

    def delete(self, request, *args, **kwargs):
        if request.session.get(Ath.PHONE, False):
            cache.delete(request.session[Ath.PHONE])
        
        request.session[Ath.IS_VERIFIED] = False
        return Response(msg.GENERAL_SUCCESS)

class VerifyOTPView(views.APIView):
    permission_classes = [IsLoggedOut]
    def post(self, request, *args, **kwargs):
        phone = request.session.get(Ath.PHONE, False)

        if request.session.get(Ath.IS_VERIFIED, False) == True and phone:
            existingUser = Customer.objects.filter(username=phone).exists()
            return Response(msg.USER_ALREADY_VERIFIED(existingUser), 200)

        if not phone:
            return Response(msg.OTP_NOT_GENERATED, 400)
        
        if phone and not cache.get(phone):
            return Response(msg.OTP_EXPIRED, 400)

        if 'otp' in request.data:
            try:
                otp = int(request.data['otp'])
            except:
                return Response(msg.INVALID_REQUEST, status=400)
            
            cacheData = cache.get(phone)
            cacheData['tries'] += 1
            cache.set(phone, cacheData, timeout=120)

            if cacheData['tries'] >= 5:
                cache.delete(request.session[Ath.PHONE])
                request.session.flush()
                return Response(msg.OTP_TOO_MANY_ATTEMPTS, status=400)
            
            if bcrypt.checkpw(str(otp).encode('utf-8'), cacheData['otp']):
                request.session[Ath.IS_VERIFIED] = True
                existingUser = Customer.objects.filter(username=phone).exists()
                return Response(msg.OTP_VERIFICATION_COMPLETE(existingUser))
            else:
                return Response(msg.WRONG_OTP, status=400)

        return Response(msg.INVALID_REQUEST, status=400)

class CustomerLogin(views.APIView):
    permission_classes = [IsVerified, IsLoggedOut]
    
    def post(self, request, *args, **kwargs):
        phone = request.session.get(Ath.PHONE, False)
        
        if Customer.objects.filter(username=phone).exists():
            login(request, Customer.objects.get(username=phone))
            return Response(msg.USER_LOGGED_IN(phone))
        else:
            return Response(msg.USER_NOT_FOUND, 400)

class ViewUpdateAccountView(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), username=self.request.user.username)
        self.check_object_permissions(self.request, obj)
        return obj

class RegisterView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerDetailSerializer
    permission_classes = [IsVerified, IsLoggedOut]
    
    def post(self, request, *args, **kwargs):
        phone = request.session.get(Ath.PHONE, False)
        phone2 = request.data.get('username', False)

        if phone and phone2 and (int(phone) == int(phone2)):
            if Customer.objects.filter(username=phone).exists():
                return Response(msg.USER_ALREADY_REGISTERED, 400)
            return super().post(request, *args, **kwargs)
        
        return Response(msg.INVALID_REQUEST, 400)
    


#Adding or updating device token for push notifications
class AddUpdateDeviceToken(views.APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if 'deviceToken' in request.data:
            token = UserToken.objects.get_or_create(user=request.user)[0]

            if str(token.token) != str(request.data['deviceToken']):
                token.token = str(request.data['deviceToken'])
                token.save()
            
            return Response(msg.GENERAL_SUCCESS)
        
        return Response(msg.INVALID_REQUEST, 400)
