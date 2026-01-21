#from django.shortcuts import render
from rest_framework.views import APIView

from .models import (
    Datospersonales,
    Experiencialaboral,
    Cursosrealizados,
    Reconocimientos
)
from .serializers import (
    DatospersonalesSerializer,
    ExperiencialaboralSerializer,
    CursosrealizadosSerializer,
    ReconocimientosSerializer
)
#-------------LOGIN

from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
#------------------
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin
from core.authentication import CookieJWTAuthentication


class MeView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        rol = "ADMIN" if user.groups.filter(name="ADMIN").exists() else "PERSONAL"

        return Response({
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "rol": rol,  # 👈 IMPORTANTE
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        })

# ============================
# 👤 PERFIL PERSONAL (ME)
# ============================

from rest_framework.decorators import api_view, permission_classes

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def PerfilPersonalMeView(request):
    """
    Devuelve el perfil Datospersonales asociado al usuario autenticado.
    """
    try:
        perfil = Datospersonales.objects.get(user=request.user)
    except Datospersonales.DoesNotExist:
        return Response(
            {"error": "Este usuario no tiene perfil asociado"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = DatospersonalesSerializer(perfil)
    return Response(serializer.data, status=status.HTTP_200_OK)


class ExperienciaUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def put(self, request, pk):
        # lógica de edición
        pass
class CursoUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def put(self, request, pk):
        # editar curso
        pass

#-------------LOGIN

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user

        rol = "ADMIN" if user.groups.filter(name="ADMIN").exists() else "PERSONAL"

        data.update({
            "username": user.username,
            "rol": rol
        })

        return data

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.user
        refresh = RefreshToken.for_user(user)

        rol = "ADMIN" if user.groups.filter(name="ADMIN").exists() else "PERSONAL"

        response = Response({
            "username": user.username,
            "rol": rol
        })
        
        ACCESS_SECONDS = 60 * 30   # 30 minutos (igual que SIMPLE_JWT)

        # 🔐 Cookie HTTPOnly
        response.set_cookie(
            key="access",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,      # True en producción HTTPS
            samesite="Lax",
            max_age=ACCESS_SECONDS
        )

        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logout exitoso"})

        response.delete_cookie(
            key="access",
            path="/",
            samesite="Lax"
        )

        return response


#------------------

#------------------

class CVView(APIView):
    def get(self, request):
        idperfil = request.query_params.get("idperfil")

        if not idperfil:
            return Response(
                {"error": "idperfil requerido"},
                status=status.HTTP_400_BAD_REQUEST
            )

        perfil = Datospersonales.objects.filter(
            idperfil=idperfil,
            perfilactivo=1
        ).first()


        if not perfil:
            return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
        #if not perfil:
        #    return Response(
        #        {"error": "No existe un perfil activo"},
        #        status=status.HTTP_404_NOT_FOUND
        #    )

        experiencia = Experiencialaboral.objects.filter(
            idperfilconqueestaactivo=perfil,
            #activarparaqueseveaenfront=True
        )#.order_by('-fechainiciogestion')

        cursos = Cursosrealizados.objects.filter(
            idperfilconqueestaactivo=perfil,
            #activarparaqueseveaenfront=True
        )#.order_by('-fechainicio')

        reconocimientos = Reconocimientos.objects.filter(
            idperfilconqueestaactivo=perfil,
            #activarparaqueseveaenfront=True
        )#.order_by('-fechareconocimiento')

        data = {
            "perfil": DatospersonalesSerializer(perfil).data,
            "experiencia_laboral": ExperiencialaboralSerializer(
                experiencia, many=True
            ).data,
            "cursos": CursosrealizadosSerializer(
                cursos, many=True
            ).data,
            "reconocimientos": ReconocimientosSerializer(
                reconocimientos, many=True
            ).data,
        }

        return Response(data, status=status.HTTP_200_OK)


