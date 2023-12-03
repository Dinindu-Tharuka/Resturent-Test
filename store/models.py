from django.db import models
from django.conf import settings

class Category(models.Model):
    title = models.CharField(max_length=100)

class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

class Order(models.Model):
    table = models.CharField(max_length=10)
    customer_name = models.CharField(max_length=255)
    discount = models.DecimalField(max_digits=8,decimal_places=2)
    is_takeway = models.BooleanField(default=False)
    created_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)
    date =models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    order  = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems')
    quantity = models.PositiveIntegerField()
