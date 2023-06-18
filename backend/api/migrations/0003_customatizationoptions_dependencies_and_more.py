# Generated by Django 4.2.2 on 2023-06-18 08:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_order_time_alter_restaurant_joindate'),
    ]

    operations = [
        migrations.AddField(
            model_name='customatizationoptions',
            name='dependencies',
            field=models.ManyToManyField(blank=True, related_name='dependencies', to='api.customatizationoptions'),
        ),
        migrations.AlterField(
            model_name='customervisit',
            name='lastVisit',
            field=models.DateField(default=datetime.date(2023, 6, 18)),
        ),
        migrations.AlterField(
            model_name='order',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 18, 8, 32, 31, 587088, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='joinDate',
            field=models.DateField(default=datetime.datetime(2023, 6, 18, 8, 32, 31, 588450, tzinfo=datetime.timezone.utc)),
        ),
    ]
