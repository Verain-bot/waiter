# Generated by Django 4.2.7 on 2023-11-25 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OTPAuth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analytics',
            name='user_agent',
            field=models.CharField(max_length=250),
        ),
    ]
