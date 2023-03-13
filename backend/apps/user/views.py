from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.conf import settings


class GoogleLoginView(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = f'{settings.FRONTEND_URL}/api/auth/callback/google'
    client_class = OAuth2Client


class FacebookLoginView(SocialLoginView):
    authentication_classes = []
    adapter_class = FacebookOAuth2Adapter
    callback_url = f'{settings.FRONTEND_URL}/api/auth/callback/facebook'
    client_class = OAuth2Client
