from rest_framework import serializers, exceptions
from .models import Gallery, Image


class ImageSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Image
        exclude = ['gallery']

    def get_title(self, obj):
        return str(obj)


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class GalleryRetrieveSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, source='image_set')

    class Meta:
        model = Gallery
        fields = '__all__'


class ImageCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False),
        allow_empty=False
    )

    class Meta:
        model = Image
        fields = ['gallery', 'images']
        extra_kwargs = {
            'images': {'write_only': True}
        }

    def create(self, validated_data):
        gallery = validated_data['gallery']
        images = validated_data['images']
        obj_list = []
        try:
            for image in images:
                image_obj = Image.objects.create(gallery=gallery, image=image)
                obj_list.append(image_obj)
        except Exception as e:
            raise exceptions.ValidationError(e)
        return obj_list
