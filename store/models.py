from django.db import models
from django.conf import settings

class Floor(models.Model):
    floor_number = models.PositiveIntegerField()
    table_start_number = models.CharField(max_length=255)
    table_end_number = models.CharField(max_length=255)
    vip_table_start_number = models.CharField(max_length=255)
    vip_table_end_number = models.CharField(max_length=255)

class Table(models.Model):
    table_no = models.CharField(max_length=50)
    is_place_order = models.BooleanField(default=False)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='tables')
    is_vip = models.BooleanField(default=False)

class Category(models.Model):
    title = models.CharField(max_length=100)
    is_food = models.BooleanField(default=True)

class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

class Order(models.Model):
    table = models.CharField(max_length=10)
    customer_name = models.CharField(max_length=255, default='customer_name')
    discount = models.DecimalField(max_digits=10,decimal_places=2, default=0)
    is_takeway = models.BooleanField(default=False)
    is_order_open = models.BooleanField(default=False)
    is_order_canceld = models.BooleanField(default=False)
    service_charge = models.DecimalField(max_digits=10,decimal_places=2, default=0)
    created_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True, blank=True)
    date =models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order  = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems')
    quantity = models.IntegerField()
    
