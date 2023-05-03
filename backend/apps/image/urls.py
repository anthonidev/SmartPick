
from django.urls import path
from .views import RemoveBgView
app_name = 'land'

urlpatterns = [


    path('removebg/', RemoveBgView.as_view(), name='removebg'),

]
