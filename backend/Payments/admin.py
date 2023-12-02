from django.contrib import admin
from .models import PaymentStatus
# Register your models here.

class PaymentStatusAdmin(admin.ModelAdmin):
    list_display = ('order', 'payment_id', 'success', 'payment_gateway', 'terminal_state')

admin.site.register(PaymentStatus, PaymentStatusAdmin)
