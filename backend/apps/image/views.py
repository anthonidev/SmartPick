from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.views import APIView
import cloudinary
from rembg import remove
from PIL import Image as Img
from os import remove as remove_file

from .models import Image,Galley
from .serializers import ImageSerializer, GalleySerializer
class RemoveBgView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    def post(self, request):
        image_file = request.data.get('image')
        user = self.request.user
        print(image_file)
        
        gallery, created = Galley.objects.get_or_create(user=user)
        
        try :
            image = Img.open(image_file)
            if image.mode != "RGBA":
                image = image.convert("RGBA")
            image = remove(image)
            image.save('image.png')
            image_upload = open('image.png', 'rb')
            image = cloudinary.uploader.upload(
                image_upload,
                folder='smart-pick',
            )
    
            
            Image.objects.create(
                format=image.get('format'),
                name=image.get('original_filename'),
                url=image.get('secure_url'),
                public_id=image.get('public_id'),
                asset_id=image.get('asset_id'),
                galley=gallery
            )
            
            image_upload.close()
            remove_file('image.png')
            
            image_up=Image.objects.get(public_id=image.get('public_id'))
            
            serializer = self.get_serializer(image_up)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Invalid image'}, status=status.HTTP_400_BAD_REQUEST)
        
        

        