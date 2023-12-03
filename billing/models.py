from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100)

class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

