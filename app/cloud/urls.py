from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VmViewSet

router = DefaultRouter()
router.register(r'vms', VmViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
