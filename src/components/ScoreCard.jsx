function ScoreCard() {
  return (
    <article className="score-card">
      <div className="score-card-copy">
        <span className="card-kicker">OVERALL RESUME SCORE</span>
        <h3>Good Progress</h3>
        <p>Your illustrative demo score</p>
      </div>
      <div className="score-ring" role="img" aria-label="Sample resume score: 78 out of 100">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="score-track" cx="60" cy="60" r="50" />
          <circle className="score-progress" cx="60" cy="60" r="50" />
        </svg>
        <div className="score-value"><strong>78</strong><span>/100</span></div>
      </div>
      <div className="score-footnote"><span className="score-dot" /> Sample score, not based on your file</div>
    </article>
  );
}

export default ScoreCard;
