export default function WelcomeDoodle() {
  return <div className="welcome-doodle" aria-hidden="true">
    <div className="doodle-head">
      <svg className="doodle-antennas" viewBox="0 0 90 30" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M45 30 15 4" vectorEffect="non-scaling-stroke" />
        <path d="M45 30 75 4" vectorEffect="non-scaling-stroke" />
        <circle className="doodle-signal" cx="15" cy="4" r="2.5" fill="currentColor" stroke="none" />
        <circle className="doodle-signal doodle-signal--right" cx="75" cy="4" r="2.5" fill="currentColor" stroke="none" />
      </svg>
      <span className="doodle-prompt doodle-command">{'>'}<span className="doodle-cursor">_</span></span>
      <span className="doodle-prompt doodle-command doodle-command--right"><span className="doodle-cursor">_</span>{'<'}</span>
      <span className="doodle-expression">^_^</span>
    </div>
  </div>;
}
