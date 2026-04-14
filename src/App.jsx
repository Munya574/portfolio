import { useState, useEffect, useRef } from "react";
import heroImg from "./assets/hero.png";

const C = {
  bg: "#08080e", surface: "#0f0f1c", card: "#14142a", border: "#1e1e3a",
  purple: "#a78bfa", purpleD: "#6d28d9", cyan: "#67e8f9", cyanD: "#0e7490",
  pink: "#f9a8d4", pinkD: "#9d174d", text: "#e2e8f0", muted: "#94a3b8", dim: "#475569"
};

const NAV = ["About", "Projects", "Certifications", "Skills", "Resume", "Contact"];

const PROJECTS = [
  {
    title: "Mementoria",
    desc: "A full-stack scrapbook app where users preserve memories through audio recordings, written entries, and photo uploads. Designed around personal storytelling and intuitive UX.",
    details: "Mementoria is a full-stack web application built to help people preserve and revisit their most meaningful memories. Users can create entries combining audio recordings, written reflections, and photo uploads into a cohesive scrapbook experience. The app features a clean, intuitive interface that prioritizes emotional resonance over complexity. Built with React on the frontend and Firebase for real-time data storage, user authentication, and file storage.",
    tech: ["React", "Node.js", "Firebase"],
    github: "https://github.com/YOUR_USERNAME/mementoria",
    tag: "Web App", col: C.purple,
    images: []
  },
  {
    title: "Breast Cancer Detection Model",
    desc: "A machine learning classifier trained on clinical data to detect breast cancer diagnoses. Explored feature engineering, evaluation metrics, and the ethical stakes of AI in healthcare.",
    details: "This machine learning project implements a binary classifier for breast cancer detection using clinical data. The model explores multiple algorithms — logistic regression, decision trees, and support vector machines — with careful attention to precision/recall tradeoffs. In medical diagnostics, the cost of false negatives shapes the entire modeling strategy. The project also includes a written reflection on the ethical implications of deploying AI in healthcare settings.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    github: "https://github.com/YOUR_USERNAME/breast-cancer-detection",
    tag: "Machine Learning", col: C.cyan,
    images: []
  },
  {
    title: "City Leadership Analytics",
    desc: "Data analytics research at the University of Memphis analyzing organizational leadership patterns in city programs. Surfaced actionable insights from complex datasets using visualization tools.",
    details: "During my data analytics internship at the University of Memphis, I analyzed organizational leadership patterns across city government programs. The project involved cleaning real-world datasets, building EDA pipelines in Python, and developing interactive Tableau dashboards that surfaced actionable insights for stakeholders. Key findings highlighted disparities in leadership composition and helped inform more equitable program management strategies.",
    tech: ["Python", "Tableau", "Excel", "R"],
    github: "https://github.com/YOUR_USERNAME/city-leadership-analytics",
    tag: "Data Analytics", col: C.pink,
    images: []
  },
  {
    title: "DEI in Tech Research",
    desc: "Faculty-supervised research examining diversity, equity, and inclusion trends in the technology sector — combining qualitative synthesis with data-driven analysis.",
    details: "Faculty-supervised research at Grambling State University examining DEI trends across the technology industry. The work combines systematic literature review with quantitative analysis of workforce demographics, hiring pipelines, and retention rates at major tech firms. Findings were compiled into a formal research report documenting structural barriers and evidence-based interventions for improving DEI outcomes in STEM.",
    tech: ["Python", "Data Analysis", "Research Methods"],
    github: "https://github.com/YOUR_USERNAME/dei-research",
    tag: "Research", col: C.purple,
    images: []
  }
];

const CERTIFICATIONS = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    desc: "Comprehensive training in data analysis, visualization, and storytelling using industry tools.",
    details: "This professional certificate covers the full data analytics workflow — from asking the right questions and cleaning messy data to building visualizations and communicating findings. Completed 8 courses covering spreadsheets, SQL, R, Tableau, and data storytelling. Practical projects simulated real-world analyst scenarios across multiple industries.",
    tag: "Data Analytics",
    col: C.cyan,
    skills: ["SQL", "R", "Tableau", "Spreadsheets", "Data Visualization"],
    credential: "#",
    images: []
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM / Coursera",
    date: "2023",
    desc: "Hands-on machine learning covering supervised and unsupervised learning with Python.",
    details: "Deep hands-on experience with core machine learning algorithms using Python and scikit-learn. Topics included regression, classification, clustering, dimensionality reduction, and model evaluation. Completed real-world projects including a cancer diagnosis classifier and a customer segmentation model — work that directly informed my Breast Cancer Detection project.",
    tag: "Machine Learning",
    col: C.purple,
    skills: ["Python", "scikit-learn", "NumPy", "Pandas", "Matplotlib"],
    credential: "#",
    images: []
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "2024",
    desc: "Foundational AWS cloud concepts including core services, security, and cloud economics.",
    details: "This foundational AWS course covers cloud computing concepts, AWS global infrastructure, core services (EC2, S3, RDS, Lambda), security best practices, and cloud pricing models. Provides the knowledge base needed to understand how modern cloud deployments work and how AI/ML services like SageMaker fit into the broader cloud ecosystem.",
    tag: "Cloud",
    col: C.pink,
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "IAM"],
    credential: "#",
    images: []
  }
];

const SKILLS = [
  { cat: "Languages", items: ["Python", "JavaScript", "Java", "SQL", "R", "C++"], col: C.purple },
  { cat: "AI & Machine Learning", items: ["scikit-learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib", "Jupyter"], col: C.cyan },
  { cat: "Web Development", items: ["React", "Node.js", "HTML/CSS", "Firebase"], col: C.pink },
  { cat: "Tools", items: ["Git", "GitHub", "Tableau", "Excel", "VS Code", "Vercel"], col: C.purple }
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
          {isProject && (
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

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [hovered, setHovered] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
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

      {/* MODAL */}
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}

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
              <p style={{ color: C.cyan, fontSize: 13, fontWeight: 700, letterSpacing: 2.5, marginBottom: 14 }}>Hello, I'm Chilawo. You can call me 'Munya' if you prefer. Let me share a bit about myself! </p>
              <h1 style={{ fontSize: "clamp(2.2rem,5.5vw,4rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: 20 }}>
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
            <div style={{ flexShrink: 0, position: "relative" }}>
              {/* Glow ring behind photo */}
              <div style={{
                position: "absolute", inset: -4,
                borderRadius: "50%",
                background: `conic-gradient(${C.purple}, ${C.cyan}, ${C.pink}, ${C.purple})`,
                zIndex: 0
              }} />
              <div style={{
                position: "relative", zIndex: 1,
                width: 200, height: 200,
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
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Chilawo Musonda</h3>
                <p style={{ color: C.muted, fontSize: 14 }}>Computer Science · Grambling State University · Expected 2026</p>
              </div>
              <a href="#" style={{ background: `linear-gradient(135deg,${C.purpleD},${C.cyanD})`, color: "#fff", padding: "10px 22px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                ↓ Download PDF
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 28 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.purple, marginBottom: 14 }}>Education</p>
                <ResumeRow main="B.S. Computer Science" sub="Grambling State University · Strong GPA" col={C.purple} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.cyan, marginBottom: 14 }}>Experience</p>
                <ResumeRow main="Data Analytics Intern" sub="University of Memphis" col={C.cyan} />
                <ResumeRow main="Senior Resident Assistant" sub="Grambling State University" col={C.cyan} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, color: C.pink, marginBottom: 14 }}>Research</p>
                <ResumeRow main="DEI in Tech" sub="Faculty-supervised · GSU" col={C.pink} />
                <ResumeRow main="HEART-GeN Scholar (Applied)" sub="Northwestern Feinberg" col={C.pink} />
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
                { label: "Email", href: "mailto:your@email.com", col: C.purple },
                { label: "GitHub", href: "https://github.com/YOUR_USERNAME", col: C.cyan },
                { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_PROFILE", col: C.pink }
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
