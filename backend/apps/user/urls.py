from django.urls import path
from .views import GoogleLoginView, FacebookLoginView

app_name = 'user'
urlpatterns = [
    path('google/', GoogleLoginView.as_view(), name='google'),
    path('facebook/', FacebookLoginView.as_view(), name='facebook'),
]
