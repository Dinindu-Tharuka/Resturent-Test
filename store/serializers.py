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
        product = Product.objects.create(
            category_id=category_id, **validated_data)
        return product


class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    item_total = serializers.SerializerMethodField(
        method_name='calculate_item_total', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'order_id', 'quantity', 'item_total']

    def save(self, **kwargs):
        try:
            order_id = int(self.context['order_id'])
            product_id = self.validated_data['product_id']
            quantity = self.validated_data['quantity']
            current_order = Order.objects.prefetch_related(
                'orderitems').get(id=order_id)
            ids = [(item.product.id, item.id)
                   for item in current_order.orderitems.all()]

            for id in ids:
                if product_id == id[0]:
                    self.instance = instance = OrderItem.objects.get(id=id[1])
                    self.instance.quantity += quantity
                    self.instance.save()
                    break
            else:
                self.instance = OrderItem.objects.create(
                    order_id=order_id, **self.validated_data)

        except:
            print('Error')

        return self.instance

    def calculate_item_total(self, item: OrderItem):
        product = Product.objects.get(id=item.product.id)

        return item.quantity * product.price


class OrderSerializer(serializers.ModelSerializer):
    orderitems = OrderItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField(method_name='calculate_total')
    total_product_price = serializers.SerializerMethodField(method_name='total_product_price_cal')
    service_charge_price = serializers.SerializerMethodField(method_name='service_charge_price_calculation')
    created_user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'table', 'customer_name', 'discount', 'is_takeway', 'created_user_id',
                  'date', 'orderitems', 'total', 'total_product_price', 'is_order_canceld', 'is_order_open', 'service_charge', 'service_charge_price']

    def calculate_total(self, order: Order):
        return round(((sum([item.product.price * item.quantity for item in order.orderitems.all()]) * (100 - order.discount))/100) * (100 + order.service_charge)/100, 2)
    
    def total_product_price_cal(self, order:Order):
        return round(sum([item.product.price * item.quantity for item in order.orderitems.all()]), 2)
    
    def service_charge_price_calculation(self, order:Order):
        return round(((sum([item.product.price * item.quantity for item in order.orderitems.all()]) * (100 - order.discount))/100) * (order.service_charge)/100, 2)

    def create(self, validated_data):
        user_id = self.context['user_id']
        insatance = Order.objects.create(
            created_user_id=user_id, **validated_data)
        return insatance


