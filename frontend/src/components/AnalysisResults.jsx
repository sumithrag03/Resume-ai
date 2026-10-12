import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, FileText, Sparkles, Target } from 'lucide-react';

function SkillsCard({ title, skills, variant, icon: Icon, emptyMessage }) {
  return (
    <article className="content-card skills-card">
      <div className="card-title-row">
        <span className={`section-icon ${variant}-icon`}><Icon size={17} /></span>
        <span className={`count-pill ${variant}-count`}>{skills.length}</span>
      </div>
      <h3>{title}</h3>
      <div className="skill-tags">
        {skills.length
          ? skills.map((skill) => <span className={`skill-tag ${variant}-tag`} key={skill}>{skill}</span>)
          : <p className="no-skills-message">{emptyMessage}</p>}
      </div>
    </article>
  );
}

function AnalysisResults({ analysis, onAnalyzeAnother }) {
  const scoreCircumference = 2 * Math.PI * 48;

  return (
    <section className="results-section section-shell" aria-labelledby="results-title">
      <div className="results-header">
        <div>
          <span className="eyebrow results-eyebrow"><CheckCircle2 size={14} /> AI-POWERED ANALYSIS</span>
          <h2 id="results-title">Your resume match is ready</h2>
          <p>Review the skills that align with the role and where your resume could be stronger.</p>
        </div>
        <span className="sample-badge"><CheckCircle2 size={15} /> Analysis complete</span>
      </div>

      <div className="result-detail-grid">
        <article className="score-card" aria-label={`Resume match score: ${analysis.score} out of 100`}>
          <div className="score-card-copy">
            <span className="card-kicker">RESUME MATCH SCORE</span>
            <h3>Role alignment</h3>
            <p>Based on listed skill requirements</p>
          </div>
          <div className="score-ring">
            <svg viewBox="0 0 116 116" role="img" aria-hidden="true">
              <circle className="score-track" cx="58" cy="58" r="48" />
              <circle
                className="score-progress"
                cx="58"
                cy="58"
                r="48"
                strokeDasharray={`${(analysis.score / 100) * scoreCircumference} ${scoreCircumference}`}
              />
            </svg>
            <div className="score-value"><strong>{analysis.score}</strong><span>/100</span></div>
          </div>
          <span className="score-footnote"><span className="score-dot" />{analysis.scoreMessage || 'Distinct skill requirements matched'}</span>
        </article>

        <div className="skills-grid comparison-skills-grid">
          <SkillsCard
            title="Matching skills"
            skills={analysis.matchingSkills}
            variant="found"
            icon={CheckCircle2}
            emptyMessage="No listed job skills were matched."
          />
          <SkillsCard
            title="Missing skills"
            skills={analysis.missingSkills}
            variant="improve"
            icon={Target}
            emptyMessage="No missing job skills were identified."
          />
        </div>
      </div>

      <div className="analysis-skills-grid">
        <SkillsCard
          title="Skills found in your resume"
          skills={analysis.skillsFoundInResume}
          variant="found"
          icon={FileText}
          emptyMessage="No concrete skills could be identified in the resume text."
        />
        <SkillsCard
          title="Skills required by the job"
          skills={analysis.skillsRequiredByJob}
          variant="improve"
          icon={Target}
          emptyMessage="No concrete skill requirements were identified."
        />
      </div>

      <p className="analysis-disclaimer">
        Score formula: {analysis.scoreFormula}
        {analysis.scoreMessage && ` ${analysis.scoreMessage}`}
        {' '}Resume text is sent to Gemini to provide this analysis, but this analysis endpoint does not save the uploaded PDF.
      </p>

      <article className="suggestions-card">
        <div className="suggestions-heading">
          <span className="section-icon suggestion-icon"><Sparkles size={17} /></span>
          <div>
            <h3>Recommendations to strengthen your resume</h3>
            <p>Suggestions based on this resume and job description.</p>
          </div>
        </div>
        {analysis.recommendations.length ? (
          <ul className="suggestions-list">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={`${index}-${recommendation}`}>
                <span className="suggestion-check"><Check size={12} /></span>
                {recommendation}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-skills-message">No recommendations were returned. Try again with a more detailed job description.</p>
        )}
      </article>

      <div className="results-footer">
        <span>This comparison is guidance, not a guarantee of hiring outcomes.</span>
        <button className="button button-outline" type="button" onClick={onAnalyzeAnother}>
          <ArrowLeft size={16} /> Analyze Another Job <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}

export default AnalysisResults;
