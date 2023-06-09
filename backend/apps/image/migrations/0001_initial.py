# Generated by Django 4.1.5 on 2023-05-03 22:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Galley',
            fields=[
                ('id', models.CharField(blank=True, default=uuid.uuid4, editable=False, max_length=36, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.CharField(blank=True, default=uuid.uuid4, editable=False, max_length=36, primary_key=True, serialize=False, verbose_name='ID')),
                ('format', models.CharField(max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=100)),
                ('url', models.URLField()),
                ('public_id', models.CharField(max_length=100)),
                ('asset_id', models.CharField(max_length=100)),
                ('galley', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='image.galley')),
            ],
        ),
    ]
