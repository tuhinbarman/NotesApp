
from rest_framework.viewsets import GenericViewSet
from .models import Notes
from rest_framework.mixins import (CreateModelMixin,
                                   ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin,
                                   
                                   DestroyModelMixin) 

from .serializers import NotesSerializer

# Create your views here.

class NotesViewset(GenericViewSet,
                   CreateModelMixin,
                   ListModelMixin,
                   RetrieveModelMixin,
                   UpdateModelMixin,
                   DestroyModelMixin):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    
    

