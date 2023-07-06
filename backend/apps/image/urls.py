
from django.urls import path
from .views import RemoveBgView, GalleyView, ImageView, FilterView, QualityView, FaceDetectionView, SizeCropView, DeleteImageView, ConvertFormatView
app_name = 'image'

urlpatterns = [
    path('gallery/', GalleyView.as_view(), name='gallery'),
    path('gallery/<str:pk>/', ImageView.as_view(), name='gallery-pk'),
    path('gallery/<str:pk>/delete/',
         DeleteImageView.as_view(), name='gallery-pk-delete'),

    path('removebg/', RemoveBgView.as_view(), name='removebg'),
    path('filter/<str:filter>/', FilterView.as_view(), name='filter'),
    path('quality/<str:quality>/', QualityView.as_view(), name='quality'),
    path('face-detection/', FaceDetectionView.as_view(), name='face-detection'),
    path('size-crop/', SizeCropView.as_view(), name='size-crop'),
    path('convert/', ConvertFormatView.as_view(), name='convert'),
]
