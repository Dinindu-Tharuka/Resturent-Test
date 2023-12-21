from rest_framework.viewsets import ModelViewSet
from .models import Category, Product, Order, OrderItem, Floor, Table
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer
from .serializers import FloorSerializer, TableSerializer
from settings.paginations import OrderPagination
from settings.functions import ConvertDateToDateTime

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_pk')
        queryset = Product.objects.filter(category_id=category_id).all()
        return queryset

    def get_serializer_context(self):
        return {
            'category_id': self.kwargs['category_pk']
        }


class AllProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderViewSet(ModelViewSet):    
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        startDate = self.request.GET.get('startDate')
        endDate = self.request.GET.get('endDate')

        if startDate or endDate:
            convertDate = ConvertDateToDateTime(startDate, endDate)
            queryset = queryset.filter(date__range=(convertDate.converted_min(), convertDate.converted_max()))
                
        return queryset

    def get_serializer_context(self):
        return {
            'user_id': self.request.user.id
        }


class PageOrderViewSet(ModelViewSet):
    
    serializer_class = OrderSerializer
    pagination_class = OrderPagination

    def get_queryset(self):
        queryset = Order.objects.all()
        startDate = self.request.GET.get('startDate')
        endDate = self.request.GET.get('endDate')

        if startDate or endDate:
            convertDate = ConvertDateToDateTime(startDate, endDate)
            queryset = queryset.filter(date__range=(convertDate.converted_min(), convertDate.converted_max()))
                
        return queryset
    
class AllOrderItemViewSet(ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    

class OrderItemViewSet(ModelViewSet):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        order_id = self.kwargs['order_pk']
        return OrderItem.objects.filter(order_id=order_id)

    def get_serializer_context(self):
        return {'order_id': self.kwargs.get('order_pk')}

class FloorViewSet(ModelViewSet):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer

class TableViewSet(ModelViewSet):
    serializer_class = TableSerializer

    def get_queryset(self):
        return Table.objects.filter(floor_id=self.kwargs['floor_pk'])
    
class AllTableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer