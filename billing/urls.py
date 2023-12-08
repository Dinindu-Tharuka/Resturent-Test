from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter
from .views import BillViewSet, BillItemViewSet

router = DefaultRouter()
router.register('bills', BillViewSet, basename='bills')
router.register('bill-items', BillItemViewSet, basename='bill-items')


urlpatterns = [
    path('billing/', include(router.urls))
]