from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
import os
from io import BytesIO

THUMBNAIL_SIZE = (300, 300)


def create_thumbnail(image, size=THUMBNAIL_SIZE):
    if image.width < THUMBNAIL_SIZE[0] or image.height < THUMBNAIL_SIZE[1]:
        return None

    name = os.path.split(image.name)[-1]
    ext = image.name.split('.')[-1]
    output = BytesIO()
    image.open(mode='rb')
    with Image.open(image) as img:
        img.thumbnail(size)
        img.save(output, ext)
        output.seek(0)

    file = SimpleUploadedFile(name, output.read(), content_type=ext)
    return file
