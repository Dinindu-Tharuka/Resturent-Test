from .models import UserProfile, UserAccount
from rest_framework.viewsets import ModelViewSet
from .serializers import UserProfileSerializer, UserAccountSeriaizer
from settings.paginations import UserPagination


class UserAccountViewSet(ModelViewSet):
    serializer_class = UserAccountSeriaizer
    pagination_class = UserPagination

    def get_queryset(self):        
        queryset = UserAccount.objects.order_by('-id').all()
        username = self.request.GET.get('username')
        if username:
            queryset = queryset.filter(user_name__startswith=username)
        return queryset
    
class AllUserAccountViewSet(ModelViewSet):
    queryset = UserAccount.objects.order_by('-id').all()
    serializer_class = UserAccountSeriaizer

class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
