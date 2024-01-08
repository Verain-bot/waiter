## Tech Stack Used for this Project
### Backend
1. Django
2. Django Rest Framework
3. Celery
4. Redis - As Cache for complete project, message broker and result backend for celery. Also used for session storage.
5. PostgreSQL Database

### Frontend
1. React (TSX)
2. React Router
3. Bootstrap 5

## Commands

Celery Worker command
```bash
celery -A backend worker -l INFO
celery multi start -A backend --pool=threads --concurrency=5 1 2 3
celery multi stopwait -A backend --pool=threads --concurrency=5 1 2 3
```

Celery info path
```bash
PID:  /var/run/celery
Logs: /var/log/celery
```

Redis Server Command
```bash
redis-server
redis-cli
```

Command to kill process on a port
```bash
kill -9 $(lsof -t -i:8080)
```
## ENV Variables to configure

```bash
V_ENV                           "DEV" or "PROD"
V_ALLOWED_HOSTS
V_SMS_API_KEY 
V_DB_HOST                       "DB HOST URL"
V_DB_PORT
V_DB_USER 
V_DB_PASSWORD 
V_SECRET_KEY                    "Django Secret Key" 
V_FRONTEND_URL 
V_CACHE_URL                     "Redis Cache URL"
V_CELERY_BROKER                 "Celery message broker based on redis"
V_CELERY_RESULT_BACKEND         "Celery result storage based on redis"
V_PHONE_PE_MERCHANT_ID
V_PHONE_PE_SALT_KEY
V_MEDIA_STORAGE
GOOGLE_APPLICATION_CREDENTIALS
```
## Other info

To generate test data run setUpTestData method of backend.tests.TestViews

### PostGreSQL Commands

```bash
alias runpsql="/opt/homebrew/opt/postgresql@14/bin/postgres -D /opt/homebrew/var/postgresql@14"
alias createpsqluser="/opt/homebrew/Cellar/postgresql@14/14.10/bin/createuser -s"

createdb <user>

psql -U <user>


```