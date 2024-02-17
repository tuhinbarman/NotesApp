from django.contrib import admin
from .models import Notes

# Register your models here.

class NotesAdmin(admin.ModelAdmin):
    list_display = ('id', 'body', 'updated', 'created')
    list_display_links = ('id',)
    list_filter = ('created', 'updated')
    list_editable = ('body',)
    search_fields = ('body',)
    list_per_page = 10


admin.site.register(Notes,NotesAdmin) 

