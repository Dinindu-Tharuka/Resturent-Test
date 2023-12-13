from .models import Category, Product, Order, OrderItem
from rest_framework.viewsets import ModelViewSet
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
            'category_id':self.kwargs['category_pk']
        }


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer_context(self):
        return {
            'user_id':self.request.user.id
        }


class OrderItemViewSet(ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def get_serializer_context(self):
        return { 'order_id':self.kwargs.get('order_pk')}
