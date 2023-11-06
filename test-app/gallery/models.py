from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from .utils import create_thumbnail


class Gallery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'gallery'
        verbose_name_plural = 'galleries'


class Image(models.Model):
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='images')
    thumbnail = models.ImageField(
        upload_to='thumbnails', null=True, blank=True)

    def __str__(self):
        title = self.title
        if not title:
            title = self.image.name.split('/')[-1]
        return title


def create_thumbnail_pre_save_reciever(sender, instance, **kwargs):
    print('create_thumbnail_pre_save_reciever')
    update_thumbnail = False
    if instance.id is not None:
        obj = sender.objects.get(id=instance.id)
        update_thumbnail = instance.image != obj.image
    if not instance.thumbnail or update_thumbnail:
        print('Creating thumbnail...')
        instance.thumbnail = create_thumbnail(instance.image)
    if not instance.title:
        instance.title = instance.image.name.split('/')[-1]


pre_save.connect(create_thumbnail_pre_save_reciever, sender=Image)
