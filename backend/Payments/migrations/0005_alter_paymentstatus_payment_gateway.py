# Generated by Django 5.0.1 on 2024-02-18 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Payments', '0004_alter_paymentstatus_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentstatus',
            name='payment_gateway',
            field=models.CharField(choices=[('PhonePe', 'Phone Pe'), ('RazorPay', 'Rzp')], max_length=50),
        ),
    ]
