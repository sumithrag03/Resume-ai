import multer from 'multer';

function errorHandler(error, request, response, next) {
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
}

export default errorHandler;
