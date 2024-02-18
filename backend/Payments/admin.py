from django.contrib import admin
from .models import *
# Register your models here.

class PaymentStatusAdmin(admin.ModelAdmin):
    list_display = ('order', 'payment_id', 'success', 'payment_gateway', 'terminal_state')
    readonly_fields = ('time',)


admin.site.register(PaymentStatus, PaymentStatusAdmin)
admin.site.register(AccountDetails)