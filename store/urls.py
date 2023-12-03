from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, OrderViewSet, OrderItemViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('products', ProductViewSet, basename='products')
router.register('orders', OrderViewSet, basename='orders')
router.register('order-items', OrderItemViewSet, basename='order-items')


urlpatterns = [
    path('', include(router.urls))
]
