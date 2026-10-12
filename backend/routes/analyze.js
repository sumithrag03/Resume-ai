import { Router } from 'express';
import { analyzeResumeController } from '../controllers/analyzeController.js';
import { createPdfUpload } from '../middleware/upload.js';
import { MAX_ANALYSIS_FILE_SIZE } from '../utils.js';

const router = Router();
const upload = createPdfUpload(MAX_ANALYSIS_FILE_SIZE);

router.post('/', upload.single('resume'), analyzeResumeController);

export default router;
