from .models import Bill, BillItem
from rest_framework.viewsets import ModelViewSet
from .serializers import BillSerializer, BillItemSerializer

class BillViewSet(ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class BillItemViewSet(ModelViewSet):
    queryset = BillItem.objects.all()
    serializer_class = BillItemSerializer

