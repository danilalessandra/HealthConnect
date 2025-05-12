"""
URL configuration for mental_health_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from recomendaciones import views
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from .views import (
    UserListView, UserDetailView,
    MoodLogListView, MoodLogDetailView,
    RecommendationListView, RecommendationDetailView,
    ContentListView, ContentDetailView,
    UserProfileListView, UserProfileDetailView,
    ContentCategoryListView, ContentCategoryDetailView,
    EmotionAnalysisResultListView, EmotionAnalysisResultDetailView
)

urlpatterns = [
    # USER
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),

    # MOOD_LOG
    path('mood-logs/', MoodLogListView.as_view(), name='mood-log-list'),
    path('mood-logs/<int:pk>/', MoodLogDetailView.as_view(), name='mood-log

urlpatterns = [
    path('recomendaciones/<int:user_id>/', views.obtener_recomendaciones_api, name='obtener_recomendaciones_api'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('recomendaciones.urls')),  #  Incluye las URLs de la app recomendaciones bajo /api/
    # ... otras URLs
]
























































































































































































