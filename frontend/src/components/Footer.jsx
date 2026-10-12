import { ArrowUpRight } from 'lucide-react';

function Footer({ onAnalyzeClick }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-container">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#top">
            <span className="brand-mark" aria-hidden="true">0<span>→</span></span>
            <span className="brand-copy"><strong>0 to Shipped</strong><small>RESUME PARSER</small></span>
          </a>
          <p>Compare resume skills with a job description using AI.</p>
        </div>
        <div className="footer-links">
          <a href="#how-it-works">How It Works</a>
          <button type="button" onClick={onAnalyzeClick}>Prepare Comparison <ArrowUpRight size={14} /></button>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} 0 to Shipped. Made to help you move forward.</div>
      </div>
    </footer>
  );
}

export default Footer;
