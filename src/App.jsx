import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import heroImg from "./assets/Profilephoto.jpg";
import mcaImg from "./assets/mca.png";
import npweeImg from "./assets/npwee.png";
import codepathImg from "./assets/codepath.png";
import indeedImg from "./assets/indeed.png";
import mentalImg from "./assets/mental.png";
import techwiseImg from "./assets/TechWise.png";
import ai110Img from "./assets/codepathAI110-1.png";
import ai201Img from "./assets/codepathAI201-1.png";
import web101Img from "./assets/codepathWEB101-1.png";
import resumePDF from "./assets/ChilawoMunene-resume-SW26.pdf";

// Accent colors (warm editorial palette): clay, moss, ochre
const C = { clay: "#b4532a", moss: "#2f6b57", ochre: "#9a6b12" };

const NAV = ["About", "Work", "Product", "Experience", "Credentials", "Contact"];

const PROJECTS = [
  {
    title: "Pona: Food-Sensitivity Checker",
    desc: "Scan a barcode, photograph a label, or paste ingredients, and Pona flags anything on your profile without ever claiming \"safe.\" Built from a 20-person user study and measured at 94.5% allergen recall on 22,799 real allergen tags.",
    details: "Pona (\"to heal\" in Zambian Tonga) checks whether a food contains something you react to, and it tells you what it couldn't check. I surveyed 20 people with allergies, celiac disease and intolerances: 11 had a checking method fail them, 8 cope by avoiding anything they're unsure about, and only 5 use an app at all. As a solo builder I handled research, design, backend, frontend, evaluation and deployment. Users check foods by barcode (Open Food Facts), label photo (multi-pass Tesseract OCR) or pasted text. A rule-based engine covering 13 conditions catches hidden ingredient names like semolina, sodium caseinate and ghee, and it avoids lookalikes such as cocoa butter and buckwheat. A printable chef card lets users show restaurant staff their triggers instead of explaining everything out loud. I measured a fine-tuned DistilBERT normalizer at F1 = 0.0 and replaced it with auditable rules, which reached 94.5% recall and removed about 2 GB of dependencies. When the data showed that 860 of 1,073 tree-nut flags were coconut, I reversed my FDA-based decision, and tree-nut precision rose from 58.6% to 85.6%. The guiding principle is to fail closed, never quietly: I fixed four bugs that reported food as fine when nothing had been checked, including an OCR pass that showed 93.7% confidence while dropping \"PEANUTS\" from a label. Each fix has a regression test, and there are 81 checks in total. Non-English labels reach only 27.3% recall, so I report that number separately instead of averaging it in.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Tesseract OCR", "React", "Tailwind CSS", "Docker"],
    github: "https://github.com/Munya574/Pona",
    live: "https://pona-t.vercel.app",
    featured: true,
    status: "In development",
    tagline: "It never says “safe.” It tells you what it found, and what it couldn't check.",
    stats: [
      { value: "94.5%", label: "Allergen recall, English labels" },
      { value: "22,799", label: "Human-tagged allergen tags evaluated" },
      { value: "85.6%", label: "Tree-nut precision, up from 58.6% after a data-driven reversal" },
      { value: "81", label: "Regression tests: fail closed, never quiet" }
    ],
    tag: "Health Tech", col: C.moss,
    images: []
  },
  {
    title: "Research Summarizer Agent",
    desc: "Autonomous AI agent that polls a live job marketplace every 30 seconds, filters research-paper summarization tasks, and completes them end-to-end without human intervention — powered by Claude Sonnet with prompt caching.",
    details: "Built an autonomous agent that continuously polls the Nightshift AGI marketplace, filters for research-paper summarization tasks, and completes them without human intervention. The agent integrates the Anthropic Claude API (claude-sonnet-4-6) with prompt caching to generate structured 6-section academic summaries covering problem, method, findings, limitations, and audience, reducing repeated token costs across the poll cycle. A web scraping pipeline built with requests and BeautifulSoup handles arXiv PDF-to-abstract URL normalization, graceful error handling, and content size limits to stay within Claude's context window. The REST API client manages the full job lifecycle: listing, acceptance with 409 race-condition handling, and proof submission via a session-authenticated requests.Session. A lightweight Flask health-check server runs on a daemon thread, enabling deployment on cloud platforms with liveness probes (Railway, Render, Fly.io). The agent loop uses resilient error isolation, per-job failures are caught and submitted as error proofs without crashing the main poll cycle.",
    tech: ["Python", "Claude API", "Anthropic SDK", "Flask", "BeautifulSoup", "REST APIs"],
    github: "https://github.com/Munya574/Research-summarizer-agent.git",
    tag: "AI Agent", col: C.clay,
    images: []
  },
  {
    title: "City Leadership (Choose901) Analytics",
    desc: "Analyzed 4 years of alumni data (3,000+ records) for a Memphis nonprofit, surfaced 4 key student success drivers with 96% model accuracy. Dashboards adopted by City Leadership.",
    details: "During my internship at the Edwards Research & Innovation Center (ERIC) at the University of Memphis, I applied ML classification models to 4 years of Choose901 alumni data to identify what drives student success. I engineered features, automated preprocessing pipelines in scikit-learn for reproducible training, and built interactive dashboards in Plotly and R to communicate findings. The model achieved 96% accuracy, and the results were adopted by City Leadership to restructure the program and improve data collection practices — real-world impact from a data project.",
    tech: ["Python", "R", "Excel", "Pandas", "scikit-learn", "Plotly"],
    github: null,
    tag: "Data Analytics", col: C.ochre,
    images: []
  },
  {
    title: "Eye Disease Diagnostic System",
    desc: "OphthoAI takes a patient's reported symptoms and returns a structured clinical diagnosis, ICD-10 code, CPT billing code, severity level, prescription recommendation, and an ML confidence score, stored in a SQLite audit log with every query timestamped.",
    details: "OphthoAI accepts patient-reported symptoms and produces a full clinical output: matching ICD-10 code, CPT billing code, severity classification (Mild / Moderate / Severe / Critical), prescription recommendation, and an ML confidence score. The system runs in two modes — a Flask-served web UI with symptom autocomplete and color-coded severity badges, and a CLI batch mode that processes a symptoms.csv file for multiple patients at once. ICD-10 feature engineering converts the hierarchical ophthalmology code structure (H00–H59) into numerical ML features encoding anatomical category, subcategory, code specificity, and laterality. A RandomForest classifier trained on those structural features combined with symptom keyword vectors predicts both condition and severity. A Flask REST API exposes four endpoints for diagnosis, retrieval, and condition lookup, backed by a SQLite database with conditions, diagnoses, and audit_log tables, every query is traceable with a UTC timestamp.",
    tech: ["Python", "Flask", "SQL", "scikit-learn"],
    github: "https://github.com/Munya574/Eye-Disease-Diagnostics-System.git",
    tag: "Healthcare AI", col: C.ochre,
    images: []
  },
  {
    title: "AI Breast Cancer Detection",
    desc: "Trained and compared 5 ML models on the Wisconsin Diagnostic dataset, achieving 99% accuracy on our top configuration, tracked end-to-end with MLflow.",
    details: "Built a complete ML pipeline for breast cancer detection using the Wisconsin Diagnostic dataset. Trained and compared 5 model types; Logistic Regression, Decision Tree, SVM, KNN, and Random Forest; using both scikit-learn and PyTorch. The end-to-end pipeline covers preprocessing, feature engineering, cross-validation, and evaluation across F1, precision, and recall. In medical diagnostics, false negatives carry higher stakes than false positives, which shaped every modeling decision. The top performing model was the Logistic Regression model, achieving 99% accuracy, tracked and logged via MLflow.",
    tech: ["Python", "PyTorch", "scikit-learn", "Pandas", "NumPy", "MLflow"],
    github: "https://github.com/Munya574/TechWise-Project-2.git",
    tag: "Machine Learning", col: C.moss,
    images: []
  },
  {
    title: "Mementoria",
    desc: "Full-stack memory-keeping, scrapbooking app built as Product Lead on a 4-person team. Shipped to production in 4 weeks with a PostgreSQL backend, REST API, and multi-user session support.",
    details: "As Product Lead, I collaborated on Mementoria, a full-stack web-app where users preserve memories through written entries, photo uploads, and audio recordings. Built with React on the frontend and Node.js on the backend, with a PostgreSQL/Prisma data layer designed to support concurrent multi-user sessions. I designed the relational data model, built the REST API endpoints, and coordinated a 4-person team from architecture to production ship in 4 weeks.",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    github: "https://github.com/Munya574/mementoria.git",
    tag: "Web App", col: C.clay,
    images: []
  },
  {
    title: "DEI in Tech Research",
    desc: "Faculty-supervised research examining diversity, equity, and inclusion trends in the technology sector, combining qualitative synthesis with quantitative data analysis.",
    details: "Faculty-supervised research at Grambling State University examining DEI trends across the technology industry. The work combines systematic literature review with quantitative analysis of workforce demographics, hiring pipelines, and retention rates at major tech firms. Findings were compiled into a formal research report documenting structural barriers and evidence-based interventions for improving DEI outcomes in STEM fields.",
    tech: ["Python", "Data Analysis", "Research Methods"],
    github: null,
    tag: "Research", col: C.clay,
    images: []
  }
];

const CERTIFICATIONS = [
  {
    title: "NASA L'SPACE Mission Concept Academy (MCA)",
    issuer: "NASA · Arizona State University",
    date: "2024",
    desc: "Selected for NASA's L'SPACE Mission Concept Academy — a competitive 15-week program where I worked on an interdisciplinary team to develop a complete spacecraft mission concept following actual NASA engineering procedures, earning all 7 skill badges.",
    details: "L'SPACE — Lucy Student Pipeline Accelerator and Competency Enabler — is a NASA workforce development program administered with Arizona State University. In the Mission Concept Academy, I worked within an interdisciplinary team to produce a complete Preliminary Design Review (PDR) mission concept, following the same procedures NASA engineering teams use in practice. The work spanned spacecraft design, science traceability, systems engineering, risk identification, and thermal analysis, using Siemens NX for CAD modeling and JMARS for planetary data analysis. Each of the seven skill modules requires passing an assessment before the badge appears on your completion certificate. I earned all seven: Teaming, Project Management, Requirements Engineering, Systems Engineering, Siemens NX, Heat Transfer, and Risk Management.",
    tag: "NASA / Space",
    col: C.clay,
    skills: ["Systems Engineering", "Project Management", "Requirements Engineering", "Siemens NX (CAD)", "Heat Transfer", "Risk Management", "Teaming"],
    credential: "#",
    images: [mcaImg]
  },
  {
    title: "NASA L'SPACE NPWEE",
    issuer: "NASA · Arizona State University",
    date: "2024",
    desc: "In this 12-week NASA L'SPACE program, my team wrote a full proposal responding to a real NASA solicitation; competing for a $10,000 prize. In addition, we served as proposal evaluators, scoring peer submissions using the same criteria NASA applies to actual funding decisions.",
    details: "The NASAProposal Writing and Evaluation Experience (NPWEE)is part of the NASA L'SPACE program family, sponsored by NASA's Marshall Space Flight Center. Over 12 weeks, my team identified a genuine gap in NASA's exploration priorities, developed a technical solution, and submitted a formal written proposal competing for a $10,000 prize. The second phase shifted our role entirely: we evaluated peer proposals using the same criteria NASA applies to real funding solicitations. Moving between the role of author and evaluator gave me a clearer understanding of what makes technical communication persuasive, and where proposals typically fall apart.",
    tag: "NASA / Space",
    col: C.moss,
    skills: ["Proposal Writing", "Technical Writing", "Peer Review", "NASA Solicitations", "Problem Framing", "Siemens NX (CAD)"],
    credential: "#",
    images: [npweeImg]
  },
  {
    title: "TechWise Program",
    issuer: "TalentSprint · Google · CMU School of Computer Science",
    date: "2024",
    desc: "Selected for TechWise, a competitive, fully Google-funded 18-month software engineering program with 150 seats per cohort, mentorship from Google engineers, and a certificate from CMU's School of Computer Science.",
    details: "TechWise is a fully Google-funded software engineering program run by TalentSprint, designed to increase representation in the technology industry. Admission is competitive (150 seats per cohort). Over 18 months at 12–15 hours per week, the curriculum spans five areas: Computational Thinking, Data Structures and Algorithms, Web Development (JavaScript, REST APIs, Express.js, PostgreSQL, CI/CD), Generative AI, and Machine Learning. Mentorship is structured across three tiers: TalentSprint instructors for technical content, Google engineers for professional development, and Carnegie Mellon University's School of Computer Science faculty for masterclasses. Graduates receive a certificate of completion from CMU's School of Computer Science Executive and Professional Education program.",
    tag: "Tech Accelerator",
    col: C.moss,
    skills: ["Data Structures & Algorithms", "Web Development", "JavaScript", "REST APIs", "Generative AI", "Machine Learning", "CI/CD"],
    credential: "#",
    images: [techwiseImg]
  },
  {
    title: "AI201: Applications of AI Engineering",
    issuer: "CodePath",
    date: "2026",
    desc: "The intermediate course in CodePath's Applied AI Engineering pathway (AI110 → AI201 → AI301): designing complex AI systems, evaluating AI-generated code, and working in existing production codebases. I built six projects, including RAG, agents, and a fine-tuned classifier.",
    details: "AI201 is the intermediate course in CodePath's Applied AI Engineering pathway, which runs AI110 → AI201 → AI301. It is a 10-week, virtual, instructor-led course on designing and developing complex systems, evaluating AI-generated code, and automating backend integrations. I completed it in Summer 2026. Across six projects, I built a RAG system that makes student reviews of Grambling professors searchable with sourced answers, FitFindr (a multi-tool thrifting agent whose planning loop branches on tool results and fails gracefully when a search comes up empty), and TakeMeter (a fine-tuned classifier that separates detailed from low-effort questions on r/sewing, trained on data I annotated myself). I also built Provenance Guard, a backend service that estimates whether text was written by a human or by AI. It is designed around asymmetric error cost, so it would rather say \"uncertain\" than falsely accuse a human writer. The final two projects were a bug hunt in an existing Flask codebase and a simulated code review, both practice in reading, fixing, and critiquing code written by someone else.",
    tag: "AI Engineering",
    col: C.moss,
    skills: ["RAG", "AI Agents & Tool Use", "Fine-tuning", "LLM Evaluation", "Flask", "Debugging", "Code Review", "Testing"],
    credential: "#",
    images: [ai201Img]
  },
  {
    title: "WEB101: Intro to Web Development (Honors)",
    issuer: "CodePath",
    date: "2026",
    desc: "CodePath's 10-week intro to web development, completed with Honors in Summer 2026: building responsive, interactive user interfaces with HTML, CSS, and modern JavaScript.",
    details: "WEB101 is the introductory course in CodePath's Web Development pathway: a 10-week, virtual, instructor-led course focused on responsive design and client-side development. Over the course I built interactive, fluid user interfaces with HTML, CSS, and modern JavaScript. Topics included Flexbox and page layout, asynchronous JavaScript with async/await, animation, and web design principles. I completed it in Summer 2026 with Honors, which CodePath awards for outstanding performance in the course.",
    tag: "Web Development",
    col: C.ochre,
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Flexbox & Layout", "Async/Await", "Animation", "Web Design Principles"],
    credential: "#",
    images: [web101Img]
  },
  {
    title: "AI110: Foundations of AI Engineering",
    issuer: "CodePath",
    date: "2026",
    desc: "10-week CodePath course in AI engineering — built AI-assisted applications while developing hands-on skills in Python, data structures, RAG, agentic workflows, and prompt engineering.",
    details: "AI110 is CodePath's Foundations of AI Engineering course and the entry point to their Applied AI Engineering pathway. Over 10 weeks at 4–6 hours per week, the curriculum covers Python, data structures, algorithms, and object-oriented programming — with AI embedded directly into the coding process rather than treated as a separate topic. Core areas include ML literacy across supervised, unsupervised, and generative models; prompt engineering and critical evaluation of AI-generated code; Retrieval-Augmented Generation (RAG); agentic workflows; lightweight fine-tuning; and AI guardrails. Students use Git and GitHub throughout and build portfolio-ready applications including chatbots and summarization tools. Enrolled students receive complimentary access to Claude Code for the duration of the course.",
    tag: "AI Engineering",
    col: C.moss,
    skills: ["Python", "Data Structures & Algorithms", "Prompt Engineering", "RAG", "Agentic Workflows", "ML Literacy", "Git & GitHub", "Claude Code"],
    credential: "#",
    images: [ai110Img]
  },
  {
    title: "Cybersecurity 101",
    issuer: "CodePath",
    date: "2024",
    desc: "10-week CodePath course developed with Meta: hands-on work across network traffic analysis, malware behavior, intrusion detection, and a full incident response capstone using Wireshark, Wazuh, and Splunk.",
    details: "CodePath's Cybersecurity 101 was developed in collaboration with Meta for students with no prior security background. Over 10 weeks, the curriculum covered Linux fundamentals, cryptography and access control, network traffic analysis with Wireshark, malware behavior, social engineering, and intrusion detection with Wazuh. The second half focused on incident response, working through the NIST framework and investigating simulated attacks in Splunk. The course concluded with a group capstone where we handled a full attack scenario from initial detection through response and post-incident documentation.",
    tag: "Cybersecurity",
    col: C.ochre,
    skills: ["Linux CLI", "Network Analysis", "Wireshark", "Malware Analysis", "Incident Response", "Wazuh", "Splunk", "NIST Framework"],
    credential: "#",
    images: [codepathImg]
  },
  {
    title: "Job Search Academy - Job Search All-Star",
    issuer: "Indeed",
    date: "2024",
    desc: "Completed Indeed's Job Search Academy across all five modules: resume writing, interview preparation, offer evaluation, salary negotiation, and career management, earning the Job Search All-Star designation.",
    details: "I completed Indeed's Job Search Academy to develop a more deliberate approach to the job search process, the strategy behind it, not just the mechanics of applying. The five modules cover resume writing, interview preparation through a structured framework, evaluating job offers, negotiating compensation, and managing your career over the long term. The live webinars with Indeed's Career Strategists were particularly valuable. They offered direct insight into how hiring decisions get made and what distinguishes candidates at each stage. Completing all five modules earns the Job Search All-Star designation.",
    tag: "Professional Development",
    col: C.moss,
    skills: ["Resume Writing", "Interview Prep", "Salary Negotiation", "Job Search Strategy", "Offer Evaluation", "Career Management"],
    credential: "#",
    images: [indeedImg]
  },
  {
    title: "Mental Health First Aid",
    issuer: "National Council for Mental Wellbeing",
    date: "2024",
    desc: "Certified in Mental Health First Aid. Trained to recognize and respond to mental health crises using the ALGEE action plan, covering depression, anxiety, psychosis, substance use, and suicidal ideation.",
    details: "I pursued this certification in direct response to my role as a Senior Resident Assistant, where I am frequently the first point of contact for students in distress. Mental Health First Aid is an 8-hour evidence-based certification recognized across 51 countries and supported by over 90 peer-reviewed studies. The core framework is the ALGEE Action Plan: Assess for risk, Listen nonjudgmentally, Give reassurance and information, Encourage professional help, and Encourage self-help and other support strategies. The training addresses specific conditions — depression, anxiety disorders, psychosis, substance use disorders, suicidal ideation, and acute trauma — each with defined warning signs and appropriate responses. I apply this training regularly in my work supporting students on campus. The certification is valid for three years.",
    tag: "Health & Wellness",
    col: C.clay,
    skills: ["ALGEE Action Plan", "Crisis Response", "Suicide Risk Assessment", "Active Listening", "Mental Health Awareness", "Substance Use", "Trauma Response"],
    credential: "#",
    images: [mentalImg]
  }
];

const SKILLS = [
  { cat: "Product", items: ["User research & discovery", "MVP scoping", "Success metrics & OKRs", "Build-vs-buy analysis", "Roadmap prioritization", "Agile / sprint planning", "Stakeholder presentation", "Figma"], col: C.clay },
  { cat: "Languages", items: ["Python", "C++", "SQL", "R", "Java", "JavaScript"], col: C.clay },
  { cat: "AI & Machine Learning", items: ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Plotly", "MLflow", "Hugging Face", "Weights & Biases"], col: C.moss },
  { cat: "Web Development", items: ["React", "Node.js", "PostgreSQL", "Prisma", "Flask", "Tailwind CSS"], col: C.ochre },
  { cat: "Tools & Platforms", items: ["Git", "Figma", "Tableau", "PowerBI", "GitHub"], col: C.clay }
];


function useModalBehavior(onClose) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);
}

function Tag({ label, color }) {
  return <span className="tag" style={{ "--c": color }}>{label}</span>;
}

function SectionHead({ title, kicker }) {
  return (
    <header className="section-head reveal">
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
    </header>
  );
}

function Stats({ stats, col }) {
  return (
    <dl className="stats" style={{ "--c": col }}>
      {stats.map(s => (
        <div key={s.label} className="stat">
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Modal({ item, onClose }) {
  useModalBehavior(onClose);
  const d = item.data;
  const isProject = item.type === "project";

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={d.title}
        onClick={e => e.stopPropagation()} style={{ "--c": d.col }}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-meta">
          <Tag label={d.tag} color={d.col} />
          {d.status && <Tag label={d.status} color={C.ochre} />}
          {!isProject && <span className="mono muted">{d.issuer} · {d.date}</span>}
        </div>
        <h2 className="modal-title">{d.title}</h2>
        {d.tagline && <p className="modal-tagline">{d.tagline}</p>}

        {d.stats && <Stats stats={d.stats} col={d.col} />}

        {d.images && d.images.length > 0 && (
          <div className="modal-images">
            {d.images.map((img, i) => <img key={i} src={img} alt={`${d.title} ${i + 1}`} />)}
          </div>
        )}

        <p className="modal-body">{d.details || d.desc}</p>

        <p className="eyebrow">{isProject ? "Tech stack" : "Skills covered"}</p>
        <ul className="chips">
          {(isProject ? d.tech : d.skills).map(t => <li key={t}>{t}</li>)}
        </ul>

        <div className="actions">
          {isProject && d.live && <a className="btn btn-solid" href={d.live} target="_blank" rel="noreferrer">{d.status ? "Try the preview ↗" : "Live app ↗"}</a>}
          {isProject && d.github && <a className="btn btn-line" href={d.github} target="_blank" rel="noreferrer">View code ↗</a>}
          {!isProject && d.credential && d.credential !== "#" && (
            <a className="btn btn-line" href={d.credential} target="_blank" rel="noreferrer">View credential ↗</a>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumeModal({ onClose }) {
  useModalBehavior(onClose);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal modal-resume" role="dialog" aria-modal="true" aria-label="Resume" onClick={e => e.stopPropagation()}>
        <div className="resume-bar">
          <span className="mono muted">Chilawo Munene — Résumé</span>
          <div className="resume-bar-actions">
            <a className="btn btn-solid btn-sm" href={resumePDF} download="ChilawoMunene-Resume.pdf">↓ Download</a>
            <button className="close close-inline" onClick={onClose} aria-label="Close">×</button>
          </div>
        </div>
        <iframe src={resumePDF} title="Resume" />
      </div>
    </div>
  );
}

const PRODUCT_DECISIONS = [
  {
    evidence: "11 of 20",
    found: "people I surveyed before writing any code had a checking method fail them.",
    decision: "I reframed the problem from missing information to unreadable labels, and scoped the MVP around reading them: barcode, label photo, or pasted text."
  },
  {
    evidence: "About half",
    found: "described the social cost of asking questions in restaurants and friends' kitchens.",
    decision: "I built the chef card, a profile sized to hand to kitchen staff, and didn't build restaurant cross-contact checking, which had no data source behind it."
  },
  {
    evidence: "860 of 1,073",
    found: "tree-nut flags across 14,798 products turned out to be coconut.",
    decision: "I reversed my own FDA-based rule. Precision rose 27 points at a cost of 0.6 points of recall."
  },
  {
    evidence: "F1 = 0.0",
    found: "from the fine-tuned DistilBERT model I had planned to rely on.",
    decision: "I shipped auditable rules instead (94.5% recall), which also cut about 2 GB of dependencies. For a safety decision, explainable beats impressive."
  },
  {
    evidence: "Never",
    found: "will Pona call a food “safe.”",
    decision: "I defined what the product refuses to do: no safety verdicts, no nutrition ratings, and an explicit error for unbuilt features instead of a plausible guess."
  },
  {
    evidence: "2 cut",
    found: "conditions, MSG sensitivity and gout, because the evidence didn't support them.",
    decision: "Fewer, well-scoped conditions I can stand behind beat a longer list I can't."
  }
];

const PRODUCT_ELSEWHERE = [
  { where: "Mementoria · Product Lead", what: "Led a 4-person team to production in 4 weeks, cutting non-essential features to protect the launch date. I wrote the data model and API contract as the spec both sides built against, so frontend and backend could work in parallel." },
  { where: "Choose901 · Data Analytics Intern", what: "Turned a nonprofit's open-ended question into a measurable analysis, then shipped dashboards non-technical decision-makers could use themselves. City Leadership used them to restructure the program." },
  { where: "Research Summarizer Agent", what: "Designed the 6-section output around the reader's decisions rather than the model's capabilities, and delivered it to an external partner as a working demo instead of a spec." }
];

const HONORS = [
  "EICOP 2026 Finalist",
  "Earl Lester Cole Honors Student",
  "President's List",
  "TechWise Fellow",
  "NASA L'SPACE Scholar",
  "ColorStack Fellow"
];

const TIMELINE = [
  { when: "Jun – Jul 2025", what: "Data Analytics Intern", where: "Edwards Research & Innovation Center · University of Memphis" },
  { when: "Aug 2024 – Present", what: "Senior Resident Assistant", where: "Grambling State University" },
  { when: "Jan 2024 – Dec 2027", what: "B.S. Computer Science, Biology Minor · GPA 3.9/4.0", where: "Grambling State University" }
];

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.dataset.sec); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("[data-sec]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const sec = id => ({ "data-sec": id, id: id.toLowerCase() });
  const scrollTo = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openProject = p => setSelectedItem({ type: "project", data: p });
  const openCert = c => setSelectedItem({ type: "cert", data: c });

  const featured = PROJECTS.find(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <div className="site">
      <Analytics />

      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Chilawo Munene<span className="dot" aria-hidden="true">.</span>
          </button>
          <div className="nav-links">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)} className={activeNav === n ? "active" : ""}>{n}</button>
            ))}
            <button className="btn btn-line btn-sm" onClick={() => setShowResume(true)}>Résumé</button>
          </div>
        </div>
      </nav>

      <main className="wrap">

        {/* HERO */}
        <section className="hero" {...sec("About")}>
          <div className="hero-text">
            <p className="eyebrow reveal">Hi, I'm Chilawo — most people call me Munya.</p>
            <h1 className="reveal">I aim to build for those who need it <em>most.</em></h1>
            <p className="lead reveal">
              I'm a Computer Science Junior at Grambling State University. I believe technology, especially AI, is the key to making healthcare efficient and accessible.
            </p>
            <div className="actions reveal">
              <button className="btn btn-solid" onClick={() => scrollTo("Work")}>See my work ↓</button>
              <button className="btn btn-line" onClick={() => setShowResume(true)}>View résumé</button>
            </div>
          </div>
          <figure className="portrait reveal">
            <div className="portrait-frame">
              <img src={heroImg} alt="Chilawo Munene" />
            </div>
            <figcaption className="mono">From Zambia to Grambling, Louisiana</figcaption>
          </figure>
        </section>

        <ul className="honor-strip reveal" aria-label="Honors">
          {HONORS.map(h => <li key={h}>{h}</li>)}
        </ul>

        {/* ABOUT */}
        <section className="about split">
          <SectionHead kicker="About" title="Why I build" />
          <div className="prose reveal">
            <p className="dropcap">Growing up in Zambia, I watched technology function as a privilege. Present in the world, just not always in mine. That's the frame I bring to everything I build. The question I keep coming back to is: what does it actually take to build systems that work for the people who need them most?</p>
            <p>Most of my work lives at the intersection of AI and healthcare. I'm drawn to high-stakes problems where the gap between what's technically possible and what's actually accessible is still wide.</p>
            <p>I'm also a TechWise Fellow (Google + CMU), a NASA L'SPACE alumnus, and a Senior Resident Assistant, which is a longer way of saying I don't think building good technology and showing up for people are separate things. Open to research collaborations, internships, and conversations at the intersection of AI, health equity, and impact.</p>
            <ul className="chips">
              {["AI & Machine Learning", "Data Analytics", "Health Equity Tech", "Social Impact"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        {/* WORK */}
        <section {...sec("Work")}>
          <SectionHead kicker="Selected work" title="Things I've built" />

          {featured && (
            <article className="featured reveal" style={{ "--c": featured.col }}>
              <div className="featured-text">
                <div className="featured-meta">
                  <Tag label="Featured" color={featured.col} />
                  {featured.status && <Tag label={featured.status} color={C.ochre} />}
                  <span className="mono muted">{featured.tag} · Solo build · 2026</span>
                </div>
                <h3>Pona</h3>
                <p className="featured-tagline">{featured.tagline}</p>
                <p className="featured-desc">{featured.desc}</p>
                <div className="actions">
                  <button className="btn btn-solid" onClick={() => openProject(featured)}>Read the case study</button>
                  <a className="btn btn-line" href={featured.live} target="_blank" rel="noreferrer">{featured.status ? "Try the preview ↗" : "Live app ↗"}</a>
                  <a className="btn btn-ghost" href={featured.github} target="_blank" rel="noreferrer">Code ↗</a>
                </div>
              </div>
              <Stats stats={featured.stats} col={featured.col} />
            </article>
          )}

          <ol className="project-list">
            {others.map(p => (
              <li key={p.title} className="reveal">
                <button className="project-row" onClick={() => openProject(p)} style={{ "--c": p.col }}>
                  <span className="project-main">
                    <span className="project-title">{p.title}</span>
                    <span className="project-desc">{p.desc}</span>
                    <span className="project-tech mono">{p.tech.join(" · ")}</span>
                  </span>
                  <span className="project-side">
                    <Tag label={p.tag} color={p.col} />
                    <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        {/* PRODUCT */}
        <section {...sec("Product")}>
          <SectionHead kicker="Product" title="How I decide what to build" />
          <p className="product-intro reveal">
            On Pona I was the product owner as well as the engineer. Every major call started with evidence,
            and several of them reversed my own first instinct.
          </p>

          <div className="decisions-head reveal">
            <span className="mono">Pona decision log</span>
            <Tag label="Living document" color={C.ochre} />
            <span className="muted">Pona is in active development, so these evolve. These are the latest calls and the evidence behind them.</span>
          </div>
          <ol className="decisions">
            {PRODUCT_DECISIONS.map((d, i) => (
              <li key={d.evidence} className="decision reveal">
                <span className="mono muted">Decision {i + 1}</span>
                <p className="decision-evidence"><strong>{d.evidence}</strong> {d.found}</p>
                <p className="decision-call"><span className="decision-label">What I did:</span> {d.decision}</p>
              </li>
            ))}
          </ol>

          <div className="elsewhere reveal">
            <p className="eyebrow">The same habits on other teams</p>
            <ul>
              {PRODUCT_ELSEWHERE.map(e => (
                <li key={e.where}>
                  <strong>{e.where}</strong>
                  <span>{e.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="split" {...sec("Experience")}>
          <SectionHead kicker="Experience" title="Where I've been" />
          <div className="reveal">
            <ol className="timeline">
              {TIMELINE.map(t => (
                <li key={t.what}>
                  <span className="mono muted">{t.when}</span>
                  <strong>{t.what}</strong>
                  <span className="muted">{t.where}</span>
                </li>
              ))}
            </ol>
            <button className="btn btn-line" onClick={() => setShowResume(true)}>Full résumé →</button>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section {...sec("Credentials")}>
          <SectionHead kicker="Programs & certifications" title="Where I keep learning" />
          <ul className="cred-list">
            {CERTIFICATIONS.map(c => (
              <li key={c.title} className="reveal">
                <button className="cred-row" onClick={() => openCert(c)} style={{ "--c": c.col }}>
                  <span className="mono muted cred-date">{c.date}</span>
                  <span className="cred-main">
                    <span className="cred-title">{c.title}</span>
                    <span className="muted">{c.issuer}</span>
                  </span>
                  <Tag label={c.tag} color={c.col} />
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* SKILLS */}
        <section className="split">
          <SectionHead kicker="Toolkit" title="What I work with" />
          <dl className="skills reveal">
            {SKILLS.map(s => (
              <div key={s.cat} className="skill-row" style={{ "--c": s.col }}>
                <dt>{s.cat}</dt>
                <dd>{s.items.join(" / ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      {/* CONTACT */}
      <section className="contact" {...sec("Contact")}>
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h2 className="reveal">Let's build something that <em>matters.</em></h2>
          <p className="contact-lead">Open to research collaborations, internships, and conversations about AI, data, and social impact.</p>
          <p className="contact-email mono">chilawomunene2023@gmail.com</p>
          <div className="actions">
            <a className="btn btn-light" href="mailto:chilawomunene2023@gmail.com">Email me</a>
            <a className="btn btn-light-line" href="https://github.com/Munya574" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="btn btn-light-line" href="https://linkedin.com/in/chilawomunene" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <footer className="wrap footer mono">
          <span>© 2026 Chilawo Munene</span>
          <span>Built with React</span>
        </footer>
      </section>
    </div>
  );
}
