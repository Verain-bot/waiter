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

class UserToken(models.Model):
    user = models.OneToOneField(Customer, related_name='user_token', on_delete=models.CASCADE)
    token = models.CharField(max_length=200, null=True)

    def __str__(self):
        return f'{self.user.username}'