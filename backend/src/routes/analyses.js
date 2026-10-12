import { Router } from 'express';
import multer from 'multer';
import Analysis from '../models/Analysis.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_JOB_DESCRIPTION_LENGTH = 20_000;

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

const router = Router();

router.post('/', upload.single('resume'), async (request, response, next) => {
  try {
    const resume = request.file;
    const jobDescription = request.body.jobDescription;

    if (!resume) {
      response.status(400).json({ error: 'A PDF resume is required.' });
      return;
    }

    if (resume.buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
      response.status(400).json({ error: 'The selected file does not appear to be a valid PDF.' });
      return;
    }

    if (typeof jobDescription !== 'string' || !jobDescription.trim()) {
      response.status(400).json({ error: 'A non-empty job description is required.' });
      return;
    }

    if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
      response.status(400).json({
        error: `The job description must be ${MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()} characters or fewer.`,
      });
      return;
    }

    const storedAnalysis = await Analysis.create({
      jobDescription: jobDescription.trim(),
      resumeFileName: resume.originalname.replace(/[\\/]/g, '_').slice(0, 255),
      resumeContentType: 'application/pdf',
      resumeSize: resume.size,
      resumeData: resume.buffer,
    });

    response.status(201).json({
      analysis: {
        id: storedAnalysis.id,
        status: storedAnalysis.status,
        resumeFileName: storedAnalysis.resumeFileName,
        resumeSize: storedAnalysis.resumeSize,
        jobDescriptionLength: storedAnalysis.jobDescription.length,
        createdAt: storedAnalysis.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
