# Generated by Django 4.2.3 on 2023-09-16 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_order_orderstatus'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemdetail',
            name='price',
        ),
        migrations.AddField(
            model_name='quantity',
            name='price',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='order',
            name='orderStatus',
            field=models.CharField(choices=[('NOT_CONFIRMED', 'Awaiting Confirmation'), ('CONFIRMED', 'Confirmed'), ('PREPARING', 'Preparing'), ('DISPATCHING', 'Dispatching'), ('READY', 'Ready'), ('COMPLETE', 'Complete'), ('CANCELLED', 'Cancelled')], default='NOT_CONFIRMED', max_length=15),
        ),
    ]
