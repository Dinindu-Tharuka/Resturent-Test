from rest_framework import serializers
from .models import UserProfile

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user_account_id', 'first_name', 'last_name', 'telephone', 'address']