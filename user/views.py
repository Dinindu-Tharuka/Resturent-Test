from .models import UserProfile
from rest_framework.viewsets import ModelViewSet
from .serializers import UserProfileSerializer

class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
