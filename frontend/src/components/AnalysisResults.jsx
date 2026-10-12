import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, FileText, Sparkles } from 'lucide-react';

function formatFileSize(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function AnalysisResults({ analysis, onAnalyzeAnother }) {
  const createdAt = new Date(analysis.createdAt);
  const submittedAt = Number.isNaN(createdAt.getTime()) ? 'Just now' : createdAt.toLocaleString();

  return (
    <section className="results-section section-shell" aria-labelledby="results-title">
      <div className="results-header">
        <div>
          <span className="eyebrow results-eyebrow"><CheckCircle2 size={14} /> COMPARISON REQUEST SAVED</span>
          <h2 id="results-title">Your submission is ready</h2>
          <p>The resume and job description are saved. AI comparison will be added in a future update.</p>
        </div>
        <span className="sample-badge"><Clock3 size={15} /> Pending AI processing</span>
      </div>

      <div className="summary-grid submission-summary" aria-label="Saved request details">
        <article className="summary-card summary-score">
          <span className="summary-icon"><FileText size={18} /></span>
          <span className="summary-label">Resume saved</span>
          <strong className="submission-value" title={analysis.resumeFileName}>{analysis.resumeFileName}</strong>
        </article>
        <article className="summary-card summary-found">
          <span className="summary-icon"><CheckCircle2 size={18} /></span>
          <span className="summary-label">Job description saved</span>
          <strong>{analysis.jobDescriptionLength.toLocaleString()}<span> characters</span></strong>
        </article>
        <article className="summary-card summary-improve">
          <span className="summary-icon"><Sparkles size={18} /></span>
          <span className="summary-label">Processing status</span>
          <strong className="submission-value">Pending</strong>
        </article>
      </div>

      <article className="content-card submission-details">
        <h3>Request details</h3>
        <dl>
          <div><dt>Request ID</dt><dd>{analysis.id}</dd></div>
          <div><dt>Resume file size</dt><dd>{formatFileSize(analysis.resumeSize)}</dd></div>
          <div><dt>Submitted</dt><dd>{submittedAt}</dd></div>
        </dl>
        <p>The PDF is stored as a file in MongoDB. Its contents have not been extracted or analyzed.</p>
      </article>

      <p className="analysis-disclaimer">
        Your resume PDF and job description are stored in the connected MongoDB database for future processing.
        No AI, PDF text extraction, skill matching, or score calculation is performed yet.
      </p>

      <div className="results-footer">
        <span>Your saved request is available for the future comparison service.</span>
        <button className="button button-outline" type="button" onClick={onAnalyzeAnother}>
          <ArrowLeft size={16} /> Analyze Another Job <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}

export default AnalysisResults;
