from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Vm, Server
from .serializers import VmSerializer, ServerSerializer

# Create your views here.

@api_view(['GET'])
def health_check(request):
    """
    Simple health check endpoint for Docker and monitoring
    """
    return Response({
        'status': 'healthy',
        'total_vms': Vm.objects.count(),
        'total_servers': Server.objects.count()
    }, status=status.HTTP_200_OK)

class ServerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing server instances.
    """
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

class VmViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing VM instances with enhanced validation.
    """
    queryset = Vm.objects.all()
    serializer_class = VmSerializer
    # permission_classes = [IsAuthenticated]  # Uncomment if authentication is needed

    def create(self, request, *args, **kwargs):
        try:
            # Validate server exists
            server_id = request.data.get('server_id')
            if not Server.objects.filter(id=server_id).exists():
                return Response(
                    {'detail': 'Invalid server selected'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Validate VM name uniqueness
            name = request.data.get('name')
            if Vm.objects.filter(name=name).exists():
                return Response(
                    {'detail': 'A VM with this name already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Validate CPU and RAM ranges
            cpus = request.data.get('cpus', 1)
            ram = request.data.get('ram', 4)
            
            if not (1 <= cpus <= 16):
                return Response(
                    {'detail': 'CPUs must be between 1 and 16'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if not (1 <= ram <= 64):
                return Response(
                    {'detail': 'RAM must be between 1 and 64 GB'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Proceed with creation
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED, 
                headers=headers
            )
        
        except Exception as e:
            return Response(
                {'detail': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
