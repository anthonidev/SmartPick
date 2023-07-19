from django.contrib.auth.models import User
from django.test import RequestFactory, TestCase
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from PIL import Image as Img
from io import BytesIO
from .models import Image, Galley
from .views import RemoveBgView


class RemoveBgViewTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="top_secret"
        )

    def test_post_valid_image(self):
        # Create a test image and simulate the request
        image = Img.new("RGBA", (100, 100), (255, 0, 0, 255))
        image_file = BytesIO()
        image.save(image_file, "PNG")
        image_file.seek(0)

        request = self.factory.post("/remove-bg", {"image": image_file})
        request.user = self.user

        response = RemoveBgView.as_view()(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Image.objects.count(), 1)

        image = Image.objects.first()
        self.assertEqual(image.format, "png")
        self.assertEqual(image.name, "image.png")

    def test_post_invalid_image(self):
        request = self.factory.post("/remove-bg", {})
        request.user = self.user

        response = RemoveBgView.as_view()(request)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Image.objects.count(), 0)
