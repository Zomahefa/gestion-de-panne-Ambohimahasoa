from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'contact', 'status', 'created_at')

admin.site.register(Todo, TodoAdmin)
