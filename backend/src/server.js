import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import analysesRouter from './routes/analyses.js';

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required. Set it in backend/.env before starting the server.');
}

const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN }));

app.get('/api/health', (request, response) => {
  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use('/api/analyses', analysesRouter);

app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'The PDF must be 10 MB or smaller.'
      : 'The request must contain one PDF and one job description.';
    response.status(400).json({ error: message });
    return;
  }

  if (error.message === 'Please upload a PDF resume.') {
    response.status(400).json({ error: error.message });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'The server could not save this comparison. Please try again.' });
});

async function startServer() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start API server:', error);
  process.exit(1);
});
