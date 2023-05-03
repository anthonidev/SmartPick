from django.db import models
from django.contrib.auth import get_user_model
from uuid import uuid4

User = get_user_model()

class Galley(models.Model):
    id = models.CharField(
        max_length=36,  default=uuid4, primary_key=True, editable=False, verbose_name="ID", blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.id


class Image(models.Model):
    id = models.CharField(
        max_length=36,  default=uuid4, primary_key=True, editable=False, verbose_name="ID", blank=True)
    format = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    url = models.URLField(max_length=200)
    public_id = models.CharField(max_length=100)
    asset_id = models.CharField(max_length=100)
    galley = models.ForeignKey(Galley, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name                    

