import { ArrowLeft, ArrowUpRight, Check, FileText, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import ScoreCard from './ScoreCard.jsx';
import SkillsSection from './SkillsSection.jsx';

const suggestions = [
  'Highlight relevant technical skills.',
  'Include clear project descriptions and measurable results.',
  'Organize the resume using standard headings.',
  'Keep formatting consistent and easy to read.',
  'Include relevant skills in your project descriptions.',
];

function AnalysisResults({ onAnalyzeAnother }) {
  return (
    <section className="results-section section-shell" aria-labelledby="results-title">
      <div className="results-header">
        <div>
          <span className="eyebrow results-eyebrow"><Sparkles size={14} /> DEMO RESULTS — SAMPLE DATA</span>
          <h2 id="results-title">Your demo snapshot</h2>
          <p>These examples are for illustration only and were not extracted from your PDF.</p>
        </div>
        <span className="sample-badge"><FileText size={15} /> Illustrative sample</span>
      </div>

      <div className="summary-grid" aria-label="Sample result summary">
        <article className="summary-card summary-score">
          <span className="summary-icon"><TrendingUp size={18} /></span>
          <span className="summary-label">Resume Score</span>
          <strong>78<span>/100</span></strong>
        </article>
        <article className="summary-card summary-found">
          <span className="summary-icon"><Check size={18} /></span>
          <span className="summary-label">Skills Found</span>
          <strong>7</strong>
        </article>
        <article className="summary-card summary-improve">
          <span className="summary-icon"><Sparkles size={18} /></span>
          <span className="summary-label">Skills to Improve</span>
          <strong>4</strong>
        </article>
      </div>

      <div className="result-detail-grid">
        <ScoreCard />
        <SkillsSection />
      </div>

      <article className="suggestions-card">
        <div className="suggestions-heading">
          <div className="section-icon suggestion-icon"><Lightbulb size={19} /></div>
          <div><h3>Ways to Strengthen Your Resume</h3><p>General demo suggestions, not personalized findings.</p></div>
        </div>
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion}><span className="suggestion-check"><Check size={13} /></span>{suggestion}</li>
          ))}
        </ul>
      </article>

      <div className="results-footer">
        <span>That’s the end of this sample snapshot.</span>
        <button className="button button-outline" type="button" onClick={onAnalyzeAnother}>
          <ArrowLeft size={16} /> Analyze Another Resume <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}

export default AnalysisResults;
