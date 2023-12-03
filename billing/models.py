from django.db import models
from django.conf import settings
from store.models import Product

class Bill(models.Model):
    table = models.CharField(max_length=10)
    date = models.DateTimeField(auto_now=True)
    customer_name = models.CharField(max_length=255)
    created_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

class BillItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)

