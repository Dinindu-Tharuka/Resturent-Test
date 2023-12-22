from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, Floor, Table


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'is_food']


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(read_only=True)
    orderitem_count = serializers.IntegerField(read_only=True)
    orderitem_total_quantity = serializers.SerializerMethodField(method_name='get_orderitem_total_quantity')
    orderitems_total_price = serializers.SerializerMethodField(method_name='get_orderitems_total_price')
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'category_id', 'orderitem_count', 'orderitem_total_quantity', 'orderitems_total_price']

    def get_orderitems_total_price(self, product):
        total = sum([item.quantity * product.price for item in  product.orderitems.all()])
        return total
    def get_orderitem_total_quantity(self,product):
        total = sum([item.quantity for item in  product.orderitems.all()])
        return total

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
        fields = ['id', 'product_id', 'order_id', 'quantity', 'item_total', 'datetime', 'is_ok_in_kitchen']

    def save(self, **kwargs):
        try:
            order_id = int(self.context['order_id'])
            # product_id = self.validated_data['product_id']
            # quantity = self.validated_data['quantity']
            # current_order = Order.objects.prefetch_related(
            #     'orderitems').get(id=order_id)
            # ids = [(item.product.id, item.id)
            #        for item in current_order.orderitems.all()]

            # for id in ids:
            #     if product_id == id[0]:
            #         self.instance = instance = OrderItem.objects.get(id=id[1])
            #         self.instance.quantity += quantity
            #         self.instance.save()
            #         break
            # else:
            #     self.instance = OrderItem.objects.create(
            #         order_id=order_id, **self.validated_data)
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
    
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'table_no', 'is_place_order', 'floor_id', 'is_vip']

class FloorSerializer(serializers.ModelSerializer):
    tables = TableSerializer(many=True, read_only=True)
    table_count = serializers.SerializerMethodField(method_name='calculate_table_count')
    vip_table_count = serializers.SerializerMethodField(method_name='vip_calculate_table_count')
    class Meta:
        model = Floor
        fields = ['id', 'floor_number', 'table_start_number', 'table_end_number', 'vip_table_start_number', 'vip_table_end_number',  'tables', 'table_count', 'vip_table_count']

    def calculate_table_count(self, floor):
        return len([table for table in floor.tables.all() if not table.is_vip])

    def vip_calculate_table_count(self, floor):
        return len([table for table in floor.tables.all() if table.is_vip])
    
    def create(self, validated_data):
       
        floor_number = validated_data.get('floor_number')
        table_start_number = validated_data.get('table_start_number')
        table_end_number = validated_data.get('table_end_number')
        vip_table_start_number = validated_data.get('vip_table_start_number')
        vip_table_end_number = validated_data.get('vip_table_end_number')
        floor_instance = super().create(validated_data)

        

        tables_start_nums = [int(table) for table in table_start_number.split(',')]

        print('splited start', tables_start_nums)
        tables_end_nums = [int(table) for table in table_end_number.split(',')]

        print('splited end', tables_end_nums)

        vip_tables_start_nums = [int(table) for table in vip_table_start_number.split(',')]
        vip_tables_end_nums = [int(table) for table in vip_table_end_number.split(',')]



        tables = []
        

        for index,start_num in enumerate(tables_start_nums):
            print('strat num', start_num, 'end num', tables_end_nums[index])
            if tables_end_nums[index] - start_num > 0:
                print('ok')
                for table_no in range(start_num, tables_end_nums[index]+1):
                    tables.append(Table(table_no=f'T{table_no}', is_place_order=False, floor_id=floor_instance.id))

        for index,vip_start_num in enumerate(vip_tables_start_nums):
            if vip_tables_end_nums[index] - vip_start_num > 0 :
                for table_no in range(vip_start_num, vip_tables_end_nums[index]+1):
                    tables.append(Table(table_no=f'V{table_no}', is_place_order=False, floor_id=floor_instance.id, is_vip=True))            
        

        Table.objects.bulk_create(tables)
        
        
        return floor_instance



