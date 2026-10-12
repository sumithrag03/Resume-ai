import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

function Navbar({ onAnalyzeClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHowItWorks = () => setMenuOpen(false);
  const handleAnalyze = () => {
    setMenuOpen(false);
    onAnalyzeClick();
  };

  return (
    <header className="site-header">
      <nav className="navbar page-container" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="0 to Shipped home">
          <span className="brand-mark" aria-hidden="true">
            0<span>→</span>
          </span>
          <span className="brand-copy">
            <strong>0 to Shipped</strong>
            <small>RESUME PARSER</small>
          </span>
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          <a href="#how-it-works" onClick={handleHowItWorks}>How It Works</a>
          <button className="button button-primary nav-cta" type="button" onClick={handleAnalyze}>
            Prepare Comparison <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
