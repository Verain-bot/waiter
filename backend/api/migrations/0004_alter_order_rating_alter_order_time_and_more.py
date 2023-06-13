# Generated by Django 4.2.2 on 2023-06-10 11:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_order_unique_order_remove_order_orderid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='rating',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 10, 11, 43, 27, 812418, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='joinDate',
            field=models.DateField(default=datetime.datetime(2023, 6, 10, 11, 43, 27, 814209, tzinfo=datetime.timezone.utc)),
        ),
    ]
