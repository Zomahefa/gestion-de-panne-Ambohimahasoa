from django.urls import path, include
from rest_framework import routers
from .views import TodoViewSet, TechnicianViewSet

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'technicians', TechnicianViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


