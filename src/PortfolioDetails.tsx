import { useEffect, useRef, useState } from 'react';
import type { CaseStudy } from './content';
import { publicationBibtex, publicationCitation } from './content';
import { BrandIcon } from './BrandIcon';

export function CopyButton({ text, label, compact = false }: { text: string; label: string; compact?: boolean }) {
  const [feedback, setFeedback] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setFeedback('copied');
      timer.current = window.setTimeout(() => setFeedback('idle'), 1800);
    } catch { setFeedback('error'); }
  }

  return <span className={`copy-action ${compact ? 'copy-compact' : ''}`}>
    <button className={`cli-action ${feedback === 'copied' ? 'copy-success' : ''}`} type="button" onClick={copy} aria-label={feedback === 'copied' ? `${label}: copied` : label} title={label}>
      <span aria-hidden="true">{feedback === 'copied' ? '✓' : '⧉'}</span>{!compact && <span>{feedback === 'copied' ? 'Copied' : label}</span>}
    </button>
    <span className="sr-only" role="status">{feedback === 'copied' ? `${label}: copied to clipboard.` : feedback === 'error' ? 'Clipboard unavailable. Select and copy the text below.' : ''}</span>
    {feedback === 'error' && <span className="copy-fallback">Copy manually: <span tabIndex={0}>{text}</span></span>}
  </span>;
}

export function ProjectPreview({ study, title }: { study: CaseStudy; title: string }) {
  return <figure className="project-visual" aria-label={`${title} preview`}>
      {study.image ? <a className="case-cover" href={study.image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${title} screenshot`}><img src={study.image.src} alt={study.image.alt} width="1440" height="1000" loading="lazy" /></a>
        : <div className="case-cover code-cover">
          {study.preview?.logo ? <img src={study.preview.logo} alt={`${title} logo`} width="48" height="48" loading="lazy" /> : <BrandIcon name={study.preview?.icon ?? 'Website'} />}
          <span>{study.preview?.headline ?? title}<small>{study.preview?.steps ?? study.category}</small></span>
        </div>}
      <figcaption className="preview-caption">{study.image?.caption ?? 'Project preview'}{study.image && <span className="preview-hint" aria-hidden="true">View full size ↗</span>}</figcaption>
  </figure>;
}

export function PublicationDetails() {
  return <div className="publication-details">
    <div className="citation-actions"><CopyButton text={publicationCitation} label="Copy citation" /><CopyButton text={publicationBibtex} label="Copy BibTeX" /></div>
    <details className="citation-text"><summary>View citation & BibTeX</summary><p>{publicationCitation}</p><pre>{publicationBibtex}</pre></details>
  </div>;
}
