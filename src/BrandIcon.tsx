import {
  siAngular, siCss, siCplusplus, siFastapi, siGithub, siGitlab, siGoogledrive, siGraphql,
  siGit, siHtml5, siHuggingface, siIeee, siJavascript, siJupyter,
  siLeetcode, siMysql, siNvidia, siOllama, siOpencv, siPostman, siPytest, siPython, siPytorch,
  siReact, siScikitlearn, siSnowflake, siSpacy, siSpotify, siSpringboot, siSqlite,
  siStreamlit, siTensorflow, siTypescript,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import { faAws, faJava, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

const brands: Record<string, SimpleIcon | IconDefinition> = {
  Angular: siAngular, CSS: siCss, 'C++': siCplusplus, GitHub: siGithub, GitLab: siGitlab,
  'Google Drive': siGoogledrive, GraphQL: siGraphql, Git: siGit, HTML: siHtml5,
  'Hugging Face': siHuggingface, IEEE: siIeee, JavaScript: siJavascript,
  LeetCode: siLeetcode, MySQL: siMysql,
  Ollama: siOllama, Postman: siPostman, pytest: siPytest, Python: siPython,
  PyTorch: siPytorch, 'scikit-learn': siScikitlearn, Snowflake: siSnowflake,
  spaCy: siSpacy, Spotify: siSpotify, 'Spring Boot': siSpringboot, SQLite: siSqlite,
  Streamlit: siStreamlit, TensorFlow: siTensorflow, TypeScript: siTypescript,
  AWS: faAws, Java: faJava, LinkedIn: faLinkedinIn,
  React: siReact, Jupyter: siJupyter, FastAPI: siFastapi,
  OpenCV: siOpencv, 'NVIDIA CUDA': siNvidia,
};

const logoAssets: Record<string, { file: string; monochrome?: boolean; color?: string; darkFile?: string; lightSurface?: boolean }> = {
  Angular: { file: 'angular.svg' },
  AWS: { file: 'aws.svg', darkFile: 'aws-dark.svg' },
  ChromaDB: { file: 'chromadb.svg' },
  'Hugging Face': { file: 'huggingface.svg' },
  Java: { file: 'java.svg' },
  Jupyter: { file: 'jupyter.svg' },
  LangChain: { file: 'langchain.png' },
  LangGraph: { file: 'langgraph.png' },
  MySQL: { file: 'mysql.svg' },
  NLTK: { file: 'nltk.png', lightSurface: true },
  OpenCV: { file: 'opencv.svg' },
  Oracle: { file: 'oracle.svg', monochrome: true, color: '#C74634' },
  Python: { file: 'python.svg' },
  'scikit-learn': { file: 'scikitlearn.svg' },
};

const fontAwesomeColors: Record<string, string> = {
  AWS: '#FF9900', Java: '#007396', LinkedIn: '#0A66C2',
};

export function BrandIcon({ name, monochrome = false }: { name: string; monochrome?: boolean }) {
  const key = name.startsWith('AWS') ? 'AWS' : name.startsWith('Spotify') ? 'Spotify'
    : name.startsWith('Hugging Face') ? 'Hugging Face' : name === 'Python data pipelines' ? 'Python' : name;
  const logo = monochrome ? undefined : logoAssets[key];
  if (logo) {
    const src = `${import.meta.env.BASE_URL}images/brands/${logo.file}`;
    return logo.monochrome
      ? <span className="brand-icon brand-icon--mask" data-icon={key} style={{ color: logo.color ?? 'var(--brand-ink)', maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }} aria-hidden="true" />
      : <span className={`brand-icon${logo.lightSurface ? ' brand-icon--light-surface' : ''}`} data-icon={key} aria-hidden="true">
          <img className={`brand-logo${logo.darkFile ? ' brand-logo--light' : ''}`} src={src} width="24" height="24" alt="" decoding="async" />
          {logo.darkFile && <img className="brand-logo brand-logo--dark" src={`${import.meta.env.BASE_URL}images/brands/${logo.darkFile}`} width="24" height="24" alt="" decoding="async" />}
        </span>;
  }
  const brand = brands[key];
  const generic = name === 'Email' ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
    : name === 'Phone' ? <path d="m8 3 3 5-3 3a13 13 0 0 0 5 5l3-3 5 3-2 5C10 22 2 14 3 5Z" />
    : name === 'Resume' ? <><path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8M8 16h8" /></>
    : name === 'Website' ? <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>
    : /SQL|Oracle|Chroma/.test(name) ? <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>
    : <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20" />;
  if (!brand) return <svg className="brand-icon" data-icon={name} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{generic}</svg>;
  const color = monochrome ? 'inherit' : 'path' in brand
    ? ['000000', '181717', '0F0F11'].includes(brand.hex) ? 'var(--brand-ink)' : `#${brand.hex}`
    : fontAwesomeColors[key];
  if ('path' in brand) return <svg className="brand-icon" data-icon={key} style={{ color }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={brand.path} /></svg>;
  const [width, height, , , paths] = brand.icon;
  return <svg className="brand-icon" data-icon={key} style={{ color }} viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true">{(Array.isArray(paths) ? paths : [paths]).map((path, index) => <path d={path} key={index} />)}</svg>;
}
