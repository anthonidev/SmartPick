
from django.urls import path
from .views import RemoveBgView, GalleyView, ImageView, FilterView, QualityView
app_name = 'land'

urlpatterns = [
    path('gallery/', GalleyView.as_view(), name='gallery'),
    path('gallery/<str:pk>/', ImageView.as_view(), name='gallery-pk'),

    path('removebg/', RemoveBgView.as_view(), name='removebg'),
    path('filter/<str:filter>/', FilterView.as_view(), name='filter'),
    path('quality/<str:quality>/', QualityView.as_view(), name='quality'),

]
