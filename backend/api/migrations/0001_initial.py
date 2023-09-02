# Generated by Django 4.2.3 on 2023-09-02 09:55

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomatizationOptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('price', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerVisit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lastVisit', models.DateField(default=django.utils.timezone.now)),
                ('totalVisits', models.PositiveSmallIntegerField(default=0)),
                ('storeCredit', models.PositiveIntegerField(default=0)),
                ('customerRating', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('customerComment', models.CharField(blank=True, max_length=200, null=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ItemDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ItemType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100)),
                ('price', models.PositiveIntegerField(default=100)),
                ('description', models.TextField(blank=True, max_length=500)),
                ('totalOrders', models.PositiveIntegerField(default=0)),
                ('rating', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('totalRatings', models.PositiveIntegerField(default=0)),
                ('itemPhoto', models.ImageField(blank=True, upload_to=api.models.MenuUploadTo)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField(default=0)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('tableNumber', models.PositiveSmallIntegerField(default=0)),
                ('tip', models.PositiveSmallIntegerField(default=0)),
                ('orderStatus', models.CharField(blank=True, max_length=10)),
                ('rating', models.SmallIntegerField(blank=True, null=True)),
                ('comment', models.TextField(blank=True, max_length=500)),
                ('takeawayOrDinein', models.SmallIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('preOrPost', models.SmallIntegerField(default=0)),
                ('licenceNo', models.CharField(blank=True, max_length=15)),
                ('restaurantType', models.CharField(blank=True, max_length=30)),
                ('primColor', models.CharField(blank=True, max_length=10)),
                ('secColor', models.CharField(blank=True, max_length=10)),
                ('logo', models.ImageField(blank=True, upload_to=api.models.restaurantUploadTo)),
                ('owner', models.CharField(blank=True, max_length=50)),
                ('location', models.CharField(blank=True, max_length=30)),
                ('phone', models.PositiveBigIntegerField(blank=True, null=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('joinDate', models.DateField(default=django.utils.timezone.now)),
                ('tables', models.PositiveSmallIntegerField(default=10)),
                ('customers', models.ManyToManyField(related_name='customers', through='api.CustomerVisit', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SpecialItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('color', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Tables',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tableNumber', models.PositiveSmallIntegerField(default=0)),
                ('capacity', models.PositiveSmallIntegerField(default=0)),
                ('status', models.CharField(default='Available', max_length=50)),
                ('customersSitting', models.ManyToManyField(blank=True, related_name='customer_sitting', to=settings.AUTH_USER_MODEL)),
                ('restaurant', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_table', to='api.restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='SubOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField(default=0)),
                ('tip', models.PositiveSmallIntegerField(default=0)),
                ('customer', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='customer', to=settings.AUTH_USER_MODEL)),
                ('items', models.ManyToManyField(blank=True, related_name='suborder_items', through='api.ItemDetail', to='api.menuitem')),
                ('order', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='order', to='api.order')),
            ],
        ),
        migrations.CreateModel(
            name='Quantity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.PositiveSmallIntegerField()),
                ('itemDetail', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='itemDetail', to='api.itemdetail')),
                ('option', models.ManyToManyField(blank=True, related_name='option', to='api.customatizationoptions')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='customers',
            field=models.ManyToManyField(blank=True, related_name='customerList', through='api.SubOrder', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='order',
            name='restaurant',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_order', to='api.restaurant'),
        ),
        migrations.CreateModel(
            name='MenuItemCustomization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('customizationType', models.CharField(blank=True, max_length=10)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item_customization', to='api.menuitem')),
            ],
        ),
        migrations.AddField(
            model_name='menuitem',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='special', to='api.specialitem'),
        ),
        migrations.AddField(
            model_name='menuitem',
            name='itemType',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='itemtype', to='api.itemtype'),
        ),
        migrations.AddField(
            model_name='menuitem',
            name='restaurant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='restaurant', to='api.restaurant'),
        ),
        migrations.AddField(
            model_name='itemdetail',
            name='item',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='item', to='api.menuitem'),
        ),
        migrations.AddField(
            model_name='itemdetail',
            name='suborder',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='suborder', to='api.suborder'),
        ),
        migrations.AddField(
            model_name='customervisit',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurant'),
        ),
        migrations.AddField(
            model_name='customatizationoptions',
            name='customization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customization_options', to='api.menuitemcustomization'),
        ),
        migrations.AddField(
            model_name='customatizationoptions',
            name='dependencies',
            field=models.ManyToManyField(blank=True, to='api.customatizationoptions'),
        ),
        migrations.AddConstraint(
            model_name='tables',
            constraint=models.UniqueConstraint(fields=('restaurant', 'tableNumber'), name='unique_table'),
        ),
        migrations.AddConstraint(
            model_name='order',
            constraint=models.UniqueConstraint(fields=('id', 'restaurant'), name='unique_order'),
        ),
        migrations.AddConstraint(
            model_name='menuitem',
            constraint=models.UniqueConstraint(fields=('restaurant', 'id'), name='unique_menu_item'),
        ),
    ]
