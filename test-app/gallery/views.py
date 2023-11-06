from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    GallerySerializer,
    ImageSerializer,
    GalleryRetrieveSerializer,
    ImageCreateSerializer,
)
from .models import Gallery, Image


class GalleryListAPIView(ListAPIView):
    serializer_class = GallerySerializer
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Gallery.objects.all()
        # .filter(user=self.request.user)


class GalleryRetrieveAPIView(RetrieveAPIView):
    serializer_class = GalleryRetrieveSerializer
    queryset = Gallery.objects.all()


class GalleryCreateAPIView(CreateAPIView):
    serializer_class = GallerySerializer

    def post(self, request, *args, **kwargs):
        draft_request_data = request.data.copy()
        draft_request_data['user'] = request.user if request.user.is_authenticated else 1
        serializer = self.serializer_class(data=draft_request_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({'message': 'Gallery created'}, status=status.HTTP_201_CREATED)


class ImageListAPIView(ListAPIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.all()

    def get(self, request, pk=None):
        gallery = Gallery.objects.get(pk=pk)
        images = self.get_queryset().filter(gallery=gallery)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AllImageListAPIView(ListAPIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.all()


class ImageUploadAPI(APIView):
    serializer_class = ImageCreateSerializer

    def get(self, request):
        return Response({'message': 'Message from GET request'})

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.create(serializer.validated_data)
        return Response({'message': 'Images uploaded successfully'}, status=status.HTTP_201_CREATED)
