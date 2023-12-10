from rest_framework import serializers
from .models import Product, Category, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'is_food']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'category_id']

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'order_id', 'quantity']

    def create(self, validated_data):
        order_id = int(self.context['order_id'])
        instance = OrderItem.objects.create(order_id=order_id, **validated_data)
        return instance

class OrderSerializer(serializers.ModelSerializer):
    orderitems = OrderItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField(method_name='calculate_total')
    class Meta:
        model = Order
        fields = ['id', 'table', 'customer_name', 'discount', 'is_takeway', 'created_user_id', 'date', 'orderitems', 'total']

    def calculate_total(self, order:Order):
        return sum([item.product.price * item.quantity for item in order.orderitems.all()]) - order.discount

    def create(self, validated_data):
        insatance = Order.objects.create(created_user_id=1, **validated_data)
        return insatance
