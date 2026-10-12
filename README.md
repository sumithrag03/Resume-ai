# 0 to Shipped – Resume Parser

A React + Vite frontend and Express API for submitting a resume PDF and job description. Submissions are saved to MongoDB. PDF extraction and AI comparison are not implemented yet.

## Requirements

- Node.js 20 or later
- MongoDB running locally or a MongoDB connection URI

## Configure MongoDB

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` to your local or hosted MongoDB URI. The example connects to a local database named `resume_ai`.

The API stores each PDF as binary data in a MongoDB document alongside its job description and file metadata. Uploads are limited to PDF files no larger than 10 MB; job descriptions are limited to 20,000 characters.

## Run locally

From the repository root, install the workspace dependencies:

```bash
npm install
```

Start the Express API and Vite frontend in separate terminals:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

Open the Vite URL, select a PDF, enter a job description, then choose **Analyze Resume**. The frontend sends both inputs to `POST /api/analyses`; the API validates and saves the request to MongoDB. `GET /api/health` reports API and database connectivity.

The Vite development server proxies `/api` requests to `http://localhost:5000`. Set `FRONTEND_ORIGIN` in `backend/.env` if the frontend runs on a different origin.

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

## Current processing status

The backend persists the uploaded resume PDF and job description and returns a `pending` request ID. It does not extract PDF text, compare skills, calculate a score, or call an AI service. The MongoDB database contains personally identifiable resume data; use a trusted database, protect its credentials, and remove stored submissions according to your retention needs.
