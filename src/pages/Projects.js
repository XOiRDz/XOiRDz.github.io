import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "3d", label: "3D" },
  { id: "ar", label: "AR" },
  { id: "vr", label: "VR" },
  { id: "interactive", label: "Interactive Apps" },
  { id: "workshops", label: "Workshops" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Virtual City Simulation",
    category: "3d",
    categoryLabel: "3D",
    tech: ["Unity", "Photon Fusion", "C#"],
    year: "2023",
    desc: "Multi-user virtual environment where users explore city buildings and communicate via built-in chat. Features synchronized movement, scene streaming, and coordinated multi-user interactions.",
    link: "https://drive.google.com/drive/folders/1-XwF3guIBGSqxJtoIV_mKfByUHIylbB9?usp=sharing",
    image: null,
    featured: true,
  },
  {
    id: 2,
    title: "AI Photobooth",
    category: "interactive",
    categoryLabel: "Interactive",
    tech: ["Unity", "OpenAI API", "C#"],
    year: "2023",
    desc: "Interactive photobooth capturing photos and generating AI-edited versions with custom prompts, backgrounds, and character styles using real-time face-swap integration.",
    link: "https://drive.google.com/drive/folders/1-XwF3guIBGSqxJtoIV_mKfByUHIylbB9?usp=sharing",
    image: null,
    featured: true,
  },
  {
    id: 3,
    title: "ChatGPT Unity Integration",
    category: "interactive",
    categoryLabel: "Interactive",
    tech: ["Unity", "ChatGPT API", "Voice SDK"],
    year: "2023",
    desc: "Research project featuring both text-to-text and voice-to-voice AI chatbot integrated directly into a Unity environment.",
    link: null,
    image: null,
  },
  {
    id: 4,
    title: "Smart Home Control System",
    category: "interactive",
    categoryLabel: "Interactive",
    tech: ["Arduino", "C++", "Sensors"],
    year: "2021",
    desc: "Embedded system to control lights, air conditioning, and doors using hardware sensors and real-time response.",
    link: null,
    image: null,
  },
  {
    id: 5,
    title: "Teacher Attendance App",
    category: "interactive",
    categoryLabel: "Interactive",
    tech: ["Android", "Java", "Firebase"],
    year: "2020",
    desc: "Mobile app letting students check if professors are currently available in their office in real time.",
    link: null,
    image: null,
  },
  {
    id: 6,
    title: "Eyes Wide Open",
    category: "3d",
    categoryLabel: "3D",
    tech: ["Unity", "C#", "Particle System"],
    year: "2021",
    desc: "Contributed mechanics and particle programming for this immersive 3D experience project.",
    link: null,
    image: null,
  },
  {
    id: 7,
    title: "Unalterable",
    category: "3d",
    categoryLabel: "3D",
    tech: ["Unity", "C#"],
    year: "2021",
    desc: "A puzzle story-based game demo featuring interlocking mechanics and narrative-driven gameplay.",
    link: null,
    image: null,
  },
  {
    id: 8,
    title: "Game Development Workshops",
    category: "workshops",
    categoryLabel: "Workshops",
    tech: ["Scratch", "Unity", "Ct.js"],
    year: "2024–2025",
    desc: "Delivered engaging game development workshops for participants aged 8–20 at major cultural events including SIBF and Sharjah Children's Reading Festival.",
    link: "https://drive.google.com/drive/folders/15pF3bFcFEQpS04VPpn_NAXB8odE3ADtZ?usp=sharing",
    image: null,
    featured: true,
  },
  {
    id: 9,
    title: "AI Visual Arts Workshop",
    category: "workshops",
    categoryLabel: "Workshops",
    tech: ["AI Tools", "Midjourney", "Stable Diffusion"],
    year: "2024–2025",
    desc: "Workshops on AI-generated art and 3D character creation using AI tools for children and teens at cultural festivals.",
    link: "https://drive.google.com/drive/folders/15pF3bFcFEQpS04VPpn_NAXB8odE3ADtZ?usp=sharing",
    image: null,
  },
  {
    id: 10,
    title: "Arduino Electronics Workshop",
    category: "workshops",
    categoryLabel: "Workshops",
    tech: ["Arduino", "Electronics", "C++"],
    year: "2024",
    desc: "Hands-on Arduino and electronics workshops enabling participants to build real working hardware projects.",
    link: "https://drive.google.com/drive/folders/15pF3bFcFEQpS04VPpn_NAXB8odE3ADtZ?usp=sharing",
    image: null,
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
        background: hovered ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.01)",
        border: `1px solid ${hovered ? "rgba(0,212,255,0.45)" : "rgba(0,212,255,0.1)"}`,
        overflow: "hidden",
        transition: `all 0.3s ease, opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
        boxShadow: hovered ? "0 16px 48px rgba(0,212,255,0.1)" : "none",
      }}
    >
      {/* Image placeholder */}
      <div style={{
        height: 180,
        background: "rgba(0,212,255,0.04)",
        borderBottom: "1px solid rgba(0,212,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          fontSize: 48, opacity: 0.15,
          fontFamily: "'Courier New', monospace",
          color: "#00d4ff",
        }}>
          {{ "3d": "◈", ar: "◎", vr: "⬡", interactive: "◉", workshops: "◈" }[project.category]}
        </div>
        {project.image && (
          <img src={project.image} alt={project.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        {!project.image && (
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            fontSize: 9, color: "rgba(0,212,255,0.4)", letterSpacing: 2, border: "1px solid rgba(0,212,255,0.2)", padding: "3px 8px",
          }}>
            IMG COMING SOON
          </div>
        )}
        {project.featured && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            fontSize: 9, letterSpacing: 2, color: "#060810",
            background: "#00d4ff", padding: "3px 10px", fontFamily: "'Courier New', monospace",
          }}>
            FEATURED
          </div>
        )}
      </div>

      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{
            fontSize: 9, letterSpacing: 3, color: "#00d4ff",
            border: "1px solid rgba(0,212,255,0.3)", padding: "3px 10px",
            textTransform: "uppercase",
          }}>
            {project.categoryLabel}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>{project.year}</span>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>{project.title}</h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 16 }}>{project.desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              fontSize: 9, padding: "3px 10px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)", letterSpacing: 1,
            }}>{t}</span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 10, color: hovered ? "#00d4ff" : "rgba(255,255,255,0.3)",
              letterSpacing: 3, textDecoration: "none", textTransform: "uppercase",
              transition: "color 0.3s",
            }}
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", color: "#e0f0ff", paddingTop: 80 }}>
      <section style={{ padding: "80px 10vw 100px" }}>

        {/* Header */}
        <div style={{
          opacity: 1,
          animation: "fadeUp 0.7s ease both",
          marginBottom: 60,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", marginBottom: 8 }}>// my work</div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 24 }} />
          <h1 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, lineHeight: 1, marginBottom: 16 }}>Projects</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, maxWidth: 500, lineHeight: 1.7 }}>
            A collection of interactive experiences, games, AR/VR experiments, and educational workshops.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: "flex", gap: 2, flexWrap: "wrap",
          marginBottom: 48,
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          paddingBottom: 0,
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? "2px solid #00d4ff" : "2px solid transparent",
                  color: isActive ? "#00d4ff" : "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  letterSpacing: 2,
                  padding: "10px 20px",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                  transition: "all 0.25s",
                  textShadow: isActive ? "0 0 10px #00d4ff" : "none",
                  marginBottom: -1,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(0,212,255,0.7)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                {cat.label}
                <span style={{
                  marginLeft: 8, fontSize: 9,
                  color: isActive ? "#00d4ff" : "rgba(255,255,255,0.2)",
                  fontWeight: 400,
                }}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.25)", fontSize: 13, letterSpacing: 3 }}>
            NO PROJECTS YET IN THIS CATEGORY
          </div>
        )}
      </section>

      <footer style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        padding: "36px 10vw",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ color: "#00d4ff", fontWeight: 700, letterSpacing: 4, fontSize: 14, textShadow: "0 0 15px #00d4ff" }}>XOiRDz</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>© 2025 ABDULLAH BADAHDAH</div>
      </footer>
    </div>
  );
}