from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Vm, Server

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ['id', 'name', 'region']
        read_only_fields = ['id']
        extra_kwargs = {
            'name': {
                'required': True,
                'validators': [
                    UniqueValidator(
                        queryset=Server.objects.all(),
                        message='A server with this name already exists.'
                    )
                ]
            },
            'region': {
                'required': True
            }
        }

class VmSerializer(serializers.ModelSerializer):
    server = ServerSerializer(read_only=True)
    server_id = serializers.PrimaryKeyRelatedField(
        queryset=Server.objects.all(),
        source='server',
        write_only=True
    )

    class Meta:
        model = Vm
        fields = ['id', 'name', 'cpus', 'ram', 'server', 'server_id', 'active', 'ssh_key']
        read_only_fields = ['id', 'active']
        extra_kwargs = {
            'name': {
                'required': True,
                'validators': [
                    UniqueValidator(
                        queryset=Vm.objects.all(),
                        message='A VM with this name already exists.'
                    )
                ]
            },
            'cpus': {
                'required': True,
                'min_value': 1,
                'max_value': 16
            },
            'ram': {
                'required': True,
                'min_value': 1,
                'max_value': 64
            }
        }

    def validate_name(self, value):
        """
        Additional name validation
        """
        if not value or value.strip() == '':
            raise serializers.ValidationError("VM name cannot be empty.")
        return value.strip()

    def validate(self, data):
        """
        Cross-field validation
        """
        # Ensure server exists
        server_id = data.get('server')
        if not server_id:
            raise serializers.ValidationError("A valid server must be selected.")
        
        return data
