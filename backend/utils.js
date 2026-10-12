export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_JOB_DESCRIPTION_LENGTH = 20_000;

export function sanitizeFileName(fileName) {
  return fileName.replace(/[\\/]/g, '_').slice(0, 255);
}
