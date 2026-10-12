import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import analysesRouter from './routes/analyses.js';
import connectToDatabase from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

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

app.use(errorHandler);

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is required. Set it in backend/.env before starting the server.');
  }

  await connectToDatabase(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start API server:', error);
  process.exit(1);
});
