from django.db import models
from api.models import Order

class PaymentStatus(models.Model):
    class PaymentGatewayChoices(models.TextChoices):
        PHONE_PE = 'PhonePe'
        RZP = 'RazorPay'

    payment_id = models.CharField(max_length=50, primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING, related_name='payment_status')
    time = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)
    terminal_state = models.BooleanField(default=False)
    payment_gateway = models.CharField(max_length=50, choices=PaymentGatewayChoices.choices)
    data = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['-order__id', '-time']