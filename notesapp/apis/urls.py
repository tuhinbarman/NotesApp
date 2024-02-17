from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import NotesViewset


router = DefaultRouter()
router.register('notes',NotesViewset,basename='notes')

urlpatterns = [
    path('',include(router.urls))   
]