from celery import shared_task
from django.core.cache import cache
from .enums import Ath
from . import responseMessages as msg
import requests
from django.conf import settings
from random import randint
from datetime import datetime
import bcrypt

@shared_task
def expireOTP(phone):
    cache.delete(phone)
    return f'OTP for {phone} removed'

@shared_task
def sendOTP(phone):
    deleteOTPAfter = 120
    
    #Generate RANDOM 6 digit OTP
    otp = randint(100000, 999999)
    hashed_otp = bcrypt.hashpw(str(otp).encode('utf-8'), bcrypt.gensalt())

    result = {
        'otp': hashed_otp.decode('utf-8'),
        'phone': phone
    }

    #Send OTP to user via SMS
    if not settings.DEBUG:
        url = f"https://www.fast2sms.com/dev/bulkV2?authorization={settings.SMS_API_KEY}&route=otp&variables_values={otp}&flash=0&numbers={phone}"
        response = requests.get(url)
        response = response.json()
        result = {**result, **response}

    if settings.DEBUG:
        print(f'\n\nOTP for {phone} is {otp}\n\n')

    cacheData = {
        'otp' : hashed_otp,
        'tries' : 0,
        'sentTime': datetime.now(),
    }

    cache.set(phone, cacheData, timeout=deleteOTPAfter)
    expireOTP.apply_async((phone,), countdown=deleteOTPAfter)

    return result
