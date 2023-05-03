from django.contrib import admin
from .models import Galley, Image
admin.site.site_header = "Gallery Admin"
admin.site.site_title = "Gallery Admin Portal"
admin.site.index_title = "Welcome to Gallery Portal"

admin.site.register(Galley)
admin.site.register(Image)