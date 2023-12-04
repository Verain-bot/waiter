from OTPAuth.models import Analytics
from django.conf import settings

class AnalyticsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if settings.DEBUG:
            return None

        if request.path.startswith('/media') or request.path.startswith('/static'):
            return None
        
        pathname = str(view_func.__name__).lower().removesuffix('view')

        if 'view_class' in dir(view_func):
            pathname = str(view_func.view_class.__name__).lower().removesuffix('view')

        a = Analytics.objects.create(
            path = pathname,
            remote_addr = request.META.get('REMOTE_ADDR', None),
            user_agent = request.META.get('HTTP_USER_AGENT', None),
            host = request.META.get('HTTP_HOST', None),
            user = request.user if request.user.is_authenticated else None
        )
        
        a.save()
        
        return None