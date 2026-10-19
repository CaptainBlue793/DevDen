export type SectionId = 'resume' | 'skills' | 'work' | 'projects' | 'publications' | 'activities';

export interface WorkflowStep { label: string; description: string; reason: string }
export interface CaseStudy {
  category: string;
  problem: string;
  approach: string;
  contribution: string;
  result: string;
  scope: string;
  image?: { src: string; alt: string; caption: string };
  preview?: { headline: string; steps: string; icon?: string; logo?: string };
  evidence: { label: string; url: string };
}

export const publicationCitation = 'P. D. Patra, S. K. Panda, M. K. Bishwal, and P. K. Sa, “Bidirectional Convolutional-GRU Integrated GAN for Unpaired Low-Light Image Enhancement,” in 2026 International Conference on Signal Processing and Communications (SPCOM), IEEE, 2026, pp. 1–5, doi: 10.1109/SPCOM71105.2026.11622932.';
export const publicationBibtex = `@inproceedings{patra2026bidirectional,
  author = {Patra, Palak Deb and Panda, Santosh Kumar and Bishwal, Manoj Kumar and Sa, Pankaj Kumar},
  title = {Bidirectional Convolutional-GRU Integrated GAN for Unpaired Low-Light Image Enhancement},
  booktitle = {2026 International Conference on Signal Processing and Communications (SPCOM)},
  publisher = {IEEE},
  year = {2026},
  month = jul,
  pages = {1--5},
  doi = {10.1109/SPCOM71105.2026.11622932}
}`;

export interface RecordEntry {
  title: string;
  description: string;
  meta?: string;
  metadata?: { label: string; value: string; url?: string }[];
  details?: string[];
  stack?: string[];
  url?: string;
  links?: { label: string; url: string }[];
  highlights?: string[];
  flow?: string[];
  workflow?: WorkflowStep[];
  caseStudy?: CaseStudy;
  column?: 'left' | 'middle' | 'right';
  research?: { overview: string };
}

export interface RecordGroup {
  label: string;
  column?: RecordEntry['column'];
  hideHeading?: boolean;
}

export interface Section {
  id: SectionId;
  label: string;
  directory: string;
  command: string;
  aliases?: string[];
  records: RecordEntry[];
  columns?: RecordGroup[];
  layout?: 'single';
  sourceNote?: string;
}

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const profile = {
  name: 'Palak Deb Patra',
  role: 'Software Engineer · AI / ML',
  photo: publicAsset('/images/profile-720.webp'),
  photoSrcSet: `${publicAsset('/images/profile-360.webp')} 360w, ${publicAsset('/images/profile-720.webp')} 720w`,
  photoSizes: '(max-width: 1050px) 112px, 220px',
  resumePdf: publicAsset('/resume.pdf'),
  resumePreview: publicAsset('/images/resume-preview.png'),
  contacts: [
    { label: 'Email', value: 'palakdevpatra@gmail.com', url: 'mailto:palakdevpatra@gmail.com' },
    { label: 'Phone', value: '+91 95562 10524', url: 'tel:+919556210524' },
    { label: 'LinkedIn', value: 'palak-deb-patra', url: 'https://www.linkedin.com/in/palak-deb-patra-8ba928259/' },
    { label: 'GitHub', value: 'CaptainBlue793', url: 'https://github.com/CaptainBlue793' },
    { label: 'Hugging Face', value: 'Scarletta975', url: 'https://huggingface.co/Scarletta975' },
  ],
};

const displayedProjects = ['The Engineering Atlas', 'CodeShift', 'Memex', 'FrameSmith'];

const sectionContent: Section[] = [
  {
    id: 'resume', label: 'Resume', directory: 'Resume', command: 'Get-Resume',
    layout: 'single',
    columns: [
      { label: 'Summary', hideHeading: true },
      { label: 'Education', hideHeading: true },
    ],
    records: [
      {
        title: 'About Me',
        column: 'left',
        highlights: ['Software Engineer', 'NatWest Group'],
        description: 'I’m a Software Engineer at NatWest Group, where I work on Backend Systems, APIs, and Data Workflows.\n\nOutside work, I spend time on Machine Learning, Computer Vision, Natural Language Processing, and Agent Systems. My projects include document assistants, Code Migration tools, and interactive engineering courses. I also research how Deep Learning can improve Low-Light Image Enhancement.',
      },
      {
        title: 'Education',
        column: 'right',
        highlights: ['8.52 / 10'],
        description: 'I studied Computer Science & Engineering at NIT Rourkela.',
        meta: 'December 2021 – June 2025',
        metadata: [{ label: 'CGPA', value: '8.52 / 10' }],
      },
    ],
  },
  {
    id: 'skills', label: 'Skills', directory: 'Skills', command: 'Get-Skills',
    layout: 'single',
    records: [
      {
        title: 'Programming Languages',
        description: 'Python · Java · C++ · JavaScript · TypeScript · SQL',
      },
      {
        title: 'Databases',
        description: 'Snowflake · Oracle · MySQL · ChromaDB',
      },
      {
        title: 'AI/ML',
        description: 'PyTorch · TensorFlow · scikit-learn · OpenCV · spaCy · NLTK · NVIDIA CUDA',
      },
      {
        title: 'Agent Systems',
        description: 'LangGraph · LangChain · Ollama',
      },
      {
        title: 'Web Interfaces',
        description: 'React · Angular · Streamlit',
      },
      {
        title: 'APIs',
        description: 'FastAPI · REST APIs · GraphQL',
      },
      {
        title: 'Cloud',
        description: 'AWS (S3, EC2, RDS)',
      },
      {
        title: 'Development',
        description: 'Git · GitHub · Jupyter',
      },
    ],
  },
  {
    id: 'work', label: 'Experience', directory: 'Work', command: 'Get-Work',
    layout: 'single',
    aliases: ['Get-Experience', 'Get-WorkEx'],
    columns: [
      { label: 'Full-time' },
      { label: 'Internship' },
    ],
    records: [
      {
        title: 'NatWest Group · Senior Analyst / Software Engineer',
        column: 'left',
        description: 'At NatWest Group, I work on Backend Systems, APIs, and Data Workflows for enterprise applications.',
        meta: 'July 2025 – Present',
        details: ['I build Backend Systems, APIs, and Data Workflows for enterprise applications.'],
      },
      {
        title: 'NatWest Group · Software Engineering Intern',
        column: 'right',
        description: 'During my internship, I automated DevOps reporting, taking data from GitLab APIs into Snowflake and ThoughtSpot dashboards.',
        meta: 'May – July 2024 · Gurgaon, India',
        details: [
          'I collected DevOps metrics across the organization using GitLab GraphQL and REST APIs.',
          'I wrote Python scripts to fetch paginated data and export CSVs, reducing processing time by 28%.',
          'I brought 16 CSV datasets together in Snowflake and connected them to ThoughtSpot dashboards.',
        ],
      },
    ],
    sourceNote: 'Internship outcomes are documented in my January 2026 resume.',
  },
  {
    id: 'projects', label: 'Projects', directory: 'Projects', command: 'Get-Projects',
    records: [
      {
        title: 'Memex',
        workflow: [
          { label: 'Documents', description: 'I watch for file changes, extract text with OCR where needed, and split it into chunks for vector and keyword indexes.', reason: 'Content hashes let me skip files that have not changed.' },
          { label: 'Hybrid Search', description: 'I combine ChromaDB Semantic Retrieval with SQLite FTS5 Keyword Search using Reciprocal Rank Fusion.', reason: 'Semantic Search handles paraphrases, while Keyword Search catches exact identifiers and filenames.' },
          { label: 'Rerank', description: 'A cross-encoder scores each passage alongside the question before I pass it to the model.', reason: 'This extra pass helps separate sources that cover similar topics.' },
          { label: 'Cited Answer', description: 'I use LangGraph to route questions and Ollama to generate answers locally, with numbered citations pointing to the source files.', reason: 'Readers can open the source and check the answer for themselves.' },
        ],
        caseStudy: {
          category: 'Local Document AI',
          problem: 'Finding something in notes, papers, or code is difficult when you cannot remember the filename or exact wording.',
          approach: 'I index changed documents, combine Semantic Search and Keyword Search, and rerank passages before generating an answer.',
          contribution: 'I built the document ingestion, retrieval agents, chat with citations, and tools for evaluation and analytics.',
          result: 'Memex streams answers with source citations, supports search filters, and lets me inspect indexing and retrieval results.',
          scope: 'Ollama runs locally by default. The optional cloud provider sends retrieved passages externally. Results depend on the documents and question, and the retrieval can still struggle with negation.',
          image: { src: publicAsset('/images/projects/memex-chat.png'), alt: 'Memex chat showing a document-grounded answer with numbered citations and source files', caption: 'Chat with numbered citations and source files' },
          evidence: { label: 'Read the retrieval design & evaluation', url: 'https://github.com/CaptainBlue793/Memex#evaluation' },
        },
        highlights: ['Hybrid Retrieval', 'Cited Local Answers'],
        flow: ['Documents', 'Hybrid Search', 'Rerank', 'Cited Answer'],
        url: 'https://github.com/CaptainBlue793/Memex',
        description: 'I built a local document assistant that answers questions about notes, papers, and code with source citations.',
        details: [
          'Hybrid Retrieval: I combine Semantic Search, Keyword Search, and reranking, with incremental indexing for changed files.',
          'Cited Local Answers: I stream local model responses with numbered citations that open the source files.',
        ],
        stack: ['Python', 'LangGraph', 'ChromaDB', 'SQLite', 'Ollama', 'Streamlit'],
      },
      {
        title: 'CodeShift',
        workflow: [
          { label: 'Dependency Map', description: 'I parse the modules and their imports, then use a Dependency Graph to decide the translation order.', reason: 'Each module gets the translated signatures of its dependencies as context.' },
          { label: 'Translate', description: 'Ollama generates TypeScript locally. Revisions include the previous attempt, and each file has a shared retry limit.', reason: 'Compiler and comparison feedback guide revisions, with a limit on retries.' },
          { label: 'Type-Check', description: 'I check the generated module using the source type hints and the TypeScript compiler.', reason: 'Code needs to compile before I compare its behavior with the original.' },
          { label: 'Compare', description: 'I run the Python and TypeScript versions on the same generated inputs and compare values, exceptions, and object state after each call.', reason: 'Compiling successfully does not tell me whether the translation behaves the same way.' },
          { label: 'Report', description: 'The report lists each module’s result, attempts, mismatches, and skipped checks.', reason: 'Readers can see which code was checked and which checks did not run.' },
        ],
        caseStudy: {
          category: 'Code Migration & Verification',
          image: { src: publicAsset('/images/projects/codeshift.jpg'), alt: 'CodeShift migration dashboard with source fixtures, verification counters, and module, report, and code tabs', caption: 'Migration dashboard · ready to run' },
          problem: 'A translation can compile and still change how Unicode, exceptions, or mutable objects behave.',
          approach: 'I translate modules in dependency order, check them with the compiler, and run both versions on the same generated inputs.',
          contribution: 'I built the migration agents, language adapters, revision loop, Behavioral Checks, and reports for each module.',
          result: 'My recorded August 19, 2026 run verified 15 of 31 modules as equivalent and exercised 197 functions and methods across both languages.',
          scope: 'These numbers come from one recorded run. Other modules still had type errors or differences in behavior. The report names skipped callables, and both source and generated code run as local subprocesses.',
          evidence: { label: 'Inspect the recorded migration report', url: 'https://github.com/CaptainBlue793/CodeShift/blob/main/docs/scale-run-2026-08-19.md' },
        },
        highlights: ['Behavioral Checks', 'Recorded Benchmark'],
        flow: ['Dependency Map', 'Translate', 'Type-Check', 'Compare', 'Report'],
        url: 'https://github.com/CaptainBlue793/CodeShift',
        description: 'I translate Python modules into TypeScript and verify their behavior using local Language Models.',
        details: [
          'Behavioral Checks: I combine dependency-ordered translation and compiler feedback with comparisons of return values, exceptions, and object state.',
          'Recorded Benchmark: my August 19, 2026 run verified 15 of 31 modules as equivalent and exercised 197 functions and methods.',
        ],
        stack: ['Python', 'LangGraph', 'TypeScript', 'Ollama'],
        links: [{ label: 'Benchmark Report', url: 'https://github.com/CaptainBlue793/CodeShift/blob/main/docs/scale-run-2026-08-19.md' }],
      },
      {
        title: 'FrameSmith',
        caseStudy: {
          category: 'Graphics Optimization',
          image: { src: publicAsset('/images/projects/framesmith.jpg'), alt: 'FrameSmith GPU dashboard with game settings and live GPU telemetry before an optimization run', caption: 'GPU telemetry dashboard · before an optimization run' },
          problem: 'Choosing graphics settings means balancing performance, image quality, and power use. That needs repeatable measurements on the actual hardware.',
          approach: 'I collect GPU and frame-time data, use Bayesian Search or a local agent to suggest settings, and feed benchmark scores into the next trial.',
          contribution: 'I built the GPU telemetry, optimization loop, settings registry, trial storage, and live dashboard.',
          result: 'The prototype records settings, trials, scores, and reusable profiles in SQLite so I can inspect each run.',
          scope: 'Quality and power measurements are still incomplete, and applying settings is best effort. The recorded trials show the control loop working, but I have not validated graphics improvements.',
          evidence: { label: 'Inspect the design & measurement status', url: 'https://github.com/CaptainBlue793/FrameSmith#status--what-is-proven-and-what-is-not' },
        },
        workflow: [
          { label: 'Settings', description: 'I read the available graphics options from a game registry and check temperature and power limits before each trial.', reason: 'The operating limits are enforced in code, outside the agent prompt.' },
          { label: 'Benchmark', description: 'I apply the proposed settings, allow a warm-up, and capture frame times through PresentMon.', reason: 'Each candidate needs a measured result on the hardware.' },
          { label: 'Measurements', description: 'I filter frame times, compare a screenshot against a baseline, and save telemetry and trial scores in SQLite.', reason: 'The saved data makes runs inspectable. I document the measurement gaps in the README.' },
          { label: 'Bayesian Search', description: 'A Gaussian Process model uses Expected Improvement to suggest the next combination of settings.', reason: 'Previous trials help guide the next choice without testing every possible combination.' },
        ],
        highlights: ['Measured Trials', 'Inspectable Results'],
        flow: ['Settings', 'Benchmark', 'Measurements', 'Bayesian Search'],
        url: 'https://github.com/CaptainBlue793/FrameSmith',
        description: 'My Graphics Optimization prototype explores game settings through GPU telemetry and benchmark trials.',
        details: [
          'Measured Trials: I record GPU telemetry and benchmark scores, then guide settings with Bayesian Optimization or a local agent.',
          'Inspectable Results: I save trial history and reusable profiles in SQLite; graphics performance improvements remain unvalidated.',
        ],
        stack: ['Python', 'LangGraph', 'scikit-optimize', 'PresentMon', 'NVML', 'SQLite'],
        links: [{ label: 'Measurement Status', url: 'https://github.com/CaptainBlue793/FrameSmith#status--what-is-proven-and-what-is-not' }],
      },
      {
        title: 'The Engineering Atlas',
        flow: ['Course Hub', 'Interactive Chapters', 'Practice', 'Progress'],
        workflow: [
          { label: 'Course Hub', description: 'I bring the standalone engineering courses together through a shared registry, learning paths, and search across courses.', reason: 'Learners can find a starting point and move between related topics.' },
          { label: 'Interactive Chapters', description: 'I pair explanations with animated diagrams and simulators that run in the browser.', reason: 'Changing an input and seeing the result can make a concept easier to follow.' },
          { label: 'Practice', description: 'I added interview drills, quizzes, flashcards, and mock-interview rooms alongside the lessons.', reason: 'Learners get a chance to recall and use what they have read.' },
          { label: 'Progress', description: 'Progress is saved in the browser. Optional sign-in syncs it through a Cloudflare Worker and D1.', reason: 'Learners can study on one device or choose to carry their progress between devices.' },
        ],
        caseStudy: {
          category: 'Engineering Education',
          problem: 'Engineering topics are spread across many resources, and some concepts are hard to follow from text alone.',
          approach: 'I put explanations, interactive simulations, quizzes, and interview practice together in one course hub.',
          contribution: 'I built the course sites and shared hub, including the registry, learning paths, search, themes, and progress tracking.',
          result: 'The live Atlas covers nine engineering subjects, with interactive study tools and courses that can be downloaded for offline use.',
          scope: 'Progress stays on the device by default. Optional account sync uses a separate API, and the downloadable courses work offline.',
          image: { src: publicAsset('/images/projects/engineering-atlas.png'), alt: 'The Engineering Atlas live course hub with learning paths and engineering courses', caption: 'Live course hub with learning paths and progress tracking' },
          evidence: { label: 'Explore the live Atlas', url: 'https://captainblue793.github.io/palak-engineering-atlas/' },
        },
        highlights: ['Interactive Learning', 'Connected Courses'],
        url: 'https://github.com/CaptainBlue793/palak-engineering-atlas',
        description: 'I built an interactive course hub for engineering study and interview practice.',
        details: [
          'Interactive Learning: I built a shared course hub for nine engineering subjects with simulations and quizzes.',
          'Connected Courses: I added learning paths, course search, progress tracking, and offline downloads.',
        ],
        stack: ['HTML', 'CSS', 'JavaScript'],
        links: [{ label: 'Explore the courses', url: 'https://captainblue793.github.io/palak-engineering-atlas/' }],
      },
      {
        title: 'MeLoVerse',
        flow: ['Lyrics', 'TF-IDF', 'Similarity', 'Recommendations'],
        workflow: [
          { label: 'Lyrics', description: 'I clean and lemmatize lyrics from a 10,000-song sample using spaCy.', reason: 'Related word forms are easier to compare after preprocessing.' },
          { label: 'TF-IDF', description: 'I turn the cleaned lyrics into weighted terms, removing English stop words.', reason: 'TF-IDF gives more weight to words that distinguish one song from the rest.' },
          { label: 'Similarity', description: 'I calculate song-to-song Cosine Similarity in the model-building notebook.', reason: 'Precomputing the comparisons keeps that work out of each recommendation request.' },
          { label: 'Recommendations', description: 'The app returns songs with similar lyrics and looks up album artwork through the Spotify API.', reason: 'Cover images help readers recognize and explore the recommendations when artwork is available.' },
        ],
        caseStudy: {
          category: 'Lyrics-Based Music Discovery',
          image: { src: publicAsset('/images/projects/meloverse.jpg'), alt: 'MeLoVerse music interface with a song selector and recommendation count', caption: 'Actual MeLoVerse interface · song selection' },
          problem: 'Songs can share lyrical themes even when their genres and sound are different.',
          approach: 'I clean and lemmatize lyrics, build TF-IDF vectors, and use Cosine Similarity to find related songs in a 10,000-track sample.',
          contribution: 'I built the preprocessing and similarity notebook, exported the recommendation data, and made the song picker with Spotify artwork lookup.',
          result: 'MeLoVerse suggests songs with similar lyrical vocabulary and shows album artwork when it finds a match.',
          scope: 'Recommendations depend on shared vocabulary in the sampled catalog. They do not account for sound, listening history, or semantic meaning. The app loads precomputed recommendation data.',
          evidence: { label: 'Read the recommendation method', url: 'https://github.com/CaptainBlue793/MeLoVerse#how-it-works' },
        },
        highlights: ['TF-IDF and Cosine Similarity'],
        url: 'https://github.com/CaptainBlue793/MeLoVerse',
        description: 'With MeLoVerse, I use TF-IDF and Cosine Similarity to suggest songs with similar lyrics.',
        meta: 'March 2024',
        stack: ['Python', 'spaCy', 'Streamlit', 'scikit-learn', 'Spotify API'],
      },
      {
        title: 'SummaScribe',
        flow: ['Document', 'Extract', 'Summarize', 'Export'],
        workflow: [
          { label: 'Document', description: 'Readers can upload PDFs or UTF-8 text files, paste notes, and choose a PDF page range.', reason: 'They can decide which material to summarize before processing starts.' },
          { label: 'Extract', description: 'I read text in memory and keep PDF page references with the extractive summaries.', reason: 'Readers can trace selected sentences back to their original pages.' },
          { label: 'Summarize', description: 'I use TF-IDF to select sentences and reduce repetition. An optional local T5 model rewrites sections in stages within its token limits.', reason: 'The extractive mode works immediately, while staged AI summaries handle long inputs without silently truncating them.' },
          { label: 'Export', description: 'Readers can export Markdown or JSON with source evidence or intermediate AI section summaries.', reason: 'The summary and supporting context remain useful outside the app.' },
        ],
        caseStudy: {
          category: 'Document Summarization & Source Evidence',
          image: { src: publicAsset('/images/projects/summascribe.jpg'), alt: 'SummaScribe document studio with sample text, extractive summary controls, and summary statistics', caption: 'Actual SummaScribe interface · built-in sample, extractive summary' },
          problem: 'Reviewing a long document takes time. A summary helps more when readers can check where its claims came from.',
          approach: 'I combine PDF text extraction and page selection with Extractive Summarization, plus optional rewriting through a local T5 model.',
          contribution: 'I built the extraction and summarization engine, staged compression, source inspection, validation, and exports.',
          result: 'SummaScribe produces extractive summaries without a model download and offers optional local AI, with Markdown and JSON exports.',
          scope: 'Scanned PDFs need separate OCR. Extractive summaries keep page references; AI rewrites can make mistakes and do not have sentence-level citations. Local AI needs compatible model weights.',
          evidence: { label: 'Explore the summarization design', url: 'https://github.com/CaptainBlue793/SummaScribe#whats-inside' },
        },
        highlights: ['source references', 'optional local AI'],
        url: 'https://github.com/CaptainBlue793/SummaScribe',
        description: 'I built SummaScribe to summarize PDFs and text while keeping source references available, with local AI as an optional mode.',
        stack: ['Python', 'Streamlit', 'TF-IDF', 'LaMini / T5', 'PDF Processing'],
      },
      {
        title: 'Tagify',
        flow: ['Text', 'Topics', 'Industry Matches', 'Explain'],
        workflow: [
          { label: 'Text', description: 'I split articles, transcripts, or uploaded UTF-8 text into non-overlapping segments.', reason: 'The segments give Topic Modeling several observations within a document.' },
          { label: 'Topics', description: 'I run deterministic LDA when there is enough text to support it. Otherwise, the app shows frequent key terms.', reason: 'Short or sparse input does not justify a multi-topic model.' },
          { label: 'Industry Matches', description: 'I match escaped whole phrases against editable industry dictionaries and leave out labels with no matches.', reason: 'Each suggested label has a visible keyword basis.' },
          { label: 'Explain', description: 'The app shows matched keywords, occurrence counts, and prominent terms, with JSON and CSV exports.', reason: 'Readers can inspect the text behind a category label.' },
        ],
        caseStudy: {
          category: 'Text Analysis & Explainable Labels',
          image: { src: publicAsset('/images/projects/tagify.jpg'), alt: 'Tagify text analysis workspace with its built-in healthcare and energy sample and topic settings', caption: 'Actual Tagify interface · built-in sample analysis' },
          problem: 'An article can cover several themes, and a category label tells readers little unless they can see what supports it.',
          approach: 'I combine LDA Topic Modeling with editable industry dictionaries and whole-phrase Keyword Matching.',
          contribution: 'I built the deterministic analysis engine, taxonomy matching, evidence charts, settings, and downloadable results.',
          result: 'Tagify shows themes, matched industry keywords, and occurrence counts without a model download or API key.',
          scope: 'The analysis is designed for English. Industry labels rely on word matches and can overlap. Topic weights describe the fitted model; they are not confidence scores for factual claims.',
          evidence: { label: 'Read the analysis behavior', url: 'https://github.com/CaptainBlue793/Tagify#analysis-behavior' },
        },
        highlights: ['matched keywords'],
        url: 'https://github.com/CaptainBlue793/Tagify',
        description: 'Tagify is my Text Analysis tool for finding topics and showing which keywords support each industry label.',
        stack: ['Python', 'Streamlit', 'scikit-learn', 'LDA'],
      },
      {
        title: 'WatchWise',
        flow: ['Favorites', 'Profile', 'Rank & Filter', 'Watchlist'],
        workflow: [
          { label: 'Favorites', description: 'Viewers choose up to five favorite films from the starter catalog or an imported CSV.', reason: 'Several favorites give the recommender more context than one film.' },
          { label: 'Profile', description: 'I average TF-IDF descriptions and genre features from the selected films.', reason: 'This creates a content profile without asking for viewing-history data.' },
          { label: 'Rank & Filter', description: 'I rank films with sparse Cosine Similarity, apply catalog filters, and show the terms they share.', reason: 'Readers can see the content overlap behind a suggestion. The score does not predict a rating.' },
          { label: 'Watchlist', description: 'Viewers can save films during the app session and export recommendations or saved picks as CSV.', reason: 'An exported list keeps their choices available after the session ends.' },
        ],
        caseStudy: {
          category: 'Explainable Movie Recommendations',
          image: { src: publicAsset('/images/projects/watchwise.jpg'), alt: 'WatchWise recommendation interface showing films related to Interstellar from its starter catalogue', caption: 'Actual WatchWise interface · starter catalogue recommendations' },
          problem: 'Movie suggestions are easier to judge when viewers can see what connects them to their favorites and adjust the results.',
          approach: 'I build a TF-IDF profile from several favorites, rank movies by similarity, and show shared terms alongside catalog filters.',
          contribution: 'I built Sparse Ranking, catalog import and validation, recommendation explanations, filters, session watchlists, and exports.',
          result: 'WatchWise includes a starter catalog, accepts larger CSV catalogs, and explains why each film was suggested.',
          scope: 'Scores measure content overlap and do not predict enjoyment. Watchlists last for the app session unless exported. Optional poster lookup depends on an external API.',
          evidence: { label: 'Explore the recommendation method', url: 'https://github.com/CaptainBlue793/Watchwise#understanding-your-results' },
        },
        highlights: ['explainable matches'],
        url: 'https://github.com/CaptainBlue793/Watchwise',
        description: 'I use movie descriptions and genres in WatchWise to suggest films and explain what they share with a viewer’s favorites.',
        stack: ['Python', 'Streamlit', 'TF-IDF', 'Sparse Ranking'],
      },
      {
        title: 'NetChat',
        flow: ['Public Page', 'Passages', 'Retrieve', 'Cited Reply'],
        workflow: [
          { label: 'Public Page', description: 'I load one public HTML page with host validation, size limits, redirect handling, and timeouts.', reason: 'The app keeps its source limited to the selected page.' },
          { label: 'Passages', description: 'I extract readable text and split it into overlapping passages.', reason: 'Each passage provides focused context and a source reference.' },
          { label: 'Retrieve', description: 'I rank passages with TF-IDF and send relevant text and recent conversation to hosted inference.', reason: 'The model gets page content and enough conversation context for follow-up questions.' },
          { label: 'Cited Reply', description: 'Answers appear with numbered source passages, and the conversation history stays available.', reason: 'Readers can check the sources and retry a failed request without losing the conversation.' },
        ],
        caseStudy: {
          category: 'Webpage Retrieval & Question Answering',
          image: { src: publicAsset('/images/projects/netchat.jpg'), alt: 'NetChat webpage interface with Example Domain loaded and its source preview open', caption: 'Actual NetChat interface · webpage loaded, inference not connected' },
          problem: 'Finding a specific answer on a long webpage takes time, especially when a follow-up question depends on earlier context.',
          approach: 'I extract a public HTML page, rank overlapping passages with TF-IDF, and send the relevant text and recent conversation to Hugging Face inference.',
          contribution: 'I built page loading and validation, Passage Retrieval, chat with citations, conversation handling, and recovery from failed requests.',
          result: 'NetChat answers questions about one webpage, with numbered source passages and support for follow-up questions.',
          scope: 'NetChat supports public HTML pages. Whole-site crawling, PDFs, login pages, and JavaScript rendering are outside its scope. Retrieval uses word matches, generation uses a hosted provider, and answers and citations still need review.',
          evidence: { label: 'Read the retrieval workflow', url: 'https://github.com/CaptainBlue793/NetChat#how-it-works' },
        },
        highlights: ['passages used in the answer', 'follow-up questions'],
        url: 'https://github.com/CaptainBlue793/NetChat',
        description: 'I built NetChat so readers can ask questions about a public webpage and check the passages used in each answer.',
        details: ['I retrieve relevant passages and keep conversation history available for follow-up questions.'],
        stack: ['Python', 'Streamlit', 'TF-IDF', 'Hugging Face Inference'],
      },
    ].filter(record => displayedProjects.includes(record.title))
      .sort((a, b) => displayedProjects.indexOf(a.title) - displayedProjects.indexOf(b.title)),
    sourceNote: 'The four displayed projects reflect repository documentation. Other project records are retained for later use.',
  },
  {
    id: 'publications', label: 'Publications', directory: 'Publications', command: 'Get-Publications',
    layout: 'single',
    records: [
      {
        title: 'Bidirectional Convolutional-GRU Integrated GAN for Unpaired Low-Light Image Enhancement',
        research: {
          overview: 'In this work, my co-authors and I use a GAN with Bidirectional Convolutional GRU modules for Low-Light Image Enhancement. By learning from unpaired images, the model captures local textures and longer-range dependencies to improve detail and structure in low-light scenes.',
        },
        highlights: ['First author'],
        url: 'https://doi.org/10.1109/SPCOM71105.2026.11622932',
        description: 'My co-authors and I use Bidirectional Convolutional GRU modules in a GAN to enhance low-light images without paired training examples.',
        meta: 'First author · IEEE SPCOM 2026 · July 2026 · Pages 1–5',
        metadata: [
          { label: 'Authors', value: 'Palak Deb Patra, Santosh Kumar Panda, Manoj Kumar Bishwal, and Pankaj Kumar Sa' },
          { label: 'DOI', value: '10.1109/SPCOM71105.2026.11622932', url: 'https://doi.org/10.1109/SPCOM71105.2026.11622932' },
        ],
        links: [
          { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/11622932/' },
          { label: 'Research Repository', url: 'https://github.com/CaptainBlue793/research-publications' },
        ],
      },
    ],
  },
  {
    id: 'activities', label: 'Activities', directory: 'Activities', command: 'Get-Activities',
    columns: [
      { label: 'Technical' },
      { label: 'Non-technical' },
    ],
    records: [
      {
        title: 'Competitive Programming',
        column: 'left',
        highlights: ['800+', '1795'],
        description: 'I’ve solved 800+ LeetCode problems and reached a peak rating of 1795, placing me in the top 8% globally.',
        details: ['I ranked 277 globally in Weekly Contest 438 and 1839 in Weekly Contest 437.'],
        url: 'https://leetcode.com/BlueMask6/',
      },
      {
        title: 'Amazon ML Summer School',
        column: 'left',
        meta: '2023',
        description: 'I was selected for Amazon ML Summer School, where I studied advanced Machine Learning topics.',
      },
      {
        title: 'NITRUTSAV · Event Management Coordinator',
        column: 'right',
        highlights: ['20%'],
        description: 'I led a team of seven volunteers at NIT Rourkela’s cultural festival.',
        meta: 'August – September 2023',
        details: ['I helped increase sponsorship by 20% and participant engagement by 11.26%.'],
      },
      {
        title: 'AASRA · Senior Staff Member',
        column: 'right',
        highlights: ['₹2,11,000'],
        description: 'I coordinated outreach and fundraising for AASRA’s DIYA Project.',
        meta: 'June 2022 – January 2024',
        details: ['I contributed to the team’s fundraising effort, which raised ₹2,11,000 and generated ₹1,32,000 in profit.'],
      },
      {
        title: 'LLMs & Prompt Patterns',
        column: 'left',
        highlights: ['100%'],
        meta: 'Vanderbilt University',
        description: 'I completed the program with a score of 100%.',
      },
      {
        title: 'Interests',
        column: 'right',
        description: 'Away from the keyboard, I enjoy football, fitness, painting, and travel.',
      },
    ],
    sourceNote: 'Competition results, course scores, and campus outcomes are documented in my January 2026 resume.',
  },
];

const sectionOrder: SectionId[] = ['skills', 'resume', 'work', 'projects', 'publications', 'activities'];
export const sections = sectionOrder.map(id => sectionContent.find(section => section.id === id)!);
