import { Check, Sparkles } from 'lucide-react';

const skillsFound = ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'Git', 'Responsive Design'];
const skillsToImprove = ['React', 'TypeScript', 'REST APIs', 'Testing'];

function SkillsSection() {
  return (
    <div className="skills-grid">
      <article className="content-card skills-card">
        <div className="card-title-row">
          <div className="section-icon found-icon"><Check size={18} /></div>
          <span className="count-pill found-count">7 skills</span>
        </div>
        <h3>Skills Found</h3>
        <p>Example skills that may appear in a resume.</p>
        <div className="skill-tags">
          {skillsFound.map((skill) => <span className="skill-tag found-tag" key={skill}>{skill}</span>)}
        </div>
      </article>
      <article className="content-card skills-card">
        <div className="card-title-row">
          <div className="section-icon improve-icon"><Sparkles size={18} /></div>
          <span className="count-pill improve-count">4 skills</span>
        </div>
        <h3>Skills to Improve</h3>
        <p>Example skills you could consider developing.</p>
        <div className="skill-tags">
          {skillsToImprove.map((skill) => <span className="skill-tag improve-tag" key={skill}>{skill}</span>)}
        </div>
      </article>
    </div>
  );
}

export default SkillsSection;
