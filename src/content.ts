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
  highlights?: (string | { text: string; color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'cyan' | 'pink' })[];
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
  intro?: string;
  sourceNote?: string;
}

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const profile = {
  name: 'Palak Deb Patra',
  role: 'Software Engineer · AI / ML',
  photo: publicAsset('/images/profile-720.webp'),
  photoSrcSet: `${publicAsset('/images/profile-360.webp')} 360w, ${publicAsset('/images/profile-720.webp')} 720w`,
  photoSizes: '(max-width: 1050px) 112px, 220px',
  contacts: [
    { label: 'Email', value: 'palakdevpatra@gmail.com', url: 'mailto:palakdevpatra@gmail.com' },
    { label: 'Phone', value: '+91 95562 10524', url: 'tel:+919556210524' },
    { label: 'LinkedIn', value: 'palak-deb-patra', url: 'https://www.linkedin.com/in/palak-deb-patra-8ba928259/' },
    { label: 'GitHub', value: 'CaptainBlue793', url: 'https://github.com/CaptainBlue793' },
    { label: 'Hugging Face', value: 'Scarletta975', url: 'https://huggingface.co/Scarletta975' },
  ],
};

export const resumeDocuments = [
  { id: 'resume', label: 'Professional CV', pdf: publicAsset('/resume.pdf?v=dd92308e'), previews: [publicAsset('/images/resume-preview.png?v=4999cf12')] },
  { id: 'academic-cv', label: 'Academic CV', pdf: publicAsset('/academic-cv.pdf?v=d64c3f1e'), previews: [publicAsset('/images/academic-cv-preview.png?v=d2e4fed8'), publicAsset('/images/academic-cv-preview-2.png?v=4152eedf')] },
] as const;

const displayedProjects = ['The Engineering Atlas', 'CodeShift', 'Memex', 'FrameSmith'];

const sectionContent: Section[] = [
  {
    id: 'resume', label: 'Resume', directory: 'Resume', command: 'Get-Resume',
    layout: 'single',
    records: [
      {
        title: 'About Me',
        highlights: ['Software Engineer', 'NatWest Group', 'AI Engineering', 'Cloud Engineering', 'Data Engineering'],
        description: 'I’m a Software Engineer at NatWest Group. Most of my work sits in three areas:',
        details: [
          'AI Engineering: I work on AI agents for Microsoft 365, MCP integrations, AI observability and data parsing.',
          'Power Platform and Microsoft 365: I build low-code agents, power automate workflows and dataverse tables.',
          'Cloud Engineering: I use Power Platform pipelines, GitLab CI/CD, Ansible and HashiCorp tools.',
        ],
      },
      {
        title: 'Research Interests',
        highlights: ['Computer Vision', 'Natural Language Processing'],
        description: 'I also pursue research independently—unofficial title, very official curiosity. Huge interest in NLP and Computer Vision domain, especially areas such as image enhancement and image generation, with local and cloud-hosted LLMs close behind.\n\nMy first-author IEEE SPCOM 2026 paper explores unpaired Low-Light Image Enhancement, using a new architecture that combines Bidirectional Convolutional-GRU with GANs.',
      },
    ],
  },
  {
    id: 'skills', label: 'Skills', directory: 'Skills', command: 'Get-Skills',
    layout: 'single',
    records: [
      {
        title: 'Programming Languages',
        description: 'Python · Java · C++ · TypeScript · SQL',
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
        description: 'LangGraph · LangChain · Ollama · FastMCP · Hugging Face · Claude · Codex',
      },
      {
        title: 'Web Interfaces',
        description: 'Angular · Streamlit',
      },
      {
        title: 'APIs',
        description: 'FastAPI · REST APIs · GraphQL',
      },
      {
        title: 'Power Platform',
        description: 'Microsoft Copilot Studio · Power Automate · Power Apps · Dataverse · Microsoft 365',
      },
      {
        title: 'Cloud',
        description: 'AWS · Azure · Cloudflare Workers ',
      },
      {
        title: 'Development',
        description: 'Git · GitLab CI/CD · Ansible · Jupyter',
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
        title: 'NatWest Group · Software Engineer',
        column: 'left',
        description: 'Colleague Learning Assistant (CLA) and ChLoE',
        meta: 'July 2025 – Present · Bangalore, India',
        highlights: [
          { text: 'OpenTelemetry', color: 'cyan' }, { text: 'Azure Application Insights', color: 'blue' },
          { text: '131 automated tests', color: 'green' }, { text: '11 Kusto queries', color: 'purple' },
          { text: 'PingFederate', color: 'yellow' }, { text: 'Microsoft Entra ID', color: 'blue' },
          { text: 'Workday', color: 'cyan' }, { text: 'Azure Blob Storage', color: 'blue' },
          { text: 'GitLab CI/CD', color: 'purple' }, { text: 'GitLab', color: 'purple' }, { text: 'Microsoft Teams', color: 'cyan' },
          { text: '23 out of 26 test cases', color: 'green' },
        ],
        details: [
          'I wired up OpenTelemetry and Azure Application Insights so requests, tool calls and conversations leave a trail, with failures grouped into 8 categories.',
          'I developed 131 automated tests and 11 Kusto queries to check agent behaviour, investigate failures and monitor telemetry.',
          'I configured Single Sign-On (SSO) with PingFederate and Microsoft Entra ID, including a three-step fallback that handles missing authentication details without mistaking one employee for another.',
          'I brought in the last 12 months of Workday learning completion records so recommendations can account for courses colleagues have already finished.',
          'I built an Azure Blob Storage pipeline for GitLab coding metrics in Excel workbooks. It skips unchanged downloads and falls back to the last valid copy when a download fails.',
          'I redesigned 3 Microsoft Teams widgets—Learning Courses, ECDF progress and GitLab metrics—to fit NatWest branding and fix rendering issues.',
          'I helped move deployments from Power Platform pipelines to GitLab CI/CD while keeping the bank’s security guardrails and release requirements in view.',
          'I improved Power Platform FAQ knowledge sources and tested revised agent replies in SIT and UAT; 23 out of 26 test cases passed.',
          'I fixed duplicate agent responses after SIT/UAT deployments and corrected the Microsoft Teams “Start over” trigger so it clears chat history, closes active topics and starts with a new memory context.',
        ],
      },
      {
        title: 'NatWest Group · Software Engineering Intern',
        column: 'right',
        description: 'OSPO Metrics',
        meta: 'May – July 2024 · Gurgaon, India',
        highlights: [
          { text: 'GitLab GraphQL and REST APIs', color: 'purple' },
          { text: 'Python', color: 'blue' }, { text: '28%', color: 'green' },
          { text: '16 datasets', color: 'green' }, { text: 'Snowflake', color: 'cyan' },
          { text: 'ThoughtSpot', color: 'yellow' },
        ],
        details: [
          'I pulled together engineering activity metrics for our business unit through GitLab GraphQL and REST APIs.',
          'I automated data extraction and CSV exports, reducing manual processing time by 28% .',
          'I loaded 16 datasets into Snowflake and created a unified model for interactive ThoughtSpot dashboards.',
        ],
      },
    ],
  },
  {
    id: 'projects', label: 'Projects', directory: 'Projects', command: 'Get-Projects',
    intro: 'Yes, I Claude-coded these projects. Claude wrote the code; I set the direction, gave detailed instructions, reviewed and tested the results, and made the final calls.',
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
          contribution: 'I directed Claude’s implementation of document ingestion, retrieval agents, cited chat, evaluation and analytics, then reviewed and tested the results.',
          result: 'Memex streams answers with source citations, supports search filters, and lets me inspect indexing and retrieval results.',
          scope: 'Ollama runs locally by default. The optional cloud provider sends retrieved passages externally. Results depend on the documents and question, and the retrieval can still struggle with negation.',
          image: { src: publicAsset('/images/projects/memex-chat.png'), alt: 'Memex chat showing a document-grounded answer with numbered citations and source files', caption: 'Chat with numbered citations and source files' },
          evidence: { label: 'Read the retrieval design & evaluation', url: 'https://github.com/CaptainBlue793/Memex#evaluation' },
        },
        highlights: ['Hybrid Retrieval', 'Cited Local Answers'],
        flow: ['Documents', 'Hybrid Search', 'Rerank', 'Cited Answer'],
        url: 'https://github.com/CaptainBlue793/Memex',
        description: 'I wanted my notes and papers to answer with receipts, so I directed Claude to create a local document assistant with source citations.',
        details: [
          'Hybrid Retrieval: I specified how Semantic Search, Keyword Search, reranking and incremental indexing should work together. Citations were non-negotiable.',
          'Cited Local Answers: Memex streams local answers with numbered links to the source files. My professional CV reports indexing 3,050 files into 42,743 chunks in approximately 15 minutes on a local GPU, and ranking a relevant result first for 41 of 42 questions from a separate 23-document corpus (97.6% Hit@1, 0.988 MRR, 100% Recall@5).',
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
          contribution: 'I directed Claude’s implementation of the migration agents, adapters, revision loop, Behavioral Checks and reports, then reviewed the recorded run.',
          result: 'My recorded August 19, 2026 run verified 15 of 31 modules as equivalent and exercised 197 functions and methods across both languages.',
          scope: 'These numbers come from one recorded run. Other modules still had type errors or differences in behavior. The report names skipped callables, and both source and generated code run as local subprocesses.',
          evidence: { label: 'Inspect the recorded migration report', url: 'https://github.com/CaptainBlue793/CodeShift/blob/main/docs/scale-run-2026-08-19.md' },
        },
        highlights: ['Behavioral Checks', 'Recorded Benchmark'],
        flow: ['Dependency Map', 'Translate', 'Type-Check', 'Compare', 'Report'],
        url: 'https://github.com/CaptainBlue793/CodeShift',
        description: 'I directed a local-LLM tool to turn Python modules into TypeScript, then check whether the translation still behaves the same. Compiling is only the first hurdle.',
        details: [
          'Behavioral Checks: I specified dependency order, compiler feedback and comparisons of return values, exceptions and object state. “It compiles” was not enough.',
          'Recorded Benchmark: my August 19, 2026 run verified 15 of 31 modules as equivalent and exercised 197 functions and methods. The other modules kept the tool honest.',
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
          contribution: 'I directed Claude’s implementation of GPU telemetry, the optimization loop, settings registry, trial storage and dashboard, and reviewed what the measurements can support.',
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
        description: 'I got tired of guessing at graphics settings, so I directed a prototype that measures GPU behaviour and tries candidate settings. It still has homework to do.',
        details: [
          'Measured Trials: I set the trial goals and reviewed GPU telemetry and benchmark scores; Bayesian Optimization or a local agent suggests what to try next.',
          'Inspectable Results: The prototype saves trials and reusable profiles in SQLite; graphics performance improvements remain unvalidated. I prefer that caveat to a heroic FPS claim.',
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
          contribution: 'I directed Claude’s work on the course sites and shared hub, then reviewed the learning paths, search, themes and progress tracking.',
          result: 'The live Atlas covers nine engineering subjects, with interactive study tools and courses that can be downloaded for offline use.',
          scope: 'Progress stays on the device by default. Optional account sync uses a separate API, and the downloadable courses work offline.',
          image: { src: publicAsset('/images/projects/engineering-atlas.png'), alt: 'The Engineering Atlas live course hub with learning paths and engineering courses', caption: 'Live course hub with learning paths and progress tracking' },
          evidence: { label: 'Explore the live Atlas', url: 'https://captainblue793.github.io/palak-engineering-atlas/' },
        },
        highlights: ['Interactive Learning', 'Connected Courses'],
        url: 'https://github.com/CaptainBlue793/palak-engineering-atlas',
        description: 'I wanted engineering lessons to feel less like a wall of text, so I directed Claude to turn them into an interactive study hub.',
        details: [
          'Interactive Learning: I mapped out nine engineering subjects and reviewed the simulations and quizzes until they taught something useful, not just looked clever.',
          'Connected Courses: I guided the learning paths, course search, progress tracking and offline downloads. Losing your place should not be part of studying.',
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
          contribution: 'I directed Claude’s work on lyric preprocessing, the similarity notebook, recommendation data and the song picker, then reviewed the output.',
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
          contribution: 'I directed Claude’s work on extraction, summarization, source inspection, validation and exports, then tested the results.',
          result: 'SummaScribe produces extractive summaries without a model download and offers optional local AI, with Markdown and JSON exports.',
          scope: 'Scanned PDFs need separate OCR. Extractive summaries keep page references; AI rewrites can make mistakes and do not have sentence-level citations. Local AI needs compatible model weights.',
          evidence: { label: 'Explore the summarization design', url: 'https://github.com/CaptainBlue793/SummaScribe#whats-inside' },
        },
        highlights: ['source references', 'optional local AI'],
        url: 'https://github.com/CaptainBlue793/SummaScribe',
        description: 'I directed SummaScribe to summarize PDFs and text while keeping source references available; local AI is an optional mode.',
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
          contribution: 'I directed Claude’s work on the analysis engine, taxonomy matching, evidence charts, settings and exports, then reviewed the labels.',
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
          contribution: 'I directed Claude’s work on ranking, catalog import, explanations, filters, watchlists and exports, then checked the recommendations.',
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
          contribution: 'I directed Claude’s work on page validation, retrieval, cited chat, conversation handling and failure recovery, then tested the flow.',
          result: 'NetChat answers questions about one webpage, with numbered source passages and support for follow-up questions.',
          scope: 'NetChat supports public HTML pages. Whole-site crawling, PDFs, login pages, and JavaScript rendering are outside its scope. Retrieval uses word matches, generation uses a hosted provider, and answers and citations still need review.',
          evidence: { label: 'Read the retrieval workflow', url: 'https://github.com/CaptainBlue793/NetChat#how-it-works' },
        },
        highlights: ['passages used in the answer', 'follow-up questions'],
        url: 'https://github.com/CaptainBlue793/NetChat',
        description: 'I directed NetChat so readers can ask questions about a public webpage and check the passages used in each answer.',
        details: ['NetChat retrieves relevant passages and keeps conversation history available for follow-up questions.'],
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
          overview: 'I led this first-author study on a question that sounds simple until you try it ? How do you brighten a low-light image without a matching bright training photo? My co-authors and I used a CycleGAN-based model with Bidirectional Convolutional GRU modules for unpaired Low-Light Image Enhancement. .',
        },
        highlights: ['First author'],
        url: 'https://doi.org/10.1109/SPCOM71105.2026.11622932',
        description: 'I led our study of unpaired Low-Light Image Enhancement using Bidirectional Convolutional GRU modules in a GAN.',
        meta: 'First author · IEEE SPCOM 2026 · Pages 1–5',
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
        description: 'I’ve solved 800+ LeetCode problems and reached a peak rating of 1795, placing me in the top 8% globally. Apparently my idea of a break is another edge case.',
        details: ['I ranked 277 globally in Weekly Contest 438 and 1839 in Weekly Contest 437. Yes, I checked the standings.'],
        url: 'https://leetcode.com/BlueMask6/',
      },
      {
        title: 'Amazon ML Summer School',
        column: 'left',
        meta: '2023',
        description: 'I was selected for Amazon ML Summer School in 2023, where I studied advanced Machine Learning. There is always another rabbit hole.',
      },
      {
        title: 'NITRUTSAV · Event Management Coordinator',
        column: 'right',
        highlights: ['20%'],
        description: 'I led seven volunteers at NIT Rourkela’s cultural festival. Event planning is a lot like debugging, except the deadline has a stage and an audience.',
        meta: 'August – September 2023',
        details: ['Together, we helped secure a 20% increase in sponsorship.'],
      },
      {
        title: 'AASRA · Senior Staff Member',
        column: 'right',
        highlights: ['₹2,11,000'],
        description: 'I supported outreach and fundraising for AASRA’s DIYA Project. Community work is rarely glamorous; it matters anyway.',
        meta: 'June 2022 – January 2024',
        details: ['Our team raised ₹2,11,000 through collective effort.'],
      },
      {
        title: 'Interests',
        column: 'right',
        description: 'Away from the keyboard, I play football, work out, paint and travel. Sometimes a walk solves a problem faster than another hour staring at it.',
      },
    ],
    sourceNote: 'Competition results are reported in my October 2026 resume; community work is reported in my academic CV.',
  },
];

const sectionOrder: SectionId[] = ['skills', 'resume', 'work', 'projects', 'publications', 'activities'];
export const sections = sectionOrder.map(id => sectionContent.find(section => section.id === id)!);
