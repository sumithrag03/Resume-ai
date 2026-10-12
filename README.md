# 0 to Shipped – Resume Parser

A React + Vite frontend and Express API for comparing resume skills with a job description using Google Gemini.

## Requirements

- Node.js 20.18 or later
- A Gemini API key
- MongoDB running locally or a MongoDB connection URI only if you use the legacy saved-submissions endpoint

## Configure the backend

In PowerShell, copy the example environment file:

```powershell
if (-not (Test-Path backend\.env)) { Copy-Item backend\.env.example backend\.env }
```

If `backend/.env` already exists, keep it and confirm it has `GEMINI_API_KEY` set. `GEMINI_MODEL` defaults to `gemini-2.5-flash`. Set `MONGODB_URI` to your local or hosted MongoDB URI if you use the legacy saved-submissions endpoint and database health check; the AI analysis endpoint itself does not require MongoDB.

The AI endpoint accepts PDFs up to 4 MB and job descriptions up to 20,000 characters. Resume text is extracted in memory and sent to Gemini for analysis. Scanned/image-only PDFs may require OCR and are rejected when no readable text can be extracted. The analysis endpoint does not log or store PDF contents. The legacy `POST /api/analyses` endpoint remains available and stores submission metadata and the job description in MongoDB, but does not store the uploaded PDF contents.

## Run locally

From the repository root, install dependencies and build the frontend:

```bash
npm install
npm run build
```

In one terminal, start the backend:

```bash
npm run dev:backend
```

In another terminal, start the frontend:

```bash
npm run dev:frontend
```

The backend reads `GEMINI_API_KEY` from `backend/.env`; the optional `GEMINI_MODEL` setting defaults to `gemini-2.5-flash`. MongoDB is not needed for AI analysis; set `MONGODB_URI` only if you use the legacy submissions route or database health check. The Gemini key is used only by the backend and is never sent to the browser.

Open the Vite URL, select a PDF, enter a job description, then choose **Analyze My Resume**. The frontend sends both inputs as `FormData` to `POST /api/analyze`; the backend validates and parses the PDF, then requests structured skill analysis from Gemini. `GET /api/health` reports database connectivity.

The Vite development server proxies `/api` requests to `http://localhost:5000`. Set `FRONTEND_ORIGIN` in `backend/.env` to the exact frontend origin if it differs from `http://localhost:5173`.

The score is calculated as **matching distinct required skills (case-insensitive exact-name match) ÷ total distinct recognized required skills × 100**, rounded to the nearest integer. If no concrete required skills are identified, the score is 0 and the response includes an explanation. This is a skill comparison, not an ATS score or a hiring prediction.

## Deploy to Vercel

Use the existing Vercel project connected to this repository. Set its **Root Directory** to the repository root (`.`), not `frontend` or `backend`. The root [vercel.json](./vercel.json) configures two services in the same deployment:

- `backend` serves `/api/*`.
- `frontend` serves all other paths.

Set `GEMINI_API_KEY` and optionally `GEMINI_MODEL` in the existing Vercel project's environment variables. `FRONTEND_ORIGIN` is optional; set it only if the browser frontend calls the backend from a different origin. Set `MONGODB_URI` only if you need the legacy saved-submissions endpoint or database health check. Both services share the deployment origin, so the browser calls `/api/analyze` directly; no `VITE_API_URL` or internal service binding is needed. Redeploy the existing project after changing its Root Directory or environment variables. The analysis upload is capped at 4 MB to fit within Vercel's function request-body limit; configure function duration in the Vercel project settings if analysis requests time out.

If Gemini analysis fails in production, check the Vercel backend function logs. The backend logs Gemini's HTTP status and provider error code/status only; it does not log the API key, resume text, or job description. HTTP 401 indicates the key was rejected, HTTP 403 indicates the key or project lacks access, HTTP 404 indicates the configured model was not found, and HTTP 429 indicates quota exhaustion or rate limiting. Confirm `GEMINI_API_KEY` is configured for the deployment environment and that any key restrictions allow the Gemini API.

Use `vercel dev` from the repository root to run the services together locally with Vercel's routing configuration. For ordinary local development, the existing `npm run dev:backend` and `npm run dev:frontend` commands remain available.

## Build

```bash
npm run build
```

## Project structure

```text
frontend/
  public/
  src/
  index.html
  package.json
  vite.config.js
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  service/
  server.js
  utils.js
  .env.example
  package.json
package.json
```
