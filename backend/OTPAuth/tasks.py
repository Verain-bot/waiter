from celery import shared_task
from django.core.cache import cache
from .enums import Ath
from . import responseMessages as msg

@shared_task
def expireOTP(phone):
    cache.delete(phone)
    return f'OTP for {phone} removed'

@shared_task(bind=True)
def sendOTP(self, phone):
    deleteOTPAfter = 120

    cacheData = {
        'otp' : 1234,
        'tries' : 0,
    }

    cache.set(phone, cacheData, timeout=deleteOTPAfter)
    expireOTP.apply_async((phone,), countdown=deleteOTPAfter)

    return msg.OTP_SENT(phone)