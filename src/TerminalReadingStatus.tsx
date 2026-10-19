import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

export default function TerminalReadingStatus({ outputRef, section, tone, tabsOverflow }: {
  outputRef: RefObject<HTMLDivElement | null>;
  section: string;
  tone: string;
  tabsOverflow: boolean;
}) {
  const [reading, setReading] = useState({ percent: 0, scrollable: false });

  useLayoutEffect(() => {
    const output = outputRef.current;
    if (!output) return;
    let frame = 0;

    function measure() {
      frame = 0;
      const distance = Math.max(0, output!.scrollHeight - output!.clientHeight);
      const scrollable = distance > 1;
      const percent = scrollable ? Math.max(0, Math.min(100, Math.round(output!.scrollTop / distance * 100))) : 100;
      setReading(previous => previous.percent === percent && previous.scrollable === scrollable ? previous : { percent, scrollable });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(measure);
    }

    measure();
    output.addEventListener('scroll', schedule, { passive: true });
    output.addEventListener('load', schedule, true);
    const observer = new ResizeObserver(schedule);
    observer.observe(output);
    const content = output.querySelector('.terminal-session');
    if (content) observer.observe(content);
    return () => {
      observer.disconnect();
      output.removeEventListener('scroll', schedule);
      output.removeEventListener('load', schedule, true);
      window.cancelAnimationFrame(frame);
    };
  }, [outputRef, section]);

  const filled = Math.round(reading.percent / 10);
  return <footer className={`terminal-reading tone-${tone}`}>
    <p className="terminal-navigation-hint" id="terminal-navigation-hint">
      <span className="navigation-hint--keyboard"><span aria-hidden="true">← →</span><span className="sr-only">Left and Right arrow keys:</span> Switch sections<span className="sr-only"> when a tab is focused.</span></span>
      <span className="navigation-hint--compact">{tabsOverflow ? 'Swipe tabs' : 'Select a tab'}</span>
    </p>
    {reading.scrollable && <span className="terminal-reading-progress" role="progressbar" aria-label={`${section} reading progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={reading.percent}>
      <span aria-hidden="true">[{ '='.repeat(filled) }{ '-'.repeat(10 - filled) }] {reading.percent.toString().padStart(3, ' ')}%</span>
    </span>}
  </footer>;
}
