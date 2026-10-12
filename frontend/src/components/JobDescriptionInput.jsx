import { FileText, RotateCcw, X } from 'lucide-react';

const SAMPLE_JOB_DESCRIPTION = `Frontend Developer

We are looking for a frontend developer with experience in HTML, CSS, JavaScript, React, and TypeScript. The ideal candidate understands REST APIs, responsive design, and automated testing.

Responsibilities:
- Build accessible, responsive user interfaces.
- Collaborate with design and engineering teams.
- Write maintainable code and contribute to quality assurance.

Qualifications:
- Strong communication and problem-solving skills.
- Experience with Git and SQL is a plus.`;

const MAX_JOB_DESCRIPTION_LENGTH = 20_000;

function JobDescriptionInput({ value, disabled, onChange }) {
  return (
    <section className="job-description-card" aria-labelledby="job-description-title">
      <div className="job-description-heading">
        <div className="section-icon job-description-icon"><FileText size={18} /></div>
        <div>
          <span className="eyebrow">COMPARISON INPUT</span>
          <h2 id="job-description-title">Compare Your Resume With a Job Description</h2>
          <p>We compare its required skills with the text extracted from your PDF.</p>
        </div>
      </div>

      <label className="job-description-label" htmlFor="job-description">Job Description</label>
      <textarea
        id="job-description"
        className="job-description-textarea"
        value={value}
        disabled={disabled}
        maxLength={MAX_JOB_DESCRIPTION_LENGTH}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here, including required skills, qualifications, and responsibilities..."
        rows={10}
      />
      <div className="job-description-controls">
        <span className="character-count" aria-live="polite">
          {value.length.toLocaleString()} / {MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()} characters
        </span>
        <div className="job-description-actions">
          <button className="text-button" type="button" onClick={() => onChange(SAMPLE_JOB_DESCRIPTION)} disabled={disabled}>
            <RotateCcw size={14} /> Use sample description
          </button>
          <button className="text-button clear-description" type="button" onClick={() => onChange('')} disabled={!value || disabled}>
            <X size={15} /> Clear
          </button>
        </div>
      </div>
    </section>
  );
}

export default JobDescriptionInput;
