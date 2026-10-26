import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { profile, resumeDocuments, sections } from './content';
import type { RecordEntry, Section, SectionId } from './content';
import { BrandIcon } from './BrandIcon';
import StartupTerminal from './StartupTerminal';
import FallingComets from './FallingComets';
import WelcomeDoodle from './WelcomeDoodle';
import { ProjectPreview, PublicationDetails } from './PortfolioDetails';
import TerminalReadingStatus from './TerminalReadingStatus';

const sectionTones: Record<SectionId, string> = {
  resume: 'pink', skills: 'green', work: 'yellow', projects: 'purple', publications: 'cyan', activities: 'red',
};
const recordTones = ['blue', 'green', 'purple', 'cyan', 'yellow', 'red', 'pink'];
const contactTones: Record<string, string> = {
  Email: 'cyan', Phone: 'green', LinkedIn: 'blue', GitHub: 'purple', 'Hugging Face': 'yellow',
};

function brandForUrl(url: string) {
  const host = new URL(url).hostname;
  if (host === 'github.com') return 'GitHub';
  if (host === 'leetcode.com') return 'LeetCode';
  if (host === 'doi.org' || host === 'ieeexplore.ieee.org') return 'IEEE';
  return 'Website';
}

function ExternalLink({ url, children, ariaLabel, title }: { url: string; children: ReactNode; ariaLabel?: string; title?: string }) {
  return <a href={url} aria-label={ariaLabel} title={title} {...(url.startsWith('https:') || url.startsWith('/') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

// Emphasis is plain React text, including when phrases contain punctuation.
function EmphasizedText({ text, highlights = [] }: { text: string; highlights?: RecordEntry['highlights'] }) {
  const parts: ReactNode[] = [];
  let remaining = text;
  while (remaining) {
    const match = highlights.filter(Boolean).map(highlight => {
      const phrase = typeof highlight === 'string' ? highlight : highlight.text;
      return { phrase, color: typeof highlight === 'string' ? undefined : highlight.color, at: remaining.indexOf(phrase) };
    }).filter(item => item.at >= 0).sort((a, b) => a.at - b.at || b.phrase.length - a.phrase.length)[0];
    if (!match) { parts.push(remaining); break; }
    const className = match.color ? `keyword-${match.color}` : 'keyword-default';
    parts.push(remaining.slice(0, match.at), <span className={className} key={parts.length}>{match.phrase}</span>);
    remaining = remaining.slice(match.at + match.phrase.length);
  }
  return <>{parts}</>;
}

function Technologies({ items, label }: { items: string[]; label: string }) {
  return <ul className="technologies" role="list" aria-label={label}>{items.map(item => <li className="technology" key={item}><span className="technology-marker" aria-hidden="true">-</span><BrandIcon name={item} /><span>{item}</span></li>)}</ul>;
}

function TerminalRecord({ record, index, section }: { record: RecordEntry; index: number; section: SectionId }) {
  const skills = section === 'skills';
  return <article className={`record tone-${recordTones[index % recordTones.length]} ${skills ? 'skill-branch' : ''}${record.caseStudy ? ' project-row' : ''}`} style={{ '--row-delay': `${Math.min(index, 5) * 35}ms` } as CSSProperties}>
    <div className={record.caseStudy ? 'project-information' : undefined}>
    {record.caseStudy && <p className="record-kicker">{record.caseStudy.category}</p>}
    <h3><span className="section-marker">&gt;&gt;</span> {record.url && !record.caseStudy ? <ExternalLink url={record.url}>{!(section === 'activities' && brandForUrl(record.url) === 'LeetCode') && <BrandIcon name={brandForUrl(record.url)} />}{record.title}<span className="external-mark" aria-hidden="true">↗</span></ExternalLink> : record.title}</h3>
    {record.meta && <p className="record-meta"><EmphasizedText text={record.meta} highlights={record.highlights} /></p>}
    {skills ? <div className="description"><Technologies items={record.description.split(' · ')} label={`${record.title} technologies`} /></div>
      : record.research ? <section className="detail-block research-overview"><h4>Research Overview</h4><p className="description">{record.research.overview}</p></section>
      : section !== 'work' && record.description.split('\n\n').map((paragraph, paragraphIndex) => <p className="description" key={paragraphIndex}><EmphasizedText text={paragraph} highlights={record.highlights} /></p>)}
    {record.metadata && <dl className="record-facts">{record.metadata.map(field => <div key={field.label}><dt>{field.label}:</dt><dd>{field.url ? <ExternalLink url={field.url}>{field.value}</ExternalLink> : <EmphasizedText text={field.value} highlights={record.highlights} />}</dd></div>)}</dl>}
    {record.details && <ul className="record-details" role="list">{record.details.map(detail => <li key={detail}><span className="detail-marker" aria-hidden="true">-</span><span><EmphasizedText text={detail} highlights={record.highlights} /></span></li>)}</ul>}
    {record.stack && <div className="record-stack"><span className="stack-label">Stack:</span><Technologies items={record.stack} label={`${record.title} tech stack`} /></div>}
    {(record.links || (record.caseStudy && record.url)) && <div className="record-links">
      {record.caseStudy && record.url && <ExternalLink url={record.url}><BrandIcon name="GitHub" />GitHub<span className="external-mark" aria-hidden="true">↗</span></ExternalLink>}
      {record.links?.map(link => <ExternalLink key={link.url} url={link.url}><BrandIcon name={brandForUrl(link.url)} />{link.label}<span className="external-mark" aria-hidden="true">↗</span></ExternalLink>)}
    </div>}
    {record.research && <PublicationDetails />}
    </div>
    {record.caseStudy && <ProjectPreview study={record.caseStudy} title={record.title} />}
  </article>;
}

function SectionRecords({ section }: { section: Section }) {
  return <>{section.intro && <p className="section-intro"><span className="section-marker" aria-hidden="true">&gt;&gt;</span><span>{section.intro}</span></p>}
  <div className={`records${section.id === 'skills' ? ' skill-tree' : ''}${section.layout === 'single' || section.id === 'projects' ? ' single-column' : ''}${section.id === 'projects' ? ' project-list' : ''}`}>
    {section.columns ? section.columns.map((column, columnIndex) => <section className="record-column" key={column.label} aria-label={column.hideHeading ? column.label : undefined} aria-labelledby={column.hideHeading ? undefined : `column-${section.id}-${columnIndex}`}>
      {!column.hideHeading && <div className="column-heading">
        <h2 id={`column-${section.id}-${columnIndex}`}>{column.label}</h2>
      </div>}
      {section.records.map((record, index) => ({ record, index }))
        .filter(({ record }) => record.column === (column.column ?? (columnIndex === 0 ? 'left' : 'right')))
        .map(({ record, index }) => <TerminalRecord key={record.title} record={record} index={index} section={section.id} />)}
    </section>) : section.records.map((record, index) => <TerminalRecord key={record.title} record={record} index={index} section={section.id} />)}
  </div></>;
}

function Welcome({ onExplore }: { onExplore: (id: SectionId) => void }) {
  return <section className="welcome" aria-labelledby="welcome-title">
    <div className="welcome-content">
    <WelcomeDoodle />
    <h2 id="welcome-title" tabIndex={-1}><span className="welcome-title">Step Into My <span className="welcome-brand">DevDen.</span></span></h2>
    <nav className="welcome-actions" aria-label="Explore portfolio">{sections.map(section =>
      <button className={`cli-action tone-${sectionTones[section.id]}`} id={`welcome-${section.id}`} key={section.id} onClick={() => onExplore(section.id)}><span className="tab-icon" aria-hidden="true">❯_</span>{section.label}</button>
    )}</nav>
    </div>
  </section>;
}

function Resume({ section }: { section: Section }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const [enlarged, setEnlarged] = useState(true);
  const [documentIndex, setDocumentIndex] = useState(0);
  const selectedDocument = resumeDocuments[documentIndex];

  function openDocument(pageIndex = 0, fromPreview = false) {
    setEnlarged(fromPreview || !window.matchMedia('(max-width: 1050px)').matches);
    dialogRef.current?.showModal();
    documentRef.current?.scrollTo(0, 0);
    requestAnimationFrame(() => {
      if (pageIndex === 0) documentRef.current?.scrollTo(0, 0);
      else documentRef.current?.querySelectorAll('.resume-dialog-pages img')[pageIndex]?.scrollIntoView({ block: 'start' });
      closeRef.current?.focus();
    });
  }

  return <div className={`resume-view${documentIndex === 1 ? ' resume-view--academic' : ''}`}>
    <div className="resume-document-switch" role="group" aria-label="Choose document">
      {resumeDocuments.map((document, index) => <button className="cli-action" type="button" key={document.id} aria-pressed={index === documentIndex} aria-controls="resume-current" onClick={() => setDocumentIndex(index)}>{document.label}</button>)}
    </div>
    <div className={`resume-layout${documentIndex === 1 ? ' resume-layout--academic' : ''}`} id="resume-current">
    <div className="resume-about"><TerminalRecord record={section.records[documentIndex]} index={documentIndex} section="resume" /></div>
    <section className="resume-document" aria-labelledby="resume-document-title">
      <div className="resume-document-header">
        <h3 id="resume-document-title"><BrandIcon name="Resume" /> {selectedDocument.label}</h3>
        <div className="resume-document-actions"><a className="cli-action" href={selectedDocument.pdf} download={selectedDocument.id === 'resume' ? 'PalakDebPatra_Professional_CV.pdf' : 'PalakDebPatra_Academic_CV.pdf'}>Download PDF</a>
        <button className="cli-action" type="button" onClick={() => openDocument()}>View {selectedDocument.label}</button></div>
      </div>
      <p className="resume-preview-hint">Tap a page to enlarge it.</p>
      <div className="resume-preview">
        {selectedDocument.previews.map((preview, index) => <button className="resume-preview-page" type="button" key={preview} aria-label={`Enlarge ${selectedDocument.label} page ${index + 1}`} onClick={() => openDocument(index, true)}><img src={preview} alt={`${selectedDocument.label} by Palak Deb Patra, page ${index + 1}`} width="1530" height="1980" loading="lazy" /></button>)}
      </div>
    </section>
    </div>
    <dialog className="resume-dialog" ref={dialogRef} aria-labelledby="resume-dialog-title" onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }} onClick={event => {
      // Backdrop clicks target the dialog; clicks inside its bounds stay open.
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
    }}>
      <div className="resume-dialog-header">
        <h2 id="resume-dialog-title"><BrandIcon name="Resume" /> {selectedDocument.label}</h2>
        <div className="resume-dialog-actions">
          <a className="cli-action" href={selectedDocument.pdf} download={selectedDocument.id === 'resume' ? 'PalakDebPatra_Professional_CV.pdf' : 'PalakDebPatra_Academic_CV.pdf'}>Download PDF</a>
          <button className="cli-action" type="button" aria-pressed={enlarged} onClick={() => setEnlarged(value => !value)}>{enlarged ? 'Fit page' : 'Enlarge'}</button>
          <button className="cli-action" type="button" ref={closeRef} onClick={() => dialogRef.current?.close()} aria-label="Close document">Close <span aria-hidden="true">×</span></button>
        </div>
      </div>
      <div className={`resume-dialog-body${enlarged ? ' resume-dialog-body--enlarged' : ''}`} ref={documentRef} tabIndex={0} aria-label={`${selectedDocument.label} document`}>
        <div className="resume-dialog-pages">{selectedDocument.previews.map((preview, index) => <img key={preview} src={preview} alt={`${selectedDocument.label} by Palak Deb Patra, page ${index + 1}`} width="1530" height="1980" />)}</div>
      </div>
    </dialog>
  </div>;
}

function Portfolio({ activeId, onSectionChange, onReplay, theme, onToggleTheme }: { activeId: SectionId | null; onSectionChange: (id: SectionId) => void; onReplay: () => void; theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  const [announcement, setAnnouncement] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const entryAlignment = useRef({ drop: 0, lift: 0 });
  const tabStripRef = useRef<HTMLDivElement>(null);
  const tabNavigationRef = useRef<HTMLDivElement>(null);
  const [tabScroll, setTabScroll] = useState({ controls: false, previous: false, next: false });
  const focusSelectedTab = useRef(false);
  const [tabMarker, setTabMarker] = useState({ left: 0, width: 0 });
  const scrollPositions = useRef<Partial<Record<SectionId, number>>>({});
  const activeSection = sections.find(section => section.id === activeId);

  useLayoutEffect(() => {
    if (activeId) return;
    const shell = windowRef.current;
    const identity = shell?.querySelector<HTMLElement>('.profile-identity');
    const contacts = shell?.querySelector<HTMLElement>('.contacts');
    const profilePane = shell?.querySelector<HTMLElement>('.profile-pane');
    const welcome = shell?.querySelector<HTMLElement>('.welcome-content');
    const output = outputRef.current;
    if (!shell || !identity || !contacts || !profilePane || !welcome || !output) return;

    function alignEntry() {
      let drop = 0;
      let lift = 0;
      if (window.innerWidth > 1050) {
        const previous = entryAlignment.current;
        const profile = identity!.getBoundingClientRect();
        const greeting = welcome!.getBoundingClientRect();
        const profileCenter = profile.top + profile.height / 2 - previous.drop;
        const greetingCenter = greeting.top + greeting.height / 2 + previous.lift;
        const distance = Math.max(0, greetingCenter - profileCenter);
        const roomBelow = Math.max(0, profilePane!.getBoundingClientRect().bottom - 23 - contacts!.getBoundingClientRect().bottom + previous.drop);
        const roomAbove = Math.max(0, greeting.top + previous.lift - output!.getBoundingClientRect().top);
        drop = Math.min(distance / 2, roomBelow);
        lift = Math.min(distance - drop, roomAbove);
      }
      entryAlignment.current = { drop, lift };
      shell!.style.setProperty('--profile-drop', `${drop}px`);
      shell!.style.setProperty('--welcome-lift', `${lift}px`);
    }

    alignEntry();
    const observer = new ResizeObserver(alignEntry);
    for (const element of [shell, identity, contacts, welcome]) observer.observe(element);
    return () => observer.disconnect();
  }, [activeId]);

  useLayoutEffect(() => {
    const strip = tabStripRef.current;
    const navigation = tabNavigationRef.current;
    if (!strip || !navigation) return;

    function updateScrollControls() {
      const controls = window.matchMedia('(max-width: 1050px)').matches && strip!.scrollWidth > navigation!.clientWidth + 1;
      const previous = strip!.scrollLeft > 1;
      const next = strip!.scrollLeft + strip!.clientWidth < strip!.scrollWidth - 1;
      setTabScroll(current => current.controls === controls && current.previous === previous && current.next === next ? current : { controls, previous, next });
    }

    function measure() {
      const tab = document.getElementById(`tab-${activeId}`);
      if (tab) {
        setTabMarker({ left: tab.offsetLeft + 12, width: tab.offsetWidth - 24 });
        const left = tab.offsetLeft - 6;
        const right = tab.offsetLeft + tab.offsetWidth + 6;
        if (left < strip!.scrollLeft) strip!.scrollLeft = left;
        else if (right > strip!.scrollLeft + strip!.clientWidth) strip!.scrollLeft = right - strip!.clientWidth;
      }
      updateScrollControls();
    }
    measure();
    if (focusSelectedTab.current) {
      document.getElementById(`tab-${activeId}`)?.focus({ preventScroll: true });
      focusSelectedTab.current = false;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(strip);
    observer.observe(navigation);
    strip.querySelectorAll('[role="tab"]').forEach(tab => observer.observe(tab));
    strip.addEventListener('scroll', updateScrollControls, { passive: true });
    return () => {
      observer.disconnect();
      strip.removeEventListener('scroll', updateScrollControls);
    };
  }, [activeId]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = activeId ? scrollPositions.current[activeId] ?? 0 : 0;
  }, [activeId]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    onToggleTheme();
    setAnnouncement(`${next === 'light' ? 'Light' : 'Dark'} theme enabled.`);
  }

  function switchTab(id: SectionId, focus = false) {
    focusSelectedTab.current = focus || activeId === null;
    if (id !== activeId) {
      if (activeId) scrollPositions.current[activeId] = outputRef.current?.scrollTop ?? 0;
      onSectionChange(id);
    }
    if (focus) document.getElementById(`tab-${id}`)?.focus({ preventScroll: true });
  }

  function tabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const grid = window.matchMedia('(max-width: 768px)').matches;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', ...(grid ? ['ArrowUp', 'ArrowDown'] : [])].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowDown' ? 3 : -3;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? sections.length - 1 : (index + delta + sections.length) % sections.length;
    switchTab(sections[next].id, true);
  }

  function scrollTabs(direction: -1 | 1) {
    const strip = tabStripRef.current;
    strip?.scrollBy({ left: direction * strip.clientWidth * .8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  return <main className="desktop portfolio-enter">
    <a className="skip-link" href={activeId ? `#panel-${activeId}` : '#welcome-panel'} onClick={event => { event.preventDefault(); outputRef.current?.focus({ preventScroll: true }); }}>Skip to portfolio content</a>
    <div className="terminal-window" ref={windowRef}>
      <aside className="profile-pane" aria-label="Profile and contact information">
        <FallingComets />
        <div className="profile-content">
        <div className="profile-header">
        <div className="profile-command tone-purple"><span className="path" aria-hidden="true">PS &gt;</span> Get-Portfolio</div>
        </div>
        <div className="profile-details" id="profile-details">
          <div className="profile-identity">
          <div className="portrait"><img src={profile.photo} srcSet={profile.photoSrcSet} sizes={profile.photoSizes} alt="Profile image chosen by Palak Deb Patra" width="720" height="1280" loading="eager" fetchPriority="high" decoding="async" /></div>
          <h1>{profile.name}</h1>
          </div>
          <div className="contacts">{profile.contacts.map(contact => <div className={`contact tone-${contactTones[contact.label]}`} key={contact.label}>
            <span className="contact-label"><BrandIcon name={contact.label} monochrome /><span className="contact-key">{contact.label}:</span></span>
            <ExternalLink url={contact.url} ariaLabel={`${contact.label}: ${contact.value}`} title={`${contact.label}: ${contact.value}`}><BrandIcon name={contact.label} monochrome /><span className="contact-separator" aria-hidden="true">:</span><span className="contact-value">{contact.label === 'Email' ? <>{contact.value.split('@')[0]}@<wbr />{contact.value.split('@')[1]}</> : contact.value}</span>{contact.url.startsWith('https://') && <span aria-hidden="true" className="external-mark">↗</span>}</ExternalLink>
          </div>)}
          </div>
        </div>
        </div>
      </aside>
      <section className={`terminal-pane${activeId ? ' terminal-pane--sections' : ''}`} aria-label="Portfolio terminal">
        <div className="terminal-toolbar">
          {activeId ? <div className="tab-navigation" ref={tabNavigationRef}>
            <button type="button" className="tab-scroll" hidden={!tabScroll.controls} disabled={!tabScroll.previous} aria-label="Scroll tabs left" onClick={() => scrollTabs(-1)}><span aria-hidden="true">‹</span></button>
            <div className="tab-strip" ref={tabStripRef} role="tablist" aria-label="Portfolio sections" aria-describedby="terminal-navigation-hint">{sections.map((section, index) => <button
            role="tab" key={section.id} id={`tab-${section.id}`} aria-selected={activeId === section.id}
            aria-controls={activeId === section.id ? `panel-${section.id}` : undefined} tabIndex={activeId === section.id ? 0 : -1}
            className={`terminal-tab tone-${sectionTones[section.id]} ${activeId === section.id ? 'active' : ''}`}
            onClick={() => switchTab(section.id)} onKeyDown={event => tabKeyDown(event, index)}
          ><span className="tab-icon" aria-hidden="true">&gt;_</span><span>{section.label}</span></button>)}
            <span className={`tab-selection-marker tone-${sectionTones[activeId]}`} aria-hidden="true" style={{ width: tabMarker.width, transform: `translateX(${tabMarker.left}px)` }} />
            </div>
            <button type="button" className="tab-scroll" hidden={!tabScroll.controls} disabled={!tabScroll.next} aria-label="Scroll tabs right" onClick={() => scrollTabs(1)}><span aria-hidden="true">›</span></button>
          </div> : <div className="welcome-toolbar tone-blue"><span className="tab-icon" aria-hidden="true">❯_</span> Welcome</div>}
          <button className="replay-intro" type="button" onClick={onReplay} aria-label="Replay intro" title="Replay intro"><span aria-hidden="true">↻</span></button>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z" />}
            </svg><span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
        <div className={`terminal-output${activeId ? activeId === 'resume' ? ' terminal-output--resume' : '' : ' terminal-output--welcome'}`} ref={outputRef} role={activeId ? 'tabpanel' : 'region'} id={activeId ? `panel-${activeId}` : 'welcome-panel'} aria-labelledby={activeId ? `tab-${activeId}` : 'welcome-title'} tabIndex={0}>
          {activeId && activeSection ? <div className={`terminal-session tone-${sectionTones[activeId]}${activeId === 'resume' ? ' terminal-session--resume' : ''}`} key={activeId}>
              <h2 className="sr-only">{activeSection.label}</h2>
              <div className="invocation"><span className="path" aria-hidden="true">PS &gt; </span><span className="typed-command" style={{ '--command-length': activeSection.command.length } as CSSProperties}>{activeSection.command}</span><span className="cursor" aria-hidden="true">▌</span></div>
              {activeId === 'resume' ? <Resume section={activeSection} /> : <SectionRecords section={activeSection} />}
          </div> : <div className="terminal-session welcome-page tone-blue"><Welcome onExplore={switchTab} /></div>}
        </div>
        {activeSection && <TerminalReadingStatus key={activeSection.id} outputRef={outputRef} section={activeSection.label} tone={sectionTones[activeSection.id]} tabsOverflow={tabScroll.controls} />}
      </section>
    </div>
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </main>;
}

function isPageReload() {
  return (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type === 'reload';
}

function sectionFromHash() {
  if (window.location.hash === '#portfolio') return 'skills';
  return sections.find(section => window.location.hash === `#portfolio/${section.id}`)?.id ?? null;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const [selectedId, setSelectedId] = useState<SectionId | null>(() => {
    if (isPageReload()) return null;
    return sectionFromHash();
  });
  const [showIntro, setShowIntro] = useState(() => (isPageReload() || !/^#(?:welcome|portfolio(?:\/.*)?)$/.test(window.location.hash))
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const focusAfterIntro = useRef(false);

  useEffect(() => {
    function followHash() {
      setSelectedId(sectionFromHash());
      setShowIntro(false);
    }
    window.addEventListener('hashchange', followHash);
    return () => window.removeEventListener('hashchange', followHash);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    function followBrowser(event: MediaQueryListEvent) { setTheme(event.matches ? 'dark' : 'light'); }
    preference.addEventListener('change', followBrowser);
    return () => preference.removeEventListener('change', followBrowser);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#0c0c0c');
    document.querySelector('link[rel="icon"]')?.setAttribute('href', `${import.meta.env.BASE_URL}${theme === 'light' ? 'favicon-light.svg' : 'favicon.svg'}`);
  }, [theme]);

  const openWelcome = useCallback(() => {
    focusAfterIntro.current = true;
    setSelectedId(null);
    setShowIntro(false);
  }, []);

  const replayIntro = useCallback(() => {
    const destination = new URL(window.location.href);
    destination.hash = '';
    window.history.replaceState(window.history.state, '', destination);
    setShowIntro(true);
  }, []);

  useEffect(() => {
    if (showIntro) return;
    const destination = new URL(window.location.href);
    destination.hash = selectedId ? `portfolio/${selectedId}` : 'welcome';
    window.history.replaceState(window.history.state, '', destination);
    if (focusAfterIntro.current) {
      document.getElementById(selectedId ? `tab-${selectedId}` : 'welcome-title')?.focus({ preventScroll: true });
      focusAfterIntro.current = false;
    }
  }, [showIntro, selectedId]);

  return showIntro ? <StartupTerminal onComplete={openWelcome} /> : <Portfolio activeId={selectedId} onSectionChange={setSelectedId} onReplay={replayIntro} theme={theme} onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} />;
}
