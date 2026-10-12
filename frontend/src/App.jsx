import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ResumeUploader from './components/ResumeUploader.jsx';
import JobDescriptionInput from './components/JobDescriptionInput.jsx';
import AnalysisResults from './components/AnalysisResults.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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
    setError('');
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('jobDescription', jobDescription);

      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/analyze`, {
          method: 'POST',
          body: formData,
        });
      } catch {
        throw new Error('Unable to reach the backend. Check that the server is running and CORS allows this frontend.');
      }

      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new Error('The backend returned an invalid response. Check that the Express server is running.');
      }

      if (!response.ok) {
        throw new Error(payload.error || 'Resume analysis failed. Please try again.');
      }

      if (
        !Number.isInteger(payload.analysis?.score)
        || typeof payload.analysis?.scoreFormula !== 'string'
        || !Array.isArray(payload.analysis?.skillsFoundInResume)
        || !Array.isArray(payload.analysis?.skillsRequiredByJob)
        || !Array.isArray(payload.analysis?.matchingSkills)
        || !Array.isArray(payload.analysis?.missingSkills)
        || !Array.isArray(payload.analysis?.recommendations)
      ) {
        throw new Error('The server returned an unexpected response. Please try again.');
      }

      setAnalysis(payload.analysis);
    } catch (requestError) {
      setError(requestError instanceof Error
        ? requestError.message
        : 'Could not analyze the resume. Check the backend configuration and try again.');
    } finally {
      setIsAnalyzing(false);
    }
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
            <p>Get an AI-powered comparison of resume skills and job requirements. Your PDF is processed in memory and is not saved by this analysis flow.</p>
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
