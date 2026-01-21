from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.models import Cursosrealizados
from core.serializers import CursosrealizadosSerializer
from core.permissions import IsAdmin


class CursosListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        idperfil = request.query_params.get("idperfil")
        cursos = Cursosrealizados.objects.all().order_by('-fechainicio')
        if idperfil:
            cursos = cursos.filter(idperfilconqueestaactivo_id=idperfil)
        
        serializer = CursosrealizadosSerializer(cursos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CursosrealizadosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CursosDetailView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def put(self, request, pk):
        curso = Cursosrealizados.objects.get(pk=pk)
        serializer = CursosrealizadosSerializer(
            curso, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        #curso = Cursosrealizados.objects.get(pk=pk)
        #curso.delete()
        Cursosrealizados.objects.filter(pk=pk).delete()
        return Response(status=204)


