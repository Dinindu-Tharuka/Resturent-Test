from django.contrib import admin
from .models import Bill, BillItem

@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    pass

@admin.register(BillItem)
class BillItemAdmin(admin.ModelAdmin):
    pass
