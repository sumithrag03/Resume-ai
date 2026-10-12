import { ArrowRight, FileUp, Lightbulb, ScanSearch } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Upload Your Resume',
    description: 'Choose a PDF resume from your device.',
    icon: FileUp,
  },
  {
    number: '02',
    title: 'Explore Your Results',
    description: 'Preview a sample resume score and example skills.',
    icon: ScanSearch,
  },
  {
    number: '03',
    title: 'Improve Your Profile',
    description: 'Explore general suggestions to strengthen your resume.',
    icon: Lightbulb,
  },
];

function HowItWorks() {
  return (
    <section className="how-section section-shell" id="how-it-works">
      <div className="section-heading">
        <span className="eyebrow">A SIMPLE THREE-STEP FLOW</span>
        <h2>From resume to next steps.</h2>
        <p>A quick, approachable way to explore what makes a resume shine.</p>
      </div>
      <div className="steps-grid">
        {steps.map(({ number, title, description, icon: Icon }, index) => (
          <article className="step-card" key={number}>
            <div className="step-topline"><span>{number}</span>{index < steps.length - 1 && <ArrowRight size={17} />}</div>
            <div className={`step-icon step-icon-${number}`}><Icon size={23} strokeWidth={1.8} /></div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
