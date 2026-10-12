import { saveAnalysis } from '../service/analysesService.js';
import { MAX_JOB_DESCRIPTION_LENGTH } from '../utils.js';

export async function createAnalysis(request, response, next) {
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

    const storedAnalysis = await saveAnalysis(resume, jobDescription);

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
}
