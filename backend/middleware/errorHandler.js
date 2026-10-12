import multer from 'multer';

function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? `The PDF exceeds the ${request.originalUrl.startsWith('/api/analyze') ? '4 MB analysis' : '10 MB'} upload limit.`
      : error.code === 'LIMIT_FIELD_VALUE'
        ? 'The job description is too long.'
        : 'The request must contain one PDF and one job description.';
    response.status(400).json({ error: message });
    return;
  }

  if (error.message === 'Please upload a PDF resume.') {
    response.status(400).json({ error: error.message });
    return;
  }

  if (Number.isInteger(error.statusCode) && error.statusCode >= 400 && error.statusCode < 600) {
    response.status(error.statusCode).json({ error: error.message });
    return;
  }

  console.error('API request failed:', error.name || 'Error');
  response.status(500).json({ error: 'The server could not complete this request. Please try again.' });
}

export default errorHandler;
