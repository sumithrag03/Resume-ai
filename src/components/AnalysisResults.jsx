import { ArrowLeft, ArrowUpRight, Check, FileText, Lightbulb, Sparkles, TrendingUp, X } from 'lucide-react';

const suggestions = [
  'Add relevant skills to your resume only when you genuinely possess them.',
  'Highlight projects that demonstrate the job’s requirements.',
  'Include measurable achievements to show the impact of your work.',
  'Use clear, standard section headings to make your experience easy to scan.',
];

function AnalysisResults({ analysis, onAnalyzeAnother }) {
  const { requiredSkills, matchingSkills, missingSkills, score } = analysis;
  const scoreStatus = score === null
    ? 'No recognized skills'
    : score >= 70 ? 'Strong skill overlap' : score >= 40 ? 'Some skill overlap' : 'Early skill overlap';
  const circumference = 2 * Math.PI * 50;

  return (
    <section className="results-section section-shell" aria-labelledby="results-title">
      <div className="results-header">
        <div>
          <span className="eyebrow results-eyebrow"><Sparkles size={14} /> DEMO ANALYSIS — SAMPLE RESUME DATA</span>
          <h2 id="results-title">Your job comparison</h2>
          <p>This is a keyword-based demonstration, not an analysis of your PDF or a prediction of an employer’s ATS decision.</p>
        </div>
        <span className="sample-badge"><FileText size={15} /> Sample resume skills</span>
      </div>

      <div className="result-detail-grid">
        <article className="score-card">
          <div className="score-card-copy">
            <span className="card-kicker">DEMO MATCH SCORE</span>
            <h3>{scoreStatus}</h3>
            <p>Based only on recognized job-description keywords</p>
          </div>
          <div className="score-ring" role="img" aria-label={score === null ? 'No recognized job skills were found' : `Demo match score: ${score} out of 100`}>
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle className="score-track" cx="60" cy="60" r="50" />
              <circle
                className="score-progress"
                cx="60"
                cy="60"
                r="50"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: score === null ? circumference : circumference * (1 - score / 100),
                }}
              />
            </svg>
            <div className="score-value">
              <strong>{score === null ? '—' : score}</strong>
              <span>{score === null ? '' : '/100'}</span>
            </div>
          </div>
          <div className="score-footnote"><span className="score-dot" /> Uploaded PDF contents are not analyzed</div>
        </article>

        <div className="skills-grid comparison-skills-grid">
          <SkillList title="Matching Skills" description="Recognized in the job description and the sample resume skills." skills={matchingSkills} variant="found" />
          <SkillList title="Missing Skills" description="Recognized in the job description, not in the sample resume skills." skills={missingSkills} variant="missing" />
        </div>
      </div>

      <section className="job-summary" aria-labelledby="job-summary-title">
        <div className="job-summary-heading">
          <div className="section-icon summary-detail-icon"><TrendingUp size={18} /></div>
          <div><h3 id="job-summary-title">Job Description Summary</h3><p>Counts reflect recognized skills only.</p></div>
        </div>
        <div className="job-summary-stats">
          <SummaryStat label="Total required skills" value={requiredSkills.length} />
          <SummaryStat label="Matching skills" value={matchingSkills.length} />
          <SummaryStat label="Missing skills" value={missingSkills.length} />
        </div>
        {requiredSkills.length === 0 && (
          <p className="no-skills-message" role="status">
            No supported skills were recognized in this job description. Try adding terms such as HTML, JavaScript, SQL, React, or TypeScript.
          </p>
        )}
      </section>

      <article className="suggestions-card">
        <div className="suggestions-heading">
          <div className="section-icon suggestion-icon"><Lightbulb size={19} /></div>
          <div><h3>Improvement Suggestions</h3><p>General ideas to help tailor your application honestly.</p></div>
        </div>
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion}><span className="suggestion-check"><Check size={13} /></span>{suggestion}</li>
          ))}
        </ul>
      </article>

      <p className="analysis-disclaimer">
        Demo Analysis — Sample Resume Data. Your uploaded PDF is used only as a file-selection input; its contents and skills are not read or analyzed.
        This simple keyword comparison does not evaluate your full resume or predict an employer’s ATS decision.
      </p>

      <div className="results-footer">
        <span>Update the job description above to run another comparison.</span>
        <button className="button button-outline" type="button" onClick={onAnalyzeAnother}>
          <ArrowLeft size={16} /> Analyze Another Job <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}

function SkillList({ title, description, skills, variant }) {
  const isMatching = variant === 'found';
  const Icon = isMatching ? Check : X;
  const label = skills.length === 1 ? '1 skill' : `${skills.length} skills`;

  return (
    <article className="content-card skills-card">
      <div className="card-title-row">
        <div className={`section-icon ${isMatching ? 'found-icon' : 'improve-icon'}`}><Icon size={18} /></div>
        <span className={`count-pill ${isMatching ? 'found-count' : 'improve-count'}`}>{label}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {skills.length ? (
        <div className="skill-tags">
          {skills.map((skill) => <span className={`skill-tag ${isMatching ? 'found-tag' : 'improve-tag'}`} key={skill}>{skill}</span>)}
        </div>
      ) : (
        <p className="empty-skill-list">{isMatching ? 'No recognized skills matched the sample resume.' : 'No recognized skill gaps found.'}</p>
      )}
    </article>
  );
}

function SummaryStat({ label, value }) {
  return (
    <div className="job-summary-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default AnalysisResults;
