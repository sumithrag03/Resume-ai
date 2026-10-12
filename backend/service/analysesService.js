import Analysis from '../models/Analysis.js';
import { sanitizeFileName } from '../utils.js';

export function saveAnalysis(resume, jobDescription) {
  return Analysis.create({
    jobDescription: jobDescription.trim(),
    resumeFileName: sanitizeFileName(resume.originalname),
    resumeContentType: 'application/pdf',
    resumeSize: resume.size,
    resumeData: resume.buffer,
  });
}
