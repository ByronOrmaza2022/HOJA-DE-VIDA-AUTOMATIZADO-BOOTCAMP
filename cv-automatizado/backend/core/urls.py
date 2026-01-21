from django.urls import path
from .views import CVView
#from .views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView

from core.admin_views.experiencia import (
    ExperienciaListCreateView,
    ExperienciaDetailView
)
from core.admin_views.cursos import (
    CursosListCreateView,
    CursosDetailView
)
from core.admin_views.reconocimientos import (
    ReconocimientosListCreateView,
    ReconocimientosDetailView
)
from .views import LoginView, LogoutView, MeView, PerfilPersonalMeView
from core.admin_views.perfiles import PerfilesListView

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("cv/", CVView.as_view()),
    
    # ME
    path("me/", MeView.as_view()),
    
    # PERFIL PERSONAL
    path("perfil/me/", PerfilPersonalMeView),

    # PERFILES
    path("admin/perfiles/", PerfilesListView.as_view()),

    # EXPERIENCIA
    path("admin/experiencia/", ExperienciaListCreateView.as_view()),
    path("admin/experiencia/<int:pk>/", ExperienciaDetailView.as_view()),

    # CURSOS
    path("admin/cursos/", CursosListCreateView.as_view()),
    path("admin/cursos/<int:pk>/", CursosDetailView.as_view()),

    # RECONOCIMIENTOS
    path("admin/reconocimientos/", ReconocimientosListCreateView.as_view()),
    path("admin/reconocimientos/<int:pk>/", ReconocimientosDetailView.as_view()),
]
