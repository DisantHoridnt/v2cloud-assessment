from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Vm
from .serializers import VmSerializer

# Create your views here.

class VmViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing VM instances.
    """
    queryset = Vm.objects.all()
    serializer_class = VmSerializer
    # permission_classes = [IsAuthenticated]  # Uncomment if authentication is needed

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
