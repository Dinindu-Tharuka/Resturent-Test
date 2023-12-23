from django.db.models import Count
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from settings.paginations import OrderPagination
from settings.functions import ConvertDateToDateTime
import pandas as pd
from .models import Category, Product, Order, OrderItem, Floor, Table
from .serializers import FloorSerializer, TableSerializer, FileSerializer
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer

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
    
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.prefetch_related('orderitems').annotate(orderitem_count=Count('orderitems')).all()

        startDate = self.request.GET.get('startDate')
        endDate = self.request.GET.get('endDate')
        productId = self.request.GET.get('productId')

        if startDate or endDate:
            convertDate = ConvertDateToDateTime(startDate, endDate)
            queryset = queryset.filter(orderitems__datetime__range=(convertDate.converted_min(), convertDate.converted_max()))

        if productId and productId != 0:
            queryset = queryset.filter(id=productId)
        return queryset


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

class MultipleMakeProducts(APIView):
    serializer_class = FileSerializer
    parser_classes = (FormParser, MultiPartParser)
    
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if not serializer.is_valid():
            return Response('Error', status=status.HTTP_400_BAD_REQUEST)
        excel_file = data.get('file')
        category_id = data.get('category_id')
        read_excel = pd.read_excel(excel_file)
        product_objs = [Product(title=row['product'], 
                                price=row['price'], 
                                category_id=category_id) for index, row in read_excel.iterrows()]
        

        Product.objects.bulk_create(product_objs)
        return Response('Ok', status=status.HTTP_200_OK)