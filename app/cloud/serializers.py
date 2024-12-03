from rest_framework import serializers
from .models import Vm, Server

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ['id', 'name', 'region']

class VmSerializer(serializers.ModelSerializer):
    server = ServerSerializer(read_only=True)
    server_id = serializers.PrimaryKeyRelatedField(
        queryset=Server.objects.all(),
        source='server',
        write_only=True,
        required=False
    )

    class Meta:
        model = Vm
        fields = ['id', 'name', 'cpus', 'ram', 'server', 'server_id', 'active', 'ssh_key']
        read_only_fields = ['id']
