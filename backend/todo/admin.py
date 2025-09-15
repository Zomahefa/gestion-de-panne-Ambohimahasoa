from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'status', 'technician_confirmed', 'created_at']
    list_filter = ['technician_confirmed']
