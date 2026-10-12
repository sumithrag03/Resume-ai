import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ResumeUploader from './components/ResumeUploader.jsx';
import AnalysisResults from './components/AnalysisResults.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const uploadRef = useRef(null);
  const resultsRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (hasResults) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hasResults]);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setError('');
    setHasResults(false);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || isAnalyzing) return;

    setIsAnalyzing(true);
    setError('');
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    setIsAnalyzing(false);
    setHasResults(true);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError('');
    setIsAnalyzing(false);
    setHasResults(false);
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
              setSelectedFile(null);
              setError('');
              setHasResults(false);
            }}
            onAnalyze={handleAnalyze}
          />
        </section>
        {hasResults && (
          <div ref={resultsRef}>
            <AnalysisResults onAnalyzeAnother={handleReset} />
          </div>
        )}
        <HowItWorks />
      </main>
      <Footer onAnalyzeClick={scrollToUpload} />
    </>
  );
}

export default App;
