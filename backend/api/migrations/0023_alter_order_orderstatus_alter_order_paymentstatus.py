# Generated by Django 4.2.7 on 2023-12-03 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_order_paymentstatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='orderStatus',
            field=models.CharField(choices=[('NOT_CONFIRMED', 'Awaiting Confirmation'), ('CONFIRMED', 'Confirmed'), ('PREPARING', 'Preparing'), ('DISPATCHING', 'Dispatching'), ('READY', 'Ready'), ('COMPLETE', 'Complete'), ('CANCELLED', 'Cancelled')], default='NOT_CONFIRMED', max_length=15, verbose_name='Order Status'),
        ),
        migrations.AlterField(
            model_name='order',
            name='paymentStatus',
            field=models.CharField(choices=[('PAID', 'Paid'), ('FAILED', 'Failed'), ('REFUNDED', 'Refunded'), ('PENDING', 'Pending')], default='PENDING', max_length=15, verbose_name='Payment Status'),
        ),
    ]
