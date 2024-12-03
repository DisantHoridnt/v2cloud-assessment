from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VmViewSet, ServerViewSet, health_check

router = DefaultRouter()
router.register(r'vms', VmViewSet)
router.register(r'servers', ServerViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('health/', health_check, name='health_check'),
]
