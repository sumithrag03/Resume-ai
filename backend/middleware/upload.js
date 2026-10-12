import multer from 'multer';
import { MAX_FILE_SIZE, MAX_JOB_DESCRIPTION_LENGTH } from '../utils.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
    fields: 1,
    fieldSize: MAX_JOB_DESCRIPTION_LENGTH * 4,
  },
  fileFilter: (request, file, callback) => {
    if (!/\.pdf$/i.test(file.originalname) || file.mimetype !== 'application/pdf') {
      callback(new Error('Please upload a PDF resume.'));
      return;
    }
    callback(null, true);
  },
});

export default upload;
