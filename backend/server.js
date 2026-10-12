import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import analyzeRouter from './routes/analyze.js';
import analysesRouter from './routes/analyses.js';
import connectToDatabase from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import requireDatabase from './middleware/requireDatabase.js';

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN }));

app.get('/api/health', async (request, response) => {
  if (MONGODB_URI && mongoose.connection.readyState !== 1) {
    try {
      await connectToDatabase(MONGODB_URI);
    } catch {
      response.status(503).json({ status: 'unavailable', database: 'disconnected' });
      return;
    }
  }

  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use('/api/analyze', analyzeRouter);
app.use('/api/analyses', requireDatabase, analysesRouter);

app.use(errorHandler);

function startServer() {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
