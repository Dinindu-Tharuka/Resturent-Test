from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import CategoryViewSet, ProductViewSet, OrderItemViewSet, AllOrderItemViewSet, AllProductViewSet
from .views import PageOrderViewSet, OrderViewSet
from .views import FloorViewSet, TableViewSet

router = DefaultRouter()
router.register('product-categories', CategoryViewSet, basename='product-categories')
router.register('orders', OrderViewSet, basename='orders')
router.register('page-orders', PageOrderViewSet, basename='page-orders')
router.register('all-order-items', AllOrderItemViewSet, basename='all-orderitems')
router.register('all-products', AllProductViewSet, basename='all-products')

## Tables
router.register('floors', FloorViewSet, basename='floors')
router.register('tables', TableViewSet, basename='tables')

table_router = NestedDefaultRouter(router, 'floors', lookup='floor')
table_router.register('tables', TableViewSet, basename='tables')

product_router = NestedDefaultRouter(router, 'product-categories', lookup='category')
product_router.register('products', ProductViewSet, basename='category-products')

orderitem_router = NestedDefaultRouter(router, 'orders', lookup='order')
orderitem_router.register('order-items', OrderItemViewSet, basename='order-items')

urlpatterns = [
    path('store/', include(router.urls)),
    path('store/', include(product_router.urls)),
    path('store/', include(orderitem_router.urls)),
]
