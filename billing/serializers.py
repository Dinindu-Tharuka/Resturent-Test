from rest_framework import serializers
from .models import Bill, BillItem

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'table', 'date', 'customer_name', 'created_user_id']

class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = ['id', 'product_id', 'quantity', 'bill_id']