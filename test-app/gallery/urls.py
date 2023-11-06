from django.urls import path
from .views import (
    GalleryListAPIView,
    GalleryRetrieveAPIView,
    GalleryCreateAPIView,
    ImageListAPIView,
    AllImageListAPIView,
    ImageUploadAPI,
)

urlpatterns = [
    path('', GalleryListAPIView.as_view(), name='gallery_list_api'),
    path('create/', GalleryCreateAPIView.as_view(), name='gallery_create_api'),
    path('all/', AllImageListAPIView.as_view(), name='all_images_list_api'),
    path('<int:pk>/', GalleryRetrieveAPIView.as_view(),
         name='gallery_retrieve_all'),
    path('<int:pk>/images/', ImageListAPIView.as_view(),
         name='gallery_images'),
    path('images/upload/', ImageUploadAPI.as_view(), name='image_upload'),
]
