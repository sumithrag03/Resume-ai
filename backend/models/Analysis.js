import mongoose from 'mongoose';
import { MAX_FILE_SIZE, MAX_JOB_DESCRIPTION_LENGTH } from '../utils.js';

const analysisSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_JOB_DESCRIPTION_LENGTH,
    },
    resumeFileName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    resumeContentType: {
      type: String,
      required: true,
      enum: ['application/pdf'],
    },
    resumeSize: {
      type: Number,
      required: true,
      min: 1,
      max: MAX_FILE_SIZE,
    },
    resumeData: {
      type: Buffer,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Analysis', analysisSchema);
