
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('api/auth/', include('dj_rest_auth.urls')),

    path('api/social/login/', include('apps.user.urls')),
    path('', admin.site.urls),
]
