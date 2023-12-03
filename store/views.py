from .models import Category, Product, Order, OrderItem
from rest_framework.viewsets import ModelViewSet
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductItemViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderItemViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer