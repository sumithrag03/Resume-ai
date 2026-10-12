import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ResumeUploader from './components/ResumeUploader.jsx';
import JobDescriptionInput from './components/JobDescriptionInput.jsx';
import AnalysisResults from './components/AnalysisResults.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const uploadRef = useRef(null);
  const resultsRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (analysis) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [analysis]);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setError('');
    setAnalysis(null);
  };

  const handleJobDescriptionChange = (value) => {
    setJobDescription(value);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError('');
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    const result = createDemoAnalysis(jobDescription);
    setIsAnalyzing(false);
    setAnalysis(result);
  };

  const handleAnalyzeAnother = () => {
    setJobDescription('');
    setAnalysis(null);
    scrollToUpload();
  };

  return (
    <>
      <Navbar onAnalyzeClick={scrollToUpload} />
      <main>
        <Hero onAnalyzeClick={scrollToUpload} />
        <section className="upload-section section-shell" id="upload" ref={uploadRef}>
          <div className="section-heading">
            <span className="eyebrow">START WITH A PDF</span>
            <h2>A clearer picture starts here.</h2>
            <p>Your file stays in this demo. Nothing is uploaded to a server.</p>
          </div>
          <ResumeUploader
            file={selectedFile}
            error={error}
            isAnalyzing={isAnalyzing}
            onFileChange={handleFileChange}
            onError={setError}
            onRemove={() => {
              if (isAnalyzing) return;
              setSelectedFile(null);
              setError('');
              setAnalysis(null);
            }}
            canAnalyze={Boolean(selectedFile && jobDescription.trim())}
            hasJobDescription={Boolean(jobDescription.trim())}
            onAnalyze={handleAnalyze}
          />
          <JobDescriptionInput
            value={jobDescription}
            disabled={isAnalyzing}
            onChange={handleJobDescriptionChange}
          />
        </section>
        {analysis && (
          <div ref={resultsRef}>
            <AnalysisResults analysis={analysis} onAnalyzeAnother={handleAnalyzeAnother} />
          </div>
        )}
        <HowItWorks />
      </main>
      <Footer onAnalyzeClick={scrollToUpload} />
    </>
  );
}

export default App;

const SAMPLE_RESUME_SKILLS = ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'Git', 'Responsive Design'];
const RECOGNIZED_SKILLS = [
  { name: 'HTML', keywords: ['html'] },
  { name: 'CSS', keywords: ['css'] },
  { name: 'JavaScript', keywords: ['javascript', 'js'] },
  { name: 'Python', keywords: ['python'] },
  { name: 'SQL', keywords: ['sql'] },
  { name: 'Git', keywords: ['git'] },
  { name: 'Responsive Design', keywords: ['responsive design'] },
  { name: 'React', keywords: ['react'] },
  { name: 'TypeScript', keywords: ['typescript'] },
  { name: 'REST APIs', keywords: ['rest api', 'rest apis'] },
  { name: 'Automated Testing', keywords: ['automated testing', 'test automation', 'testing'] },
];

function createDemoAnalysis(jobDescriptionText) {
  const normalizedDescription = jobDescriptionText.toLowerCase();
  const detectedSkills = RECOGNIZED_SKILLS.filter(({ keywords }) =>
    keywords.some((keyword) => {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${escapedKeyword}\\b`, 'i').test(normalizedDescription);
    }),
  ).map(({ name }) => name);

  const matchingSkills = detectedSkills.filter((skill) => SAMPLE_RESUME_SKILLS.includes(skill));
  const missingSkills = detectedSkills.filter((skill) => !SAMPLE_RESUME_SKILLS.includes(skill));

  return {
    requiredSkills: detectedSkills,
    matchingSkills,
    missingSkills,
    score: detectedSkills.length
      ? Math.round((matchingSkills.length / detectedSkills.length) * 100)
      : null,
  };
}
