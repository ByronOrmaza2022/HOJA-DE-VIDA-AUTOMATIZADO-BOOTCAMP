from rest_framework import serializers
from .models import Datospersonales, Experiencialaboral, Cursosrealizados, Reconocimientos

'''
class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datospersonales
        fields = [
            "idperfil",
            "nombres",
            "apellidos",
            "email",
            "perfilactivo"
        ]'''
class DatospersonalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datospersonales
        fields = '__all__'

class ExperiencialaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencialaboral
        fields = '__all__'
        read_only_fields = ("idexperiencilaboral",)

class CursosrealizadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursosrealizados
        fields = '__all__'
        read_only_fields = ("idcursorealizado",)

class ReconocimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reconocimientos
        fields = '__all__'
        read_only_fields = ("idreconocimiento",)
