## Tech Stack Used for this Project
### Backend
1. Django
2. Django Rest Framework
3. Celery
4. Redis - As Cache for complete project, message broker and result backend for celery. Also used for session storage.
5. MySQL Database

### Frontend
1. React (TSX)
2. React Router
3. Bootstrap 5

## Commands

Celery Worker command
```bash
celery -A backend worker -l INFO
```

Redis Server Command
```bash
redis-server
redis-cli
```

## ENV Variables to configure

```bash
V_ENV                           "DEV" or "PROD"
V_SMS_API_KEY 
V_MYSQL_HOST                    "HOST URL"
V_MYSQL_PORT
V_MYSQL_USER 
V_MYSQL_PASSWORD 
V_SECRET_KEY                    "Django Secret Key" 
V_FRONTEND_URL 
V_CACHE_URL                     "Redis Cache URL"
V_CELERY_BROKER                 "Celery message broker based on redis"
V_CELERY_RESULT_BACKEND         "Celery result storage based on redis"

```
## Other info

To generate test data run setUpTestData method of backend.tests.TestViews
