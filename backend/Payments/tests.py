from django.test import TestCase
from backend.tests import TestBase
from unittest.mock import patch
# Create your tests here.
class TestPayment(TestBase):
    
    @patch('Payments.views.PhonePePaymentClient', return_value=None)
    def test_sonothing(self, mock_phonepeclient):
        pass