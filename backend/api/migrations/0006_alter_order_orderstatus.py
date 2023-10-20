# Generated by Django 4.2.3 on 2023-09-14 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_order_orderstatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='orderStatus',
            field=models.CharField(choices=[('Awaiting Confirmation', 'NOT_CONFIRMED'), ('Confirmed', 'CONFIRMED'), ('Preparing', 'PREPARING'), ('Dispatching', 'DISPATCHING'), ('Ready', 'READY'), ('Complete', 'COMPLETE')], max_length=30),
        ),
    ]
