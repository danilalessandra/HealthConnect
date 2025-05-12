from django.db import models
from django.db import models
from django.contrib.auth.models import User  # Importa el modelo User
from django.db import models
from usuarios.models import User
from contenido.models import Content

class MoodLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    mood_score = models.IntegerField()
    log_date = models.DateTimeField(auto_now_add=True)  # Se guarda automáticamente la fecha y hora
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Registro de ánimo de {self.user_id.username} el {self.log_date}"


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Consider using Django's hashers
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

class Recommendation(models.Model):
    recommendation_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    content_id = models.ForeignKey(Content, on_delete=models.CASCADE)
    recommendation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recommendation {self.recommendation_id} for {self.user_id}"

class Content(models.Model):
    content_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content_type = models.CharField(max_length=50)
    content_text = models.TextField()

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    age = models.IntegerField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    preferences = models.JSONField(null=True, blank=True)  # Requires PostgreSQL

    def __str__(self):
        return f"Profile of {self.user_id}"

class ContentCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.category_name

class EmotionAnalysisResult(models.Model):
    analysis_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    analysis_date = models.DateTimeField(auto_now_add=True)
    emotion = models.CharField(max_length=50)

    def __str__(self):
        return f"Analysis {self.analysis_id} for {self.user_id}"

class Recommendation(models.Model):
    recommendation_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.ForeignKey(Content, on_delete=models.SET_NULL, null=True, blank=True)  #  Puede ser nulo si es una afirmación generada
    texto = models.TextField(blank=True, null=True)  #  Para afirmaciones o texto generado
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    # ... otros campos

    def __str__(self):
        return f"Recomendación para {self.user.name} el {self.fecha_creacion}"