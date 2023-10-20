# Generated by Django 4.2.3 on 2023-09-14 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_order_orderstatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='orderStatus',
            field=models.CharField(choices=[('NOT_CONFIRMED', 'Awaiting Confirmation'), ('CONFIRMED', 'Confirmed'), ('PREPARING', 'Preparing'), ('DISPATCHING', 'Dispatching'), ('READY', 'Ready'), ('COMPLETE', 'Complete')], max_length=15),
        ),
    ]
