from django.test import TestCase
from backend.tests import TestBase
# Create your tests here.
from .urls import URL_FOR_OTPAuth as URL
import time
from . import responseMessages as msg
from unittest.mock import patch
from OTPAuth.tasks import sendOTP
from freezegun import freeze_time
import datetime

class TestViews(TestBase):


    """
        ========================

            TESTING SEND OTP
            
        ========================
    """


    def test_send_OTP_POST(self):
        data = {
            'phone' : self.TEST_PHONE,
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        time.sleep(0.1)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.OTP_SENT(self.TEST_PHONE))
    
    def test_send_OTP_POST_no_phone(self):
        data = {
            'phone' : '',
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        time.sleep(0.1)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.INVALID_REQUEST)

    def test_send_OTP_Twice(self):
        data = {
            'phone' : self.TEST_PHONE,
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.OTP_SENT(self.TEST_PHONE))

        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.OTP_WAIT_30_SEC)

    def test_send_OTP_DifferentUser(self):
        data = {
            'phone' : self.TEST_PHONE,
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.OTP_SENT(self.TEST_PHONE))

        data = {
            'phone' : self.TEST_PHONE_2,
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.OTP_SENT(self.TEST_PHONE_2))

    def test_send_OTP_After_30_Secs(self):
        data = {
            'phone' : self.TEST_PHONE,
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.OTP_SENT(self.TEST_PHONE))

        with freeze_time( datetime.datetime.now() + datetime.timedelta(seconds=32) ):
            response = self.client.post(URL.SEND_OTP.getURL(), data=data)
            self.assertEquals(response.status_code, 200)
            response = response.json()
            self.assertEquals(response, msg.OTP_SENT(self.TEST_PHONE))

    def test_send_OTP_POST_wrong_data(self):
        data = {
            'phosne' : 'abc',
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        time.sleep(0.1)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.INVALID_REQUEST)

    def test_send_OTP_POST_already_verified(self):
        self.verifyUser(self.client, self.TEST_PHONE)
        data = {
            'phone' : self.TEST_PHONE,
        }
        #set time to 30 secs more than now
        with freeze_time( datetime.datetime.now() + datetime.timedelta(seconds=32) ):
            response = self.client.post(URL.SEND_OTP.getURL(), data=data)

        self.assertEquals(response.status_code, 200)
        response = response.json()
        existingUser = self.checkUserExists(self.TEST_PHONE)
        self.assertEquals(response, msg.OTP_SENT(existingUser))

    def test_send_OTP_DELETE(self):
        self.verifyUser(self.client, self.TEST_PHONE)

        #self.sendOTP(self.client, self.TEST_PHONE)
        response = self.client.delete(URL.SEND_OTP.getURL())
        time.sleep(0.1)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.GENERAL_SUCCESS)

        self.verifyUser(self.client, self.TEST_PHONE)
    
    def test_send_OTP_POST_LoggedIn(self):
        self.login(self.client, self.TEST_PHONE)
        data = {
            'phone' : self.TEST_PHONE,
        }
        response = self.client.post(URL.SEND_OTP.getURL(), data=data)
        time.sleep(0.1)
        self.assertEquals(response.status_code, 403)
        

    """
        ========================

            TESTING ENTER OTP

        ========================
    """

    def test_Enter_OTP_POST(self):
        self.sendOTP(self.client, self.TEST_PHONE)
        data = {
            'otp' : self.TEST_OTP,
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        existingUser = self.checkUserExists(self.TEST_PHONE)
        self.assertEquals(response, msg.OTP_VERIFICATION_COMPLETE(existingUser))

    
    def test_Enter_OTP_POST_wrong_otp(self):
        self.sendOTP(self.client, self.TEST_PHONE)
        data = {
            'otp' : '1222',
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.WRONG_OTP)
    
    def test_Enter_OTP_POST_no_otp(self):
        self.sendOTP(self.client, self.TEST_PHONE)
        data = {
            'otp' : '',
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.INVALID_REQUEST)
    
    def test_Enter_OTP_POST_no_phone(self):
        data = {
            'otp' : self.TEST_OTP,
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.OTP_NOT_GENERATED)
    
    def test_Enter_OTP_POST_no_phone_no_otp(self):
        data = {
            'otp' : '',
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.OTP_NOT_GENERATED)
    
    def test_Enter_OTP_POST_already_verified(self):
        self.verifyUser(self.client, self.TEST_PHONE)
        data = {
            'otp' : self.TEST_OTP,
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        existingUser = self.checkUserExists(self.TEST_PHONE)
        self.assertEquals(response, msg.USER_ALREADY_VERIFIED(existingUser))
    
    def test_Enter_OTP_POST_too_many_attempts(self):
        self.sendOTP(self.client, self.TEST_PHONE)
        data = {
            'otp' : '1222',
        }
        for i in range(4):
            response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
            self.assertEquals(response.status_code, 400)
            response = response.json()
            self.assertEquals(response, msg.WRONG_OTP)
        
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.OTP_TOO_MANY_ATTEMPTS)

        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.OTP_NOT_GENERATED)


    def test_Enter_OTP_POST_LoggedIn(self):
        self.login(self.client, self.TEST_PHONE)
        data = {
            'otp' : self.TEST_OTP,
        }
        response = self.client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 403)

    """
        ========================

            TESTING LOGIN
        
        ========================
    """

    def test_Login_POST(self):
        self.verifyUser(self.client, self.TEST_PHONE)
        response = self.client.post(URL.LOGIN.getURL())
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.USER_LOGGED_IN(self.TEST_PHONE))
    
    def test_Login_POST_already_logged_in(self):
        self.login(self.client, self.TEST_PHONE)
        response = self.client.post(URL.LOGIN.getURL())
        self.assertEquals(response.status_code, 403)
        
    def test_Login_POST_not_verified(self):
        response = self.client.post(URL.LOGIN.getURL())
        self.assertEquals(response.status_code, 403)
        
    def test_Login_POST_Not_registered(self):
        self.verifyUser(self.client, self.TEST_PHONE_REGISTERED)
        response = self.client.post(URL.LOGIN.getURL())
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.USER_NOT_FOUND)

    """
        ========================

            TESTING LOGOUT
        
        ========================
    """

    def test_Logout_GET(self):
        response = self.client.get(URL.LOGOUT.getURL())
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.USER_LOGGED_OUT)
    
    def test_Logout_GET_logged_in(self):
        self.login(self.client, self.TEST_PHONE)
        response = self.client.get(URL.LOGOUT.getURL())
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response, msg.USER_LOGGED_OUT)
    
    def test_Logout_GET_Multi(self):
        self.login(self.client, self.TEST_PHONE)
        self.logout(self.client)
        with freeze_time( datetime.datetime.now() + datetime.timedelta(seconds=32) ):
            self.login(self.client, self.TEST_PHONE)
        self.logout(self.client)
    
    def test_Logout_GET_Multiple_Users(self):
        self.login(self.client, self.TEST_PHONE)
        self.login(self.client2, self.TEST_PHONE_2)
        self.logout(self.client)
        self.logout(self.client2)

    """
        ========================
        
            TESTING REGISTER
        
        ========================
    """

    def test_Register_POST_noVerify(self):
        data = {
            'phone' : self.TEST_PHONE_REGISTERED,
        }
        response = self.client.post(URL.CREATE.getURL(), data=data)
        self.assertEquals(response.status_code, 403)
    
    def test_Register_POST_verify(self):
        self.verifyUser(self.client, self.TEST_PHONE_REGISTERED)

        data = {
            'username' : self.TEST_PHONE_REGISTERED,
            'first_name': 'testing',
            'email': 'asdads@gmail.com'
        }
        response = self.client.post(URL.CREATE.getURL(), data=data)
        self.assertEquals(response.status_code, 201)
        
    def test_Register_POST_VerifyWrong(self):
        self.verifyUser(self.client, self.TEST_PHONE_REGISTERED)

        data = {
            'username' : 31,
            'first_name': 'testing',
            'email': 'rand@asd.com',
        }
        response = self.client.post(URL.CREATE.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.INVALID_REQUEST)
    
    def test_Register_POST_AlreadyRegistered(self):
        self.verifyUser(self.client, self.TEST_PHONE)

        data = {
            'username' : self.TEST_PHONE,
            'first_name': 'testing',
            'email': 'asd@fasd.com'
        }
        response = self.client.post(URL.CREATE.getURL(), data=data)
        self.assertEquals(response.status_code, 400)
        response = response.json()
        self.assertEquals(response, msg.USER_ALREADY_REGISTERED)

    def test_Register_POST_AlreadyLoggedIn(self):
        self.login(self.client, self.TEST_PHONE)
        data = {
            'username' : self.TEST_PHONE,
            'first_name': 'testing',
            'email': 'ads@asdasd.com',
        }
        response = self.client.post(URL.CREATE.getURL(), data=data)
        self.assertEquals(response.status_code, 403)

    """
        ========================

    TESTING PROFILE VIEW AND UPDATE

        ========================
    """

    def test_Profile_GET(self):
        self.login(self.client, self.TEST_PHONE)
        response = self.client.get(URL.ACCOUNT_VIEW_UPDATE.getURL())
        self.assertEquals(response.status_code, 200)
        response = response.json()

        self.assertEquals(int(response['username']), self.TEST_PHONE)
    
    def test_Profile_GET_not_logged_in(self):
        response = self.client.get(URL.ACCOUNT_VIEW_UPDATE.getURL())
        self.assertEquals(response.status_code, 403)
    
    def test_Profile_PATCH(self):
        self.login(self.client, self.TEST_PHONE)
        data = {
            'first_name': 'testing',
        }
        response = self.client.patch(URL.ACCOUNT_VIEW_UPDATE.getURL(), data=data,content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['first_name'], 'testing')
        self.assertEquals(int(response['username']), self.TEST_PHONE)

    def test_Profile_PATCH_not_logged_in(self):
        data = {
            'first_name': 'testing',
        }
        response = self.client.patch(URL.ACCOUNT_VIEW_UPDATE.getURL(), data=data,content_type='application/json')
        self.assertEquals(response.status_code, 403)
    
    def test_Profile_PATCH_wrong_data(self):
        self.login(self.client, self.TEST_PHONE)
        data = {
            'first_nameasd': 123,
        }
        response = self.client.patch(URL.ACCOUNT_VIEW_UPDATE.getURL(), data=data,content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(int(response['username']), self.TEST_PHONE)
    
    def test_Profile_PATCH_userInData(self):
        self.login(self.client, self.TEST_PHONE)
        data = {
            'username': 123,
        }
        response = self.client.patch(URL.ACCOUNT_VIEW_UPDATE.getURL(), data=data,content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(int(response['username']), self.TEST_PHONE)
        