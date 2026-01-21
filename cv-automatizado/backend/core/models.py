from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
#--------------AGREGADO MANUALMENTE
class Usuario(AbstractUser):
    ROL_CHOICES = (
        ('ADMIN', 'Administrador'),
        ('PERSONAL', 'Personal'),
    )
    rol = models.CharField(max_length=10, choices=ROL_CHOICES)
#--------------------
# Create your models here.
class Datospersonales(models.Model):
    idperfil = models.AutoField(primary_key=True)
    descripcionperfil = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    perfilactivo = models.IntegerField(blank=True, null=True)
    apellidos = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    nombres = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    nacionalidad = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    lugarnacimiento = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    fechanacimiento = models.DateField(blank=True, null=True)
    numerocedula = models.CharField(unique=True, max_length=10, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    sexo = models.CharField(max_length=1, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    estadocivil = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    licenciaconducir = models.CharField(max_length=6, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    telefonoconvencional = models.CharField(max_length=15, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    telefonofijo = models.CharField(max_length=15, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    direcciontrabajo = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    direcciondomiciliaria = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    sitioweb = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    email = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,   # core_usuario
        on_delete=models.CASCADE,
        db_column="user_id",
        null=True,
        blank=True,
        related_name="perfil"
    )
    class Meta:
        managed = False
        db_table = 'DATOSPERSONALES'


class Experiencialaboral(models.Model):
    idexperiencilaboral = models.BigAutoField(primary_key=True)
    idperfilconqueestaactivo = models.ForeignKey(Datospersonales, models.DO_NOTHING, db_column='idperfilconqueestaactivo', related_name='experiencias_laborales')#, blank=True, null=True)
    cargodesempenado = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    nombrempresa = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    lugarempresa = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    emailempresa = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    sitiowebempresa = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    nombrecontactoempresarial = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    telefonocontactoempresarial = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    fechainiciogestion = models.DateField()#blank=True, null=True)
    fechafingestion = models.DateField(blank=True, null=True)
    descripcionfunciones = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    activarparaqueseveaenfront = models.BooleanField()#blank=True, null=True)
    rutacertificado = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'EXPERIENCIALABORAL'
        
class Cursosrealizados(models.Model):
    idcursorealizado = models.BigAutoField(primary_key=True)
    idperfilconqueestaactivo = models.ForeignKey('Datospersonales', models.DO_NOTHING, db_column='idperfilconqueestaactivo', related_name='cursos')#, blank=True, null=True)
    nombrecurso = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    fechainicio = models.DateField()#blank=True, null=True)
    fechafin = models.DateField(blank=True, null=True)
    totalhoras = models.IntegerField()#blank=True, null=True)
    descripcioncurso = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    entidadpatrocinadora = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    nombrecontactoauspicia = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    telefonocontactoauspicia = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    emailempresapatrocinadora = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    activarparaqueseveaenfront = models.BooleanField()#blank=True, null=True)
    rutacertificado = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'CURSOSREALIZADOS'

class Reconocimientos(models.Model):
    idreconocimiento = models.BigAutoField(primary_key=True)
    idperfilconqueestaactivo = models.ForeignKey(Datospersonales, models.DO_NOTHING, db_column='idperfilconqueestaactivo', related_name='reconocimientos')#, blank=True, null=True)
    tiporeconocimiento = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    fechareconocimiento = models.DateField(blank=True, null=True)
    descripcionreconocimiento = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    entidadpatrocinadora = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    nombrecontactoauspicia = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    telefonocontactoauspicia = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)
    activarparaqueseveaenfront = models.BooleanField(blank=True, null=True)
    rutacertificado = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AI', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'RECONOCIMIENTOS'