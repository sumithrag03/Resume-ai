export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_ANALYSIS_FILE_SIZE = 4 * 1024 * 1024;
export const MAX_JOB_DESCRIPTION_LENGTH = 20_000;
export const MAX_RESUME_TEXT_LENGTH = 60_000;

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export function sanitizeFileName(fileName) {
  return fileName.replace(/[\\/]/g, '_').slice(0, 255);
}

export function uniqueSkills(skills) {
  const seen = new Set();
  return skills
    .filter((skill) => typeof skill === 'string')
    .map((skill) => skill.trim().replace(/\s+/g, ' '))
    .filter((skill) => {
      const normalized = skill.toLowerCase();
      if (!normalized || normalized.length > 80 || seen.has(normalized)) {
        return false;
      }
      seen.add(normalized);
      return true;
    })
    .slice(0, 40);
}

export function calculateSkillMatch(requiredSkills, resumeSkills) {
  const resumeSkillSet = new Set(resumeSkills.map((skill) => skill.toLowerCase()));
  const matchingSkills = requiredSkills.filter((skill) => resumeSkillSet.has(skill.toLowerCase()));
  const missingSkills = requiredSkills.filter((skill) => !resumeSkillSet.has(skill.toLowerCase()));
  const score = requiredSkills.length === 0
    ? 0
    : Math.round((matchingSkills.length / requiredSkills.length) * 100);

  return { score, matchingSkills, missingSkills };
}
