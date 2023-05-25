from rest_framework import serializers

from .models import Image, Galley


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'format', 'created_at', 'name',
                  'url', 'public_id', 'asset_id', 'width', 'height', 'bytes')


class GalleySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Galley
        fields = (
            'created_at',
            'updated_at',
            'images',
        )
