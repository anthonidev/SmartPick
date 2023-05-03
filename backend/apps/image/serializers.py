from rest_framework import serializers

from .models import Image, Galley

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id','format','created_at','name','url','public_id','asset_id','galley')
        
class GalleySerializer(serializers.ModelSerializer):
    class Meta:
        model = Galley
        fields = '__all__'