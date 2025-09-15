from rest_framework import viewsets
from .models import Technician, Todo
from .serializers import TechnicianSerializer, TodoSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

class TechnicianViewSet(viewsets.ModelViewSet):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)

        if not serializer.is_valid():
            print("❌ Erreurs de validation :", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data)

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [AllowAny]




