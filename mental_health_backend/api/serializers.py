from rest_framework import serializers
from .models import MoodLog
from django.contrib.auth.models import User

class MoodLogSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), default=serializers.CurrentUserDefault()) # Asegura que se asocie al usuario actual

    class Meta:
        model = MoodLog
        fields = ('log_id', 'user_id', 'mood_score', 'log_date', 'notes')
        read_only_fields = ('log_id', 'log_date')  # Estos campos no se pueden modificar al crear o actualizar