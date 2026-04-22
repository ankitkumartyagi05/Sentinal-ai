# Deployment

## Frontend

- Deploy the `frontend/` directory to Vercel.
- Set `NEXT_PUBLIC_API_URL` to the public URL of the backend service.

## Backend

- Deploy the `backend/` directory with the provided `Dockerfile` and `Procfile`, or use the monorepo Railway config in `infra/railway/railway.json`.
- Railway should run the backend on Python 3.11.11.
- Set `DATABASE_URL` and `REDIS_URL` in the target environment.
- Set `SECRET_KEY` to a strong random value.
- Set `BACKEND_CORS_ORIGINS` to your frontend public URL.
- Run the web process with `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- Run the worker process with `celery -A app.workers.celery_app worker --loglevel=info`.
