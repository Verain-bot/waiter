"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
import enum
from .mixins import URLEnumMixin
from django.views.generic import TemplateView
from .health import health_check

admin.site.site_header = 'toOne Admin'
admin.site.site_title = 'toOne Admin Portal'
admin.site.index_title = 'toOne Admin Portal'
admin.site.site_url = '/restaurant/admin/login/'

class URL_FOR_APPS(URLEnumMixin,enum.StrEnum):
    ADMIN = 'admin/'
    API = 'api/'
    OTP_AUTH = 'api/account/'
    RES_OWNER = 'restaurant/admin/'
    PAYMENTS = 'pay/'

    BASE = ''

    

urlpatterns = [
    path('health', health_check),
    path('sw.js', (TemplateView.as_view(template_name="sw.js", content_type='application/javascript', )), name='sw.js'),
    path(URL_FOR_APPS.ADMIN, admin.site.urls),
    path(URL_FOR_APPS.API,include('api.urls')),
    path(URL_FOR_APPS.OTP_AUTH,include('OTPAuth.urls'),name='otp-auth'),
    path(URL_FOR_APPS.RES_OWNER,include('ResOwner.urls')),
    path(URL_FOR_APPS.PAYMENTS,include('Payments.urls')),

    path('_nested_admin/', include('nested_admin.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
