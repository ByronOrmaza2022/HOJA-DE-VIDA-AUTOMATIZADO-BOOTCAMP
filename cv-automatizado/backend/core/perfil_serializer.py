from rest_framework import serializers
from core.models import Datospersonales

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datospersonales
        fields = [
            "idperfil",
            "nombres",
            "apellidos",
            "email",
            "perfilactivo"
        ]
