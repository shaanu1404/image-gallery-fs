from typing import Any
from django.contrib import admin
from django.core.paginator import Paginator
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from .models import Gallery, Image


class GalleryAdmin(admin.ModelAdmin):
    list_display = ['name', 'user']


admin.site.register(Gallery, GalleryAdmin)


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image_title', 'image', 'gallery']

    @admin.display(description='Image title/name')
    def image_title(self, obj):
        return str(obj)
