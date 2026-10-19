import { useEffect, useRef, useState } from 'react';
import { profile } from './content';
import FallingComets from './FallingComets';

const startupLines = [
  { prefix: '>> ', text: profile.name, tone: 'purple' },
  { prefix: 'PS > ', text: 'Start-Portfolio', tone: 'blue', command: true },
  { prefix: '', text: 'Opening portfolio...', tone: 'green' },
];

export default function StartupTerminal({ onComplete }: { onComplete: () => void }) {
  const [frame, setFrame] = useState({ line: 0, characters: 0 });
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer: number;
    let line = 0;
    let characters = 0;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const slow = new URLSearchParams(window.location.search).get('intro') === 'slow';
    skipRef.current?.focus({ preventScroll: true });

    function tick() {
      const current = startupLines[line];
      if (characters < current.text.length) {
        characters++;
        setFrame({ line, characters });
        timer = window.setTimeout(tick, current.command ? (slow ? 90 : 70) : (slow ? 70 : 50));
      } else if (line < startupLines.length - 1) {
        timer = window.setTimeout(() => {
          line++;
          characters = 0;
          setFrame({ line, characters });
          tick();
        }, slow ? 700 : 500);
      } else {
        timer = window.setTimeout(() => {
          setLeaving(true);
          timer = window.setTimeout(onComplete, 220);
        }, slow ? 1300 : 1100);
      }
    }

    function skipForReducedMotion(event: MediaQueryListEvent) {
      if (event.matches) onComplete();
    }
    function skipWithEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') onComplete();
    }

    timer = window.setTimeout(motion.matches ? onComplete : tick, motion.matches ? 0 : 350);
    motion.addEventListener('change', skipForReducedMotion);
    window.addEventListener('keydown', skipWithEscape);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', skipForReducedMotion);
      window.removeEventListener('keydown', skipWithEscape);
    };
  }, [onComplete]);

  return <main className={`startup-page ${leaving ? 'startup-leaving' : ''}`} aria-labelledby="startup-title">
    <FallingComets variant="startup" />
    <h1 id="startup-title" className="sr-only">Palak Deb Patra portfolio startup</h1>
    <section className="startup-window" aria-label="Opening terminal">
      <div className="startup-toolbar"><span className="tab-icon" aria-hidden="true">❯_</span><span>portfolio.ps1</span><span className="startup-location">C:\Portfolio</span></div>
      {/* Announce startup once, rather than reading every typed character. */}
      <p className="sr-only" role="status">Opening Palak Deb Patra’s portfolio. You can skip the intro.</p>
      <div className="startup-output" aria-hidden="true">
        {startupLines.slice(0, frame.line + 1).map((entry, index) => <p className={`startup-line tone-${entry.tone} ${entry.command ? 'startup-command' : ''}`} key={index}>
          <span className="startup-prefix">{entry.prefix}</span><span>{index < frame.line ? entry.text : entry.text.slice(0, frame.characters)}</span>{index === frame.line && <span className="cursor">▌</span>}
        </p>)}
      </div>
      <div className="startup-footer"><span>Opening automatically · Esc to skip</span><button ref={skipRef} type="button" onClick={onComplete}>Skip intro <span aria-hidden="true">→</span></button></div>
    </section>
  </main>;
}
