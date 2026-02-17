import { useState, useRef, useEffect } from "react";

const EXPERIENCES = [
  {
    role: "Workshop Instructor & Interactive Experiences Developer",
    company: "Freelance",
    period: "Jan 2025 – Present",
    type: "CURRENT",
    desc: "Delivering workshops on AI visual arts, game development (Unity, Scratch, Ct.js), Arduino, and digital skills for children to adults. Collaborated with Sharjah Children's Reading Festival, SIBF, and Japanese Entertainment Exhibition.",
    highlights: ["AI Visual Arts", "Game Dev Workshops", "Arduino Projects", "500+ Students"],
    link: "https://drive.google.com/drive/folders/15pF3bFcFEQpS04VPpn_NAXB8odE3ADtZ?usp=sharing",
  },
  {
    role: "Senior Unity Developer",
    company: "Rayqube Future Tech",
    period: "Aug 2022 – Dec 2024",
    type: "FULLTIME",
    desc: "Led short and long-term event activations, serving as main point of contact with clients. Led a team of 4 developers in an Agile environment, improving delivery timelines by 15%. Integrated Unity with Arduino, Kinect, and Web APIs.",
    highlights: ["Team Lead (4 devs)", "AR/VR Development", "Arduino + Kinect", "+15% Delivery Speed"],
    link: "https://drive.google.com/drive/folders/1-XwF3guIBGSqxJtoIV_mKfByUHIylbB9?usp=sharing",
  },
  {
    role: "Game & Web Developer",
    company: "Freelance",
    period: "Aug 2019 – Jun 2022",
    type: "FREELANCE",
    desc: "Built games, 3D models, and web applications. Developed mechanics for 'Eyes Wide Open', created puzzle game 'Unalterable', and built customer registration apps with Firebase.",
    highlights: ["Unity Games", "3D Modelling", "Web Apps", "Firebase"],
    link: null,
  },
  {
    role: "Network Engineer Lab Assistant",
    company: "University of Sharjah",
    period: "Jan 2018 – May 2019",
    type: "PART-TIME",
    desc: "Co-instructed Networks lab curriculum for 30+ undergraduate students. Prepared and troubleshot lab environments achieving a 100% success rate for all scheduled experiments.",
    highlights: ["30+ Students", "100% Success Rate", "Lab Setup", "Networking"],
    link: null,
  },
];

const SKILLS_ALL = [
  { category: "Game & Interactive", items: ["Unity", "Photon Fusion", "Godot", "Blender", "Doween", "AR/VR", "Kinect"] },
  { category: "Web & Creative", items: ["HTML", "CSS", "JavaScript", "PHP", "React", "Photoshop", "Wix"] },
  { category: "Programming", items: ["C#", "C++", "Python", "Java"] },
  { category: "Hardware & IoT", items: ["Arduino", "Firebase", "Sensors", "Embedded Systems"] },
  { category: "AI & Research", items: ["OpenAI API", "Stable Diffusion", "Midjourney", "ChatGPT Integration"] },
];

const INTERESTS = [
  { icon: "🎮", label: "Game Development", desc: "Building worlds and interactive experiences in Unity and Godot." },
  { icon: "🤖", label: "AI & Generative Art", desc: "Exploring how AI reshapes creative workflows and art production." },
  { icon: "🔧", label: "Hardware Tinkering", desc: "Arduino projects, sensors, and bringing digital logic to the physical world." },
  { icon: "🎓", label: "Teaching & Mentoring", desc: "Making tech fun and accessible for the next generation of creators." },
  { icon: "🌍", label: "Cultural Festivals", desc: "Bringing interactive tech experiences to major public events across the UAE." },
];

const SOCIALS = [
  { label: "GitHub", handle: "github.com/XOiRDz", href: "https://github.com/XOiRDz", icon: "⌥" },
  { label: "Email", handle: "a.f.bahemdan@gmail.com", href: "mailto:a.f.bahemdan@gmail.com", icon: "✉" },
  { label: "Phone", handle: "+971 545117090", href: "tel:0545117090", icon: "☏" },
  { label: "Work Portfolio", handle: "Google Drive", href: "https://drive.google.com/drive/folders/15pF3bFcFEQpS04VPpn_NAXB8odE3ADtZ?usp=sharing", icon: "◈" },
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

function AnimFadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title }) {
  return (
    <AnimFadeUp style={{ marginBottom: 52 }}>
      <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 20 }} />
      <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 900 }}>{title}</h2>
    </AnimFadeUp>
  );
}

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [activeExp, setActiveExp] = useState(0);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", color: "#e0f0ff", paddingTop: 80 }}>

      {/* ── INTRO BANNER ── */}
      <section style={{
        padding: "80px 10vw 80px",
        position: "relative",
        borderBottom: "1px solid rgba(0,212,255,0.08)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", marginBottom: 8 }}>// about me</div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 28 }} />
          <h1 style={{ fontSize: "clamp(36px,5.5vw,70px)", fontWeight: 900, lineHeight: 1, marginBottom: 28 }}>
            I build things that<br />
            <span style={{ color: "#00d4ff", textShadow: "0 0 30px rgba(0,212,255,0.4)" }}>feel alive.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: 15, maxWidth: 680, marginBottom: 16 }}>
            I'm Abdullah — a software developer, workshop instructor, and interactive experience creator based in the UAE.
            I graduated with a Computer Engineering degree from the University of Sharjah with a 3.87 GPA and Highest Honors.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: 15, maxWidth: 680 }}>
            My passion is making technology accessible and exciting — whether that's building a VR world for a festival,
            leading a Unity dev team, or teaching a 10-year-old how to make their first game.
          </p>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      <section style={{ padding: "90px 10vw", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
        <SectionHeader label="// career" title="Experience" />

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40 }}>
          {/* Left: list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {EXPERIENCES.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveExp(i)}
                style={{
                  background: activeExp === i ? "rgba(0,212,255,0.08)" : "none",
                  border: "none",
                  borderLeft: `2px solid ${activeExp === i ? "#00d4ff" : "rgba(0,212,255,0.15)"}`,
                  padding: "14px 18px",
                  textAlign: "left",
                  fontFamily: "'Courier New', monospace",
                  color: activeExp === i ? "#00d4ff" : "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  letterSpacing: 1,
                  transition: "all 0.25s",
                  lineHeight: 1.5,
                }}
                onMouseEnter={(e) => { if (activeExp !== i) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={(e) => { if (activeExp !== i) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                <div style={{ fontSize: 9, letterSpacing: 2, marginBottom: 4, color: activeExp === i ? "#00d4ff" : "rgba(255,255,255,0.25)" }}>
                  {exp.type}
                </div>
                <div style={{ fontWeight: activeExp === i ? 700 : 400, fontSize: 12 }}>{exp.company}</div>
              </button>
            ))}
          </div>

          {/* Right: details */}
          <AnimFadeUp key={activeExp} delay={0}>
            <div style={{
              background: "rgba(0,212,255,0.03)",
              border: "1px solid rgba(0,212,255,0.15)",
              padding: 36,
            }}>
              <div style={{ fontSize: 10, color: "#00d4ff", letterSpacing: 3, marginBottom: 8 }}>
                {EXPERIENCES[activeExp].period}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{EXPERIENCES[activeExp].role}</h3>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
                {EXPERIENCES[activeExp].company}
              </div>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: 14, marginBottom: 24 }}>
                {EXPERIENCES[activeExp].desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: EXPERIENCES[activeExp].link ? 20 : 0 }}>
                {EXPERIENCES[activeExp].highlights.map((h) => (
                  <span key={h} style={{
                    fontSize: 10, padding: "5px 12px",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#00d4ff", letterSpacing: 1,
                  }}>{h}</span>
                ))}
              </div>
              {EXPERIENCES[activeExp].link && (
                <a
                  href={EXPERIENCES[activeExp].link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 10, color: "#00d4ff", letterSpacing: 3, textDecoration: "none" }}
                >
                  VIEW WORK SAMPLES →
                </a>
              )}
            </div>
          </AnimFadeUp>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section style={{ padding: "90px 10vw", background: "rgba(0,212,255,0.015)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
        <SectionHeader label="// toolkit" title="Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 16 }}>
          {SKILLS_ALL.map((group, gi) => (
            <AnimFadeUp key={group.category} delay={gi * 0.07}>
              <div style={{
                border: "1px solid rgba(0,212,255,0.12)",
                borderTop: "2px solid #00d4ff",
                padding: "22px 20px",
                background: "rgba(0,212,255,0.02)",
              }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#00d4ff", textTransform: "uppercase", marginBottom: 14 }}>
                  {group.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        fontSize: 11,
                        padding: "4px 12px",
                        border: `1px solid ${hoveredSkill === skill ? "#00d4ff" : "rgba(255,255,255,0.1)"}`,
                        color: hoveredSkill === skill ? "#00d4ff" : "rgba(255,255,255,0.55)",
                        transition: "all 0.2s",
                        boxShadow: hoveredSkill === skill ? "0 0 10px rgba(0,212,255,0.2)" : "none",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimFadeUp>
          ))}
        </div>
      </section>

      {/* ── INTERESTS ── */}
      <section style={{ padding: "90px 10vw", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
        <SectionHeader label="// beyond work" title="Interests & Passions" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 2 }}>
          {INTERESTS.map((item, i) => (
            <AnimFadeUp key={item.label} delay={i * 0.07}>
              <div style={{
                padding: "28px 24px",
                border: "1px solid rgba(0,212,255,0.08)",
                background: "rgba(255,255,255,0.01)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "rgba(255,255,255,0.9)" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </AnimFadeUp>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ padding: "90px 10vw", background: "rgba(0,212,255,0.015)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
        <SectionHeader label="// background" title="Education" />
        <AnimFadeUp>
          <div style={{
            border: "1px solid rgba(0,212,255,0.2)",
            borderLeft: "3px solid #00d4ff",
            padding: "32px 36px",
            background: "rgba(0,212,255,0.03)",
            maxWidth: 600,
          }}>
            <div style={{ fontSize: 10, color: "#00d4ff", letterSpacing: 3, marginBottom: 10 }}>2015 – 2020</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Bachelor of Computer Engineering</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>University of Sharjah, UAE</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#00d4ff", textShadow: "0 0 20px #00d4ff" }}>3.87</div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.35)" }}>GPA</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(0,212,255,0.2)", paddingLeft: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#00d4ff", marginBottom: 4 }}>Highest Honors</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                  Excellent coursework in programming,<br />networking, and embedded systems
                </div>
              </div>
            </div>
          </div>
        </AnimFadeUp>
      </section>

      {/* ── CONNECT / SOCIAL ── */}
      <section style={{ padding: "90px 10vw" }}>
        <SectionHeader label="// find me" title="Let's Connect" />
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8, marginBottom: 40, maxWidth: 500 }}>
          Whether you want to collaborate on a project, book a workshop, or just say hi — reach out through any of the channels below.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 2 }}>
          {SOCIALS.map((s, i) => (
            <AnimFadeUp key={s.label} delay={i * 0.07}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 24px",
                  border: `1px solid ${hoveredSocial === s.label ? "rgba(0,212,255,0.5)" : "rgba(0,212,255,0.1)"}`,
                  background: hoveredSocial === s.label ? "rgba(0,212,255,0.06)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.25s",
                  transform: hoveredSocial === s.label ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 5, textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 13, color: hoveredSocial === s.label ? "#00d4ff" : "rgba(255,255,255,0.7)", transition: "color 0.25s" }}>
                    {s.handle}
                  </div>
                </div>
                <div style={{
                  fontSize: 18, color: hoveredSocial === s.label ? "#00d4ff" : "rgba(255,255,255,0.2)",
                  transition: "color 0.25s, text-shadow 0.25s",
                  textShadow: hoveredSocial === s.label ? "0 0 15px #00d4ff" : "none",
                }}>
                  {s.icon}
                </div>
              </a>
            </AnimFadeUp>
          ))}
        </div>
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