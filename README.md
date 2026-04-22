# SentinelAI

SentinelAI is a clean, production-ready full-stack AI SaaS platform for content moderation. 
It features a separated architecture with a Next.js frontend, a FastAPI backend, and integrated AI capabilities.

## Architecture Structure

- **`frontend/`**: Next.js user interface, API integration. Deployment ready for Vercel.
- **`backend/`**: FastAPI backend with integrated AI models, Celery workers for async tasks, and Redis/Postgres integration. Deployment ready for Railway.
- **`infra/`**: Docker configs and Railway setup.

## Prerequisites

- Docker and Docker Compose
- Node.js (v18+)
- Python (3.11+)

## Setup

1. **Clone the repository**

2. **Environment Variables**
   Set up your environment variables for both backend and frontend:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

## Running Locally

### Using Docker Compose (Recommended)

Run the entire stack instantly using Docker Compose:

```bash
docker-compose up --build
```
- Frontend will be available at: http://localhost:3000
- Backend will be available at: http://localhost:8000
- API Docs (Swagger): http://localhost:8000/docs

### Running Manually

**Backend:**
1. Navigate to backend: `cd backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Run FastAPI: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
4. Run Celery Worker: `celery -A app.workers.celery_app worker --loglevel=info`

**Frontend:**
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Deployment Guides

### Frontend (Vercel)
The `frontend` directory is fully optimized for Vercel deployment. 
- Link your GitHub repo to a new Vercel project.
- Set the root directory to `frontend`.
- Ensure you set the `NEXT_PUBLIC_API_URL` environment variable to your deployed backend URL.

### Backend (Railway)
The backend is ready to be deployed to Railway using the included `Dockerfile`, `Procfile`, and `infra/railway/railway.json` service config.
- Connect your GitHub repo to Railway.
- If you deploy the backend as a standalone service, set the root directory to `backend` and use the backend `Dockerfile`.
- If you use the monorepo Railway config, keep the repo root and use the `infra/railway/railway.json` commands.
- Provision a Redis and PostgreSQL database inside Railway and connect the environment variables `DATABASE_URL` and `REDIS_URL`.
