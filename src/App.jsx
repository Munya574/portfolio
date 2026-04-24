import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import heroImg from "./assets/Profilephoto.jpg";
import mcaImg from "./assets/mca.png";
import npweeImg from "./assets/npwee.png";
import codepathImg from "./assets/codepath.png";
import indeedImg from "./assets/indeed.png";
import mentalImg from "./assets/mental.png";
import techwiseImg from "./assets/TechWise.png";
import resumePDF from "./assets/ChilawoMunene-resume-DSR.pdf";

const C = {
  bg: "#08080e", surface: "#0f0f1c", card: "#14142a", border: "#1e1e3a",
  purple: "#a78bfa", purpleD: "#6d28d9", cyan: "#67e8f9", cyanD: "#0e7490",
  pink: "#f9a8d4", pinkD: "#9d174d", text: "#e2e8f0", muted: "#94a3b8", dim: "#475569"
};

const NAV = ["About", "Projects", "Certifications", "Skills", "Resume", "Contact"];

const PROJECTS = [
  {
    title: "Mementoria",
    desc: "Full-stack memory-keeping, scrapbooking app built as Product Lead on a 4-person team. Shipped to production in 4 weeks with a PostgreSQL backend, REST API, and multi-user session support.",
    details: "As Product Lead, I collaborated on Mementoria, a full-stack web-app where users preserve memories through written entries, photo uploads, and audio recordings. Built with React on the frontend and Node.js on the backend, with a PostgreSQL/Prisma data layer designed to support concurrent multi-user sessions. I designed the relational data model, built the REST API endpoints, and coordinated a 4-person team from architecture to production ship in 4 weeks.",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    github: "https://github.com/Munya574/mementoria.git",
    tag: "Web App", col: C.purple,
    images: []
  },
  {
    title: "AI Breast Cancer Detection",
    desc: "Trained and compared 5 ML models on the Wisconsin Diagnostic dataset, achieving 99% accuracy on our top configuration, tracked end-to-end with MLflow.",
    details: "Built a complete ML pipeline for breast cancer detection using the Wisconsin Diagnostic dataset. Trained and compared 5 model types; Logistic Regression, Decision Tree, SVM, KNN, and Random Forest; using both scikit-learn and PyTorch. The end-to-end pipeline covers preprocessing, feature engineering, cross-validation, and evaluation across F1, precision, and recall. In medical diagnostics, false negatives carry higher stakes than false positives, which shaped every modeling decision. The top performing model was the Logistic Regression model, achieving 99% accuracy, tracked and logged via MLflow.",
    tech: ["Python", "PyTorch", "scikit-learn", "Pandas", "NumPy", "MLflow"],
    github: "https://github.com/Munya574/TechWise-Project-2.git",
    tag: "Machine Learning", col: C.cyan,
    images: []
  },
  {
    title: "City Leadership (Choose901) Analytics",
    desc: "Analyzed 4 years of alumni data (3,000+ records) for a Memphis nonprofit, surfaced 4 key student success drivers with 96% model accuracy. Dashboards adopted by City Leadership.",
    details: "During my internship at the Edwards Research & Innovation Center (ERIC) at the University of Memphis, I applied ML classification models to 4 years of Choose901 alumni data to identify what drives student success. I engineered features, automated preprocessing pipelines in scikit-learn for reproducible training, and built interactive dashboards in Plotly and R to communicate findings. The model achieved 96% accuracy, and the results were adopted by City Leadership to restructure the program and improve data collection practices — real-world impact from a data project.",
    tech: ["Python", "R", "Excel", "Pandas", "scikit-learn", "Plotly"],
    github: null,
    tag: "Data Analytics", col: C.pink,
    images: []
  },
  {
    title: "Eye Disease Diagnostic System",
    desc: "ML diagnostic system classifying ICD-10 ophthalmology codes across severity levels using Flask and scikit-learn, with a SQL backend built for audit-traceable clinical workflows.",
    details: "Built an ML-powered diagnostic system that classifies ICD-10 ophthalmology codes (H00–H59) across severity levels using scikit-learn and Flask. One of the core challenges was bridging medical taxonomy and ML — I converted the structured ICD-10 code hierarchy into ML-ready features, allowing the model to reason across clinical categories. The SQL backend was designed for scalability and audit traceability, supporting reliable diagnostic query and retrieval workflows suited to a clinical setting.",
    tech: ["Python", "Flask", "SQL", "scikit-learn"],
    github: "https://github.com/Munya574/Final_project-Fall-2024-.git",
    tag: "Healthcare AI", col: C.pink,
    images: []
  },
  {
    title: "DEI in Tech Research",
    desc: "Faculty-supervised research examining diversity, equity, and inclusion trends in the technology sector, combining qualitative synthesis with quantitative data analysis.",
    details: "Faculty-supervised research at Grambling State University examining DEI trends across the technology industry. The work combines systematic literature review with quantitative analysis of workforce demographics, hiring pipelines, and retention rates at major tech firms. Findings were compiled into a formal research report documenting structural barriers and evidence-based interventions for improving DEI outcomes in STEM fields.",
    tech: ["Python", "Data Analysis", "Research Methods"],
    github: null,
    tag: "Research", col: C.purple,
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
    col: C.purple,
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
    col: C.cyan,
    skills: ["Proposal Writing", "Technical Writing", "Peer Review", "NASA Solicitations", "Problem Framing", "Siemens NX (CAD)"],
    credential: "#",
    images: [npweeImg]
  },
  {
    title: "Cybersecurity 101",
    issuer: "CodePath",
    date: "2024",
    desc: "10-week CodePath course developed with Meta: hands-on work across network traffic analysis, malware behavior, intrusion detection, and a full incident response capstone using Wireshark, Wazuh, and Splunk.",
    details: "CodePath's Cybersecurity 101 was developed in collaboration with Meta for students with no prior security background. Over 10 weeks, the curriculum covered Linux fundamentals, cryptography and access control, network traffic analysis with Wireshark, malware behavior, social engineering, and intrusion detection with Wazuh. The second half focused on incident response, working through the NIST framework and investigating simulated attacks in Splunk. The course concluded with a group capstone where we handled a full attack scenario from initial detection through response and post-incident documentation.",
    tag: "Cybersecurity",
    col: C.pink,
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
    col: C.cyan,
    skills: ["Resume Writing", "Interview Prep", "Salary Negotiation", "Job Search Strategy", "Offer Evaluation", "Career Management"],
    credential: "#",
    images: [indeedImg]
  },
  {
    title: "TechWise Program",
    issuer: "TalentSprint · Google · CMU School of Computer Science",
    date: "2024",
    desc: "Selected for TechWise, a competitive, fully Google-funded 18-month software engineering program with 150 seats per cohort, mentorship from Google engineers, and a certificate from CMU's School of Computer Science.",
    details: "TechWise is a fully Google-funded software engineering program run by TalentSprint, designed to increase representation in the technology industry. Admission is competitive (150 seats per cohort). Over 18 months at 12–15 hours per week, the curriculum spans five areas: Computational Thinking, Data Structures and Algorithms, Web Development (JavaScript, REST APIs, Express.js, PostgreSQL, CI/CD), Generative AI, and Machine Learning. Mentorship is structured across three tiers: TalentSprint instructors for technical content, Google engineers for professional development, and Carnegie Mellon University's School of Computer Science faculty for masterclasses. Graduates receive a certificate of completion from CMU's School of Computer Science Executive and Professional Education program.",
    tag: "Tech Accelerator",
    col: C.cyan,
    skills: ["Data Structures & Algorithms", "Web Development", "JavaScript", "REST APIs", "Generative AI", "Machine Learning", "CI/CD"],
    credential: "#",
    images: [techwiseImg]
  },
  {
    title: "Mental Health First Aid",
    issuer: "National Council for Mental Wellbeing",
    date: "2024",
    desc: "Certified in Mental Health First Aid. Trained to recognize and respond to mental health crises using the ALGEE action plan, covering depression, anxiety, psychosis, substance use, and suicidal ideation.",
    details: "I pursued this certification in direct response to my role as a Senior Resident Assistant, where I am frequently the first point of contact for students in distress. Mental Health First Aid is an 8-hour evidence-based certification recognized across 51 countries and supported by over 90 peer-reviewed studies. The core framework is the ALGEE Action Plan: Assess for risk, Listen nonjudgmentally, Give reassurance and information, Encourage professional help, and Encourage self-help and other support strategies. The training addresses specific conditions — depression, anxiety disorders, psychosis, substance use disorders, suicidal ideation, and acute trauma — each with defined warning signs and appropriate responses. I apply this training regularly in my work supporting students on campus. The certification is valid for three years.",
    tag: "Health & Wellness",
    col: C.purple,
    skills: ["ALGEE Action Plan", "Crisis Response", "Suicide Risk Assessment", "Active Listening", "Mental Health Awareness", "Substance Use", "Trauma Response"],
    credential: "#",
    images: [mentalImg]
  }
];

const SKILLS = [
  { cat: "Languages", items: ["Python", "C++", "SQL", "R", "Java", "JavaScript"], col: C.purple },
  { cat: "AI & Machine Learning", items: ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Plotly", "MLflow", "Hugging Face", "Weights & Biases"], col: C.cyan },
  { cat: "Web Development", items: ["React", "Node.js", "PostgreSQL", "Prisma", "Flask", "Tailwind CSS"], col: C.pink },
  { cat: "Tools & Platforms", items: ["Git", "Figma", "Tableau", "PowerBI", "GitHub"], col: C.purple }
];

function Tag({ label, color }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color, background: color + "22", padding: "3px 10px", borderRadius: 20, letterSpacing: 1.2, textTransform: "uppercase" }}>
      {label}
    </span>
  );
}

function SectionTitle({ text, col }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text, marginBottom: 6 }}>{text}</h2>
      <div style={{ height: 3, width: 48, borderRadius: 2, background: `linear-gradient(90deg, ${col}, transparent)` }} />
    </div>
  );
}

function ResumeRow({ main, sub, col }) {
  return (
    <div style={{ paddingLeft: 14, borderLeft: `2px solid ${col}55`, marginBottom: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{main}</div>
      <div style={{ fontSize: 13, color: C.muted }}>{sub}</div>
    </div>
  );
}

function Modal({ item, onClose }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const d = item.data;
  const isProject = item.type === "project";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.card,
          border: `1px solid ${d.col}55`,
          borderRadius: 18,
          padding: "36px 40px",
          maxWidth: 640,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${d.col}22, inset 0 1px 0 ${d.col}18`
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: C.surface,
            border: `1px solid ${C.border}`,
            color: C.muted,
            borderRadius: 8,
            width: 32, height: 32,
            cursor: "pointer",
            fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            lineHeight: 1
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: 20, paddingRight: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <Tag label={d.tag} color={d.col} />
            {!isProject && (
              <span style={{ fontSize: 13, color: C.dim }}>{d.issuer} · {d.date}</span>
            )}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.3, marginBottom: 0 }}>
            {d.title}
          </h2>
        </div>

        {/* Images */}
        {d.images && d.images.length > 0 && (
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {d.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${d.title} ${i + 1}`}
                style={{
                  borderRadius: 10,
                  maxHeight: 200,
                  maxWidth: "100%",
                  objectFit: "cover",
                  border: `1px solid ${C.border}`
                }}
              />
            ))}
          </div>
        )}

        {/* Details */}
        <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.78, marginBottom: 26 }}>
          {d.details || d.desc}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, marginBottom: 22 }} />

        {/* Tech / Skills */}
        <div style={{ marginBottom: 26 }}>
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: d.col, marginBottom: 10 }}>
            {isProject ? "Tech Stack" : "Skills Covered"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {(isProject ? d.tech : d.skills).map(t => (
              <span key={t} style={{ fontSize: 12, color: C.dim, background: C.surface, border: `1px solid ${C.border}`, padding: "4px 11px", borderRadius: 6 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {isProject && d.github && (
            <a
              href={d.github}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "9px 22px",
                borderRadius: 9,
                background: d.col + "18",
                border: `1px solid ${d.col}55`,
                color: d.col,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700
              }}
            >
              ↗ View on GitHub
            </a>
          )}
          {!isProject && d.credential && d.credential !== "#" && (
            <a
              href={d.credential}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "9px 22px",
                borderRadius: 9,
                background: d.col + "18",
                border: `1px solid ${d.col}55`,
                color: d.col,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700
              }}
            >
              ↗ View Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumeModal({ onClose }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(6px)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 860,
          height: "90vh",
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
          flexShrink: 0
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Chilawo Munene — Resume</span>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={resumePDF}
              download="ChilawoMunene-Resume.pdf"
              style={{
                padding: "6px 16px", borderRadius: 7,
                background: `linear-gradient(135deg,${C.purpleD},${C.cyanD})`,
                color: "#fff", fontSize: 13, fontWeight: 700,
                textDecoration: "none", whiteSpace: "nowrap"
              }}
            >
              ↓ Download
            </a>
            <button
              onClick={onClose}
              style={{
                background: C.card, border: `1px solid ${C.border}`,
                color: C.muted, borderRadius: 7,
                width: 32, height: 32, cursor: "pointer",
                fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <iframe
          src={resumePDF}
          title="Resume"
          style={{ flex: 1, width: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [hovered, setHovered] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.dataset.sec); });
    }, { threshold: 0.25 });
    Object.values(refs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const sec = id => ({ ref: el => refs.current[id] = el, "data-sec": id });
  const scrollTo = id => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openProject = (p) => setSelectedItem({ type: "project", data: p });
  const openCert = (c) => setSelectedItem({ type: "cert", data: c });

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "system-ui,-apple-system,sans-serif", minHeight: "100vh" }}>
      <Analytics />

      {/* MODAL */}
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 99, background: "rgba(8,8,14,0.88)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 17, background: `linear-gradient(120deg,${C.purple},${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            CM
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 7, fontSize: 13, fontWeight: activeNav === n ? 700 : 400, color: activeNav === n ? C.purple : C.muted, transition: "color .2s" }}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* ABOUT / HERO */}
        <section {...sec("About")} style={{ padding: "80px 0 64px", position: "relative", overflow: "hidden" }}>
          {/* ambient glow */}
          <div style={{ position: "absolute", top: -80, left: -120, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${C.purpleD}44 0%, transparent 65%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 60, right: -80, width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle, ${C.cyanD}44 0%, transparent 65%)`, pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
            {/* Left: text content */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <p style={{ color: C.cyan, fontSize: 13, fontWeight: 700, letterSpacing: 2.5, marginBottom: 14 }}>Hi, I'm Chilawo...but most people call me Munya.</p>
              <h1 style={{ fontSize: 50, fontWeight: 900, lineHeight: 1.08, marginBottom: 20 }}>
                <span style={{ background: `linear-gradient(120deg,${C.purple},${C.cyan},${C.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Chilawo Nchimunya Munene
                </span>
              </h1>
              <p style={{ fontSize: 16, color: C.muted, maxWidth: 680, lineHeight: 1.75, marginBottom: 32 }}>
                I am a Computer Science student at Grambling State University with a passion for AI, data analytics, and leveraging technology for social impact. My work spans machine learning research, web development projects, and data-driven insights. All of my work is centered around the goal of creating equitable tech solutions that make a difference. I am an international student from Zambia, and growing up in a developing country has deeply influenced my perspective on technology's potential to drive positive change. I am particularly interested in the intersection of AI and health equity, and I am eager to connect with others who share these passions.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["AI & Machine Learning", "Data Analytics", "Health Equity Tech", "Social Impact"].map(t => (
                  <span key={t} style={{ fontSize: 13, color: C.dim, border: `1px solid ${C.border}`, padding: "4px 13px", borderRadius: 20 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right: headshot */}
            <div style={{ flexShrink: 0, position: "relative", marginRight: 40 }}>
              {/* Glow ring behind photo */}
              <div style={{
                position: "absolute", inset: -4,
                borderRadius: "50%",
                background: `conic-gradient(${C.purple}, ${C.cyan}, ${C.pink}, ${C.purple})`,
                zIndex: 0
              }} />
              <div style={{
                position: "relative", zIndex: 1,
                width: 240, height: 240,
                borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${C.bg}`
              }}>
                <img
                  src={heroImg}
                  alt="Chilawo Munene"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section {...sec("Projects")} style={{ paddingBottom: 64 }}>
          <SectionTitle text="Projects" col={C.purple} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 18 }}>
            {PROJECTS.map((p, i) => (
              <div key={i}
                onClick={() => openProject(p)}
                onMouseEnter={() => setHovered(`p${i}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: C.card, borderRadius: 14, padding: 24,
                  border: `1px solid ${hovered === `p${i}` ? p.col + "55" : C.border}`,
                  transition: "all .25s",
                  transform: hovered === `p${i}` ? "translateY(-5px)" : "none",
                  boxShadow: hovered === `p${i}` ? `0 12px 36px ${p.col}18` : "none",
                  cursor: "pointer"
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <Tag label={p.tag} color={p.col} />
                  <span style={{ fontSize: 12, color: C.dim }}>Click for details</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.68, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: 12, color: C.dim, background: C.surface, border: `1px solid ${C.border}`, padding: "2px 9px", borderRadius: 5 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section {...sec("Certifications")} style={{ paddingBottom: 64 }}>
          <SectionTitle text="Certifications" col={C.cyan} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i}
                onClick={() => openCert(cert)}
                onMouseEnter={() => setHovered(`c${i}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: C.card, borderRadius: 14, padding: 24,
                  border: `1px solid ${hovered === `c${i}` ? cert.col + "55" : C.border}`,
                  transition: "all .25s",
                  transform: hovered === `c${i}` ? "translateY(-5px)" : "none",
                  boxShadow: hovered === `c${i}` ? `0 12px 36px ${cert.col}18` : "none",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column"
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <Tag label={cert.tag} color={cert.col} />
                  <span style={{ fontSize: 12, color: C.dim }}>{cert.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: C.text }}>{cert.title}</h3>
                <p style={{ fontSize: 13, color: cert.col, fontWeight: 600, marginBottom: 10 }}>{cert.issuer}</p>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{cert.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cert.skills.map(s => (
                    <span key={s} style={{ fontSize: 12, color: C.dim, background: C.surface, border: `1px solid ${C.border}`, padding: "2px 9px", borderRadius: 5 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section {...sec("Skills")} style={{ paddingBottom: 64 }}>
          <SectionTitle text="Skills" col={C.cyan} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
            {SKILLS.map((s, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ height: 3, width: 32, borderRadius: 2, background: s.col, marginBottom: 14 }} />
                <h4 style={{ fontSize: 11, fontWeight: 800, color: C.text, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>{s.cat}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map(it => (
                    <span key={it} style={{ fontSize: 12, color: C.muted, background: C.surface, border: `1px solid ${C.border}`, padding: "3px 9px", borderRadius: 6 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESUME */}
        <section {...sec("Resume")} style={{ paddingBottom: 64 }}>
          <SectionTitle text="Resume" col={C.pink} />
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Chilawo Nchimunya Munene</h3>
                <p style={{ color: C.muted, fontSize: 14 }}>Computer Science · Grambling State University · GPA 3.9/4.0 · Dec 2027</p>
              </div>
              <a href={resumePDF} download="ChilawoMunene-Resume.pdf" style={{ background: `linear-gradient(135deg,${C.purpleD},${C.cyanD})`, color: "#fff", padding: "10px 22px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                ↓ Download PDF
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 28 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.purple, marginBottom: 14 }}>Education</p>
                <ResumeRow main="B.S. Computer Science · GPA 3.9/4.0" sub="Grambling State University · Jan 2024 – Dec 2027" col={C.purple} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.cyan, marginBottom: 14 }}>Experience</p>
                <ResumeRow main="Data Analytics Intern" sub="ERIC · University of Memphis · Jun–Jul 2025" col={C.cyan} />
                <ResumeRow main="Senior Resident Assistant" sub="Grambling State University · Aug 2024–Present" col={C.cyan} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.pink, marginBottom: 14 }}>Honors & Awards</p>
                <ResumeRow main="EICOP 2026 Finalist" col={C.pink} />
                <ResumeRow main="Earl Lester Cole Honors Student" col={C.pink} />
                <ResumeRow main="President's List" col={C.pink} />
                <ResumeRow main="TechWise Fellow" col={C.pink} />
                <ResumeRow main="NASA L'SPACE Scholar" col={C.pink} />
                <ResumeRow main="ColorStack Fellow" col={C.pink} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.purple, marginBottom: 14 }}>Focus Areas</p>
                <ResumeRow main="AI for Health Equity" sub="ML in medical diagnostics" col={C.purple} />
                <ResumeRow main="Social Impact Tech" sub="Technology access & equity" col={C.purple} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section {...sec("Contact")} style={{ paddingBottom: 80 }}>
          <SectionTitle text="Contact" col={C.purple} />
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "48px 32px", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${C.purpleD},${C.cyanD})`, margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✉</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Let's connect</h3>
            <p style={{ color: C.muted, maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.7, fontSize: 15 }}>
              Open to research collaborations, internships, and conversations about AI, data, and social impact.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "Email", href: "mailto:chilawomunene2023@gmail.com", col: C.purple },
                { label: "GitHub", href: "https://github.com/Munya574", col: C.cyan },
                { label: "LinkedIn", href: "https://linkedin.com/in/chilawomunene", col: C.pink }
              ].map(l => (
                <a key={l.label} href={l.href}
                  style={{ padding: "10px 24px", borderRadius: 9, border: `1px solid ${l.col}55`, color: l.col, textDecoration: "none", fontSize: 14, fontWeight: 700, background: l.col + "11" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>

      <footer style={{ borderTop: `1px solid ${C.border}`, textAlign: "center", padding: 20, color: C.dim, fontSize: 13 }}>
        Chilawo Munene · Built with React
      </footer>
    </div>
  );
}
