from django.http import JsonResponse
from .celery import app as celery_app

def health_check(request):
    error = False

    #Check Celery
    x = celery_app.control.inspect().ping()
    x1 = 0
    
    if x is None:
        error = True
    else:
        for i in x:
            if x.get(i).get('ok') == 'pong':
                x1 += 1
            else:
                error = True
    c = {
        'celeryWorkers': x1,
        'error': error,
    }

    #Check Cache
    try:
        from django.core.cache import cache
        cache.set('test', 'test')
        x = cache.get('test')
        if x != 'test':
            error = True
    except:
        error = True

    r = True
    
    #Check DB
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            x = cursor.fetchone()
            db = True
            print(x)
    except:
        error = True
        db = False

    status = 200 if not error else 400

    return JsonResponse({
        'Celery': c,
        'Django': True,
        'Redis': r,
        'Database': db,
    },status=status)

