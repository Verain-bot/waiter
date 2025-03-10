# Generated by Django 4.2.7 on 2023-12-02 14:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0021_order_paymentstatus'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentStatus',
            fields=[
                ('payment_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('success', models.BooleanField(default=False)),
                ('payment_gateway', models.CharField(max_length=50)),
                ('data', models.JSONField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='payment_status', to='api.order')),
            ],
        ),
    ]
