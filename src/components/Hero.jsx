import { ArrowDown, ArrowUpRight, Check, FileText, Sparkles } from 'lucide-react';

function Hero({ onAnalyzeClick }) {
  return (
    <section className="hero page-container" id="top">
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow"><Sparkles size={14} /> YOUR RESUME, SIMPLIFIED</span>
        <h1>Turn your resume into your <span>next opportunity.</span></h1>
        <p className="hero-description">
          Discover your resume score, identify your strongest skills, and find the skills you may
          need to improve.
        </p>
        <div className="hero-actions">
          <button className="button button-primary button-large" type="button" onClick={onAnalyzeClick}>
            Analyze My Resume <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <span className="privacy-note"><Check size={15} /> Private by design. Demo results only.</span>
        </div>
      </div>
      <div className="hero-art" aria-label="Illustration of a resume preview and example skills">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="resume-preview">
          <div className="preview-topline"><span>RESUME PREVIEW</span><span className="preview-dots">•••</span></div>
          <div className="preview-profile">
            <div className="avatar-placeholder">JD</div>
            <div><span className="skeleton-line name-line" /><span className="skeleton-line role-line" /></div>
          </div>
          <div className="preview-divider" />
          <span className="preview-label">EXPERIENCE</span>
          <span className="skeleton-line wide-line" />
          <span className="skeleton-line medium-line" />
          <div className="preview-bullets"><i /><i /><i /></div>
          <span className="preview-label skills-label">SKILLS</span>
          <div className="preview-tags"><span>Design</span><span>Research</span><span>+</span></div>
          <div className="preview-score">
            <div className="mini-check"><Check size={14} /></div>
            <div><strong>Ready to review</strong><small>Your next step starts here</small></div>
            <ArrowDown size={16} />
          </div>
        </div>
        <div className="floating-file"><FileText size={19} /><span>your-resume.pdf</span><Check size={16} /></div>
        <div className="art-sparkle sparkle-one">✳</div>
        <div className="art-sparkle sparkle-two">✦</div>
      </div>
    </section>
  );
}

export default Hero;
