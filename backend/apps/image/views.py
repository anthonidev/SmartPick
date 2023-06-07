from rest_framework.response import Response
from rest_framework import status, generics, permissions
import cloudinary
from rembg import remove
from PIL import Image as Img
from os import remove as remove_file

from .models import Image, Galley
from .serializers import ImageSerializer, GalleySerializer


class GalleyView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GalleySerializer
    queryset = Galley.objects.all()

    def get(self, request):
        user = self.request.user
        gallery, created = Galley.objects.get_or_create(user=user)
        serializer = self.get_serializer(gallery)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveBgView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request):
        image_file = request.data.get('image')
        user = self.request.user
        print(image_file)

        gallery, created = Galley.objects.get_or_create(user=user)

        try:
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
                galley=gallery,
                width=image.get('width'),
                height=image.get('height'),
                bytes=image.get('bytes'),
            )

            image_upload.close()
            remove_file('image.png')

            image_up = Image.objects.get(public_id=image.get('public_id'))

            serializer = self.get_serializer(image_up)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Invalid image'}, status=status.HTTP_400_BAD_REQUEST)


class ImageView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def get(self, request, pk):
        user = self.request.user
        gallery, created = Galley.objects.get_or_create(user=user)
        image = Image.objects.get(pk=pk, galley=gallery)

        # get cloudinary image

        # clound = cloudinary.uploader.resource(
        #     image.public_id,
        #     type='upload',
        #     resource_type='image',
        #     folder='smart-pick',
        # )

        # # List version of cloudinary image

        # # clound = cloudinary.api.resource(
        # #     image.public_id,
        # #     type='upload',
        # #     resource_type='image',
        # #     folder='smart-pick',
        # # )

        # if not clound:
        #     return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)
        # print(clound)

        serializer = self.get_serializer(image)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FilterView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request, filter):
        image_file = request.data.get('image')
        user = self.request.user
        print(image_file)

        gallery, created = Galley.objects.get_or_create(user=user)

        try:

            image = cloudinary.uploader.upload(
                image_file,
                folder='smart-pick',
                transformation=[
                    # {'width': 400, 'height': 400, 'crop': 'fill'},
                    {'effect': filter},
                ]
            )

            Image.objects.create(
                format=image.get('format'),
                name=image.get('original_filename'),
                url=image.get('secure_url'),
                public_id=image.get('public_id'),
                asset_id=image.get('asset_id'),
                width=image.get('width'),
                height=image.get('height'),
                bytes=image.get('bytes'),
                galley=gallery
            )

            image_up = Image.objects.get(public_id=image.get('public_id'))

            serializer = self.get_serializer(image_up)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Invalid image'}, status=status.HTTP_400_BAD_REQUEST)


class QualityView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request, quality):
        image_file = request.data.get('image')
        user = self.request.user

        gallery, created = Galley.objects.get_or_create(user=user)

        try:

            image = cloudinary.uploader.upload(
                image_file,
                folder='smart-pick',
                transformation=[
                    {
                       'quality': quality,
                    }
                ]
            )
            Image.objects.create(
                format=image.get('format'),
                name=image.get('original_filename'),
                url=image.get('secure_url'),
                public_id=image.get('public_id'),
                asset_id=image.get('asset_id'),
                width=image.get('width'),
                height=image.get('height'),
                bytes=image.get('bytes'),
                galley=gallery
            )
            image_up = Image.objects.get(public_id=image.get('public_id'))

            serializer = self.get_serializer(image_up)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Invalid image'}, status=status.HTTP_400_BAD_REQUEST)


class FaceDetectionView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request):
        user = self.request.user
        data = request.data

        width = data.get('width')
        height = data.get('height')
        crop = data.get('crop')
        image_file = data.get('image')
        zoom = data.get('zoom')
        gravity = data.get('gravity')

        print(width, height, crop, image_file)

        gallery, created = Galley.objects.get_or_create(user=user)

        try:

            image = cloudinary.uploader.upload(
                image_file,
                folder='smart-pick',
                transformation=[
                    {
                        'gravity': gravity,
                        'width': width,
                        'height': height,
                        'crop': crop,
                        'zoom': zoom,
                    }
                ]
            )
            print(image)
            Image.objects.create(
                format=image.get('format'),
                name=image.get('original_filename'),
                url=image.get('secure_url'),
                public_id=image.get('public_id'),
                asset_id=image.get('asset_id'),
                width=image.get('width'),
                height=image.get('height'),
                bytes=image.get('bytes'),
                galley=gallery
            )
            image_up = Image.objects.get(public_id=image.get('public_id'))

            serializer = self.get_serializer(image_up)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Invalid image'}, status=status.HTTP_400_BAD_REQUEST)


class SizeCropView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request):
        user = self.request.user
        data = request.data

        width = data.get('width')
        height = data.get('height')
        crop = data.get('crop')
        image_file = data.get('image')
        zoom = data.get('zoom')
        gravity = data.get('gravity')

        print(width, height, crop, image_file)

        gallery, created = Galley.objects.get_or_create(user=user)

        try:

            image = cloudinary.uploader.upload(
                image_file,
                folder='smart-pick',
                transformation=[
                    {
                        'gravity': gravity,
                        'width': width,
                        'height': height,
                        'crop': crop,
                        'zoom': zoom,
                        'background': 'auto',
                    }
                ]
            )
            print(image)
            Image.objects.create(
                format=image.get('format'),
                name=image.get('original_filename'),
                url=image.get('secure_url'),
                public_id=image.get('public_id'),
                asset_id=image.get('asset_id'),
                width=image.get('width'),
                height=image.get('height'),
                bytes=image.get('bytes'),
                galley=gallery
            )
            image_up = Image.objects.get(public_id=image.get('public_id'))

            serializer = self.get_serializer(image_up)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'Invalid image'}, status=status.HTTP_400_BAD_REQUEST)
