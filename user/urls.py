from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter
from .views import UserProfileViewSet, UserAccountViewSet, AllUserAccountViewSet

router = DefaultRouter()
router.register('profiles', UserProfileViewSet, basename='profiles')
router.register('page-users', UserAccountViewSet, basename='page-users')
router.register('all-users', AllUserAccountViewSet, basename='all-users')


urlpatterns = [
    path('', include(router.urls)),

]