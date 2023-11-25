from django.db import models
from api.models import Customer
# Create your models here.

class Analytics(models.Model):
    user = models.ForeignKey(Customer, related_name='user',blank=True,on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=100, null=True)
    remote_addr = models.CharField(max_length=100, null=True)
    user_agent = models.CharField(max_length=250, null=True)
    host = models.CharField(max_length=100, null=True)