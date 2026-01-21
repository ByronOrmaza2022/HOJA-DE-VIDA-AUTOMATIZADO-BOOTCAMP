from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from core.models import Experiencialaboral
from core.serializers import ExperiencialaboralSerializer
from core.permissions import IsAdmin


class ExperienciaListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        idperfil = request.query_params.get("idperfil")
        
        queryset = Experiencialaboral.objects.all().order_by(
            '-fechainiciogestion', 'nombrempresa'
        )

        if idperfil:
            queryset = queryset.filter(idperfilconqueestaactivo_id=idperfil)
            
        serializer = ExperiencialaboralSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExperiencialaboralSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ExperienciaDetailView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    #def get(self, request, pk):
    #    experiencia = Experiencialaboral.objects.get(
    #        idexperiencialaboral=pk
    #    )
    #    serializer = ExperiencialaboralSerializer(experiencia)
    #   return Response(serializer.data)

    def put(self, request, pk):
        experiencia = Experiencialaboral.objects.get(
            idexperiencilaboral=pk
        )
        serializer = ExperiencialaboralSerializer(
            experiencia,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.data)

    def delete(self, request, pk):
        #experiencia = Experiencialaboral.objects.get(
        #    idexperiencialaboral=pk
        #)
        #experiencia.delete()
        Experiencialaboral.objects.filter(pk=pk).delete()
        return Response(status=204)


