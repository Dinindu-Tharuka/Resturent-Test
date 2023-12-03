from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter
from .views import UserProfileViewSet

router = DefaultRouter()
router.register('profiles', UserProfileViewSet, basename='profiles')


urlpatterns = [
    path('', include(router.urls))
]