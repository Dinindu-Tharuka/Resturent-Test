from rest_framework import serializers
from .models import Product, Category, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'is_food']

class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'category_id']

    def create(self, validated_data):
        category_id = self.context['category_id']
        product = Product.objects.create(category_id=category_id, **validated_data)
        return product

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
    created_user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'table', 'customer_name', 'discount', 'is_takeway', 'created_user_id', 'date', 'orderitems', 'total', 'is_order_canceld']

    def calculate_total(self, order:Order):
        return sum([item.product.price * item.quantity for item in order.orderitems.all()]) - order.discount

    def create(self, validated_data):
        user_id = self.context['user_id']
        insatance = Order.objects.create(created_user_id=user_id, **validated_data)
        return insatance
