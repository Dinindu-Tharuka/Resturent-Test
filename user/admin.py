from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile, UserAccount

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(UserAccount)
class UserAccountAdmin(UserAdmin):
    pass
