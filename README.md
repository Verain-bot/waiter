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


## Run Project Locally

1. Git Clone Repo
2. Set up Python virtual env
```bash
python -m venv .venv
source .venv/bin/activate
cd <path for backend>
pip install -r requirements.txt
```
3. Install redis server
4. Install postgresql server
5. Install DBeaver to test postgres
6. Configure env variables mentioned below
7. Run Redis server, Postgres, Celery and Django Backend on localhost:8000.
8. Run frontend on port set in env variables
9. You can also add test data to database by running "setUpTestData" method defined in backend.tests.TestBase class

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
V_ENV                               "DEV" or "PROD"
V_ALLOWED_HOSTS                     ex. "localhost,127.0.0.1"
V_SMS_API_KEY                       
V_DB_HOST                           "DB HOST URL example localhost"
V_DB_PORT                           "Default for postgres 5432"
V_DB_USER                           
V_DB_PASSWORD 
V_SECRET_KEY                        "Django Secret Key" 
V_FRONTEND_URL                      "Comma seperated values of possible frontends ex http://localhost:3000,http://localhost:3001"
V_CACHE_URL                         "Redis Cache URL" ex redis://localhost:6379/0
V_CELERY_BROKER                     "Celery message broker based on redis" ex "redis://localhost:6379/1"
V_CELERY_RESULT_BACKEND             "Celery result storage in db" example "django-db"
V_PHONE_PE_MERCHANT_ID              
V_PHONE_PE_SALT_KEY
V_MEDIA_STORAGE                     "Set only in PROD = S3"
GOOGLE_APPLICATION_CREDENTIALS      "Firebase Credentials"
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