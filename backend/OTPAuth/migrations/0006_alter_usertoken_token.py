# Generated by Django 4.2.7 on 2023-12-29 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OTPAuth', '0005_usertoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertoken',
            name='token',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
