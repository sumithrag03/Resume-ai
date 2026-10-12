import connectToDatabase from '../config/database.js';

function requireDatabase(request, response, next) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    next(new Error('MONGODB_URI is required for saved submissions.'));
    return;
  }

  connectToDatabase(uri).then(() => next(), next);
}

export default requireDatabase;
