import type { CSSProperties } from 'react';

const createComets = (count: number, longerTrails: boolean) => Array.from({ length: count }, (_, index) => {
  const duration = 2.8 + ((index * 7) % 9) * .35;
  return {
    '--comet-left': `${((index * 61.8034 + 7) % 100).toFixed(3)}%`,
    '--comet-width': `${index % 5 === 0 ? 2 : 1}px`,
    '--comet-length': `${18 + (index * 13) % 56 + (longerTrails ? 32 : 0)}px`,
    '--comet-opacity': .14 + (index % 5) * .055,
    '--comet-duration': `${duration}s`,
    '--comet-delay': `${-duration * (index + 1) / count}s`,
  } as CSSProperties;
});

const sidebarComets = createComets(48, false);
const startupComets = createComets(120, true);

export default function FallingComets({ variant = 'sidebar' }: { variant?: 'sidebar' | 'startup' }) {
  const comets = variant === 'startup' ? startupComets : sidebarComets;
  return <div className={`falling-comets falling-comets--${variant}`} aria-hidden="true">
    {comets.map((style, index) => <span className="comet-track" style={style} key={index}>
      <span className="comet" />
    </span>)}
  </div>;
}
