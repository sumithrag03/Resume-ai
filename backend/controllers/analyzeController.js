import { analyzeResume } from '../service/resumeAnalysisService.js';
import { MAX_JOB_DESCRIPTION_LENGTH, MAX_ANALYSIS_FILE_SIZE, ApiError } from '../utils.js';

export async function analyzeResumeController(request, response, next) {
  try {
    const resume = request.file;
    const jobDescription = request.body.jobDescription;

    if (!resume) {
      throw new ApiError(400, 'A PDF resume is required.');
    }

    if (resume.buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
      throw new ApiError(400, 'The selected file does not appear to be a valid PDF.');
    }

    if (resume.size > MAX_ANALYSIS_FILE_SIZE) {
      throw new ApiError(400, 'The PDF must be 4 MB or smaller for analysis.');
    }

    if (typeof jobDescription !== 'string' || !jobDescription.trim()) {
      throw new ApiError(400, 'A non-empty job description is required.');
    }

    if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
      throw new ApiError(
        400,
        `The job description must be ${MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()} characters or fewer.`,
      );
    }

    const analysis = await analyzeResume(resume.buffer, jobDescription.trim());
    response.status(200).json({ analysis });
  } catch (error) {
    next(error);
  }
}
