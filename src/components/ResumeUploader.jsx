import { useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, FileText, FileUp, LoaderCircle, X } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function ResumeUploader({ file, error, isAnalyzing, canAnalyze, hasJobDescription, onFileChange, onError, onRemove, onAnalyze }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSelect = (candidate) => {
    if (!candidate || isAnalyzing) return;

    const hasPdfExtension = /\.pdf$/i.test(candidate.name);
    if (!hasPdfExtension || candidate.type !== 'application/pdf') {
      onError('Please choose a PDF file. Other file types are not supported.');
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      onError('This file is larger than 10 MB. Choose a smaller PDF to continue.');
      return;
    }

    onFileChange(candidate);
  };

  const handleInputChange = (event) => {
    validateAndSelect(event.target.files?.[0]);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndSelect(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="uploader-card">
      <div
        className={`drop-zone${isDragging ? ' is-dragging' : ''}${file ? ' has-file' : ''}`}
        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept=".pdf,application/pdf"
          aria-label="Choose a PDF resume"
          onChange={handleInputChange}
        />
        {file ? (
          <div className="selected-file">
            <div className="file-icon"><FileText size={23} /></div>
            <div className="file-details">
              <strong title={file.name}>{file.name}</strong>
              <span>{formatFileSize(file.size)} · PDF document</span>
            </div>
            <CheckCircle2 className="file-valid-icon" size={20} aria-label="Valid PDF" />
            <button
              className="icon-button remove-file"
              type="button"
              aria-label="Remove selected file"
              disabled={isAnalyzing}
              onClick={onRemove}
            >
              <X size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="upload-icon"><FileUp size={25} strokeWidth={1.8} /></div>
            <h3>Drop your resume here</h3>
            <p>or browse files from your device</p>
            <button className="button button-outline choose-button" type="button" onClick={() => inputRef.current?.click()}>
              Choose PDF
            </button>
            <span className="file-requirements">PDF only <span>·</span> Max file size 10 MB</span>
          </>
        )}
        {file && (
          <div className="replace-file">
            <span>Want to use a different file?</span>
            <button type="button" disabled={isAnalyzing} onClick={() => inputRef.current?.click()}>Choose another PDF</button>
          </div>
        )}
      </div>
      {error && (
        <p className="upload-error" role="alert"><AlertCircle size={17} />{error}</p>
      )}
      <div className="upload-submit">
        <button
          className="button button-primary button-large analyze-button"
          type="button"
          disabled={!canAnalyze || isAnalyzing}
          onClick={onAnalyze}
        >
          {isAnalyzing ? (
            <><LoaderCircle className="spin" size={18} /> Preparing your demo results...</>
          ) : (
            <>Analyze Resume <ArrowUpRight size={18} aria-hidden="true" /></>
          )}
        </button>
        {!canAnalyze && (
          <ul className="analysis-requirements" aria-live="polite">
            {!file && <li>A valid PDF resume under 10 MB is required.</li>}
            {!hasJobDescription && <li>Paste a job description to continue.</li>}
          </ul>
        )}
        <p className="demo-notice">Your resume is not analyzed. This demo uses sample results.</p>
      </div>
    </div>
  );
}

export default ResumeUploader;
