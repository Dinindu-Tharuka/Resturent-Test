from rest_framework import serializers
from .models import UserProfile, UserAccount

class UserAccountSeriaizer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'user_name', 'email', 'is_superuser', 'is_chef', 'is_cashier']

class UserProfileSerializer(serializers.ModelSerializer):
    user_account_id = serializers.IntegerField()
    class Meta:
        model = UserProfile
        fields = ['id', 'user_account_id', 'first_name', 'last_name', 'telephone', 'address']