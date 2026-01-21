from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.models import Datospersonales
from core.perfil_serializer import PerfilSerializer
from core.permissions import IsAdmin

class PerfilesListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        perfiles = Datospersonales.objects.filter(perfilactivo=1)
        serializer = PerfilSerializer(perfiles, many=True)
        return Response(serializer.data)
