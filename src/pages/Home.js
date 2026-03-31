import { useState, useEffect, useRef } from "react";

const PROJECT_CATEGORIES = [
  {
    id: "games",
    label: "Games",
    icon: "◈",
    desc: "Interactive games and simulations built in Unity.",
    count: "12 Projects",
    color: "#00d4ff",
  },
  {
    id: "ar",
    label: "AR",
    icon: "◎",
    desc: "Augmented Reality experiences blending digital and physical.",
    count: "3 Projects",
    color: "#00ffcc",
  },
  {
    id: "vr",
    label: "VR",
    icon: "⬡",
    desc: "Immersive Virtual Reality environments and experiences.",
    count: "2 Projects",
    color: "#00aaff",
  },
  {
    id: "interactive",
    label: "Interactive",
    icon: "◉",
    desc: "Hardware integrations, AI-powered apps, and activations.",
    count: "21 Projects",
    color: "#00d4ff",
  },
  {
    id: "workshops",
    label: "Workshops",
    icon: "◈",
    desc: "Educational workshops on game dev, AI art, and creative tech.",
    count: "2 Sessions",
    color: "#00ccff",
  },
];

function useLoopingTypewriter(texts, typingSpeed = 80, deleteSpeed = 50, pauseDuration = 2000) {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts, typingSpeed, deleteSpeed, pauseDuration]);

  return displayedText;
}

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
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
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Home({ navigateTo }) {
  const typed = useLoopingTypewriter([
    "Unity Developer",
    "AR/VR Creator",
    "Game Developer",
    "Interactive Developer",
    "Workshop Instructor"
  ]);
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", color: "#e0f0ff", paddingTop: 80 }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "0 5vw" : "0 10vw",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />
        {/* Glow orb */}
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)",
          top: "50%", left: "40%", transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }} />
        {/* Scanline */}
        <div style={{
          position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
          opacity: 0.03,
        }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: "30%",
            background: "linear-gradient(transparent,rgba(0,212,255,0.4),transparent)",
            animation: "scanline 6s linear infinite",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px",
            border: "1px solid rgba(0,212,255,0.3)",
            marginBottom: 28,
            fontSize: 10, letterSpacing: 4, color: "#00d4ff",
            textTransform: "uppercase",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", animation: "pulse 2s infinite" }} />
            Available for projects
          </div>

          <h1 style={{
            fontSize: "clamp(48px,8vw,100px)",
            fontWeight: 900,
            lineHeight: 0.95,
            marginBottom: 20,
            letterSpacing: -2,
          }}>
            <span style={{ display: "block", color: "rgba(255,255,255,0.9)" }}>Abdullah</span>
            <span style={{
              display: "block",
              color: "#00d4ff",
              textShadow: "0 0 40px rgba(0,212,255,0.5)",
            }}>Badahdah</span>
          </h1>

          <p style={{
            fontSize: "clamp(13px,1.6vw,17px)",
            color: "#00d4ff",
            minHeight: 30,
            marginBottom: 48,
            letterSpacing: 2,
          }}>
            {typed}<span style={{ animation: "blink 1s infinite" }}>_</span>
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => navigateTo("projects", "ar")}
              style={{
                padding: "14px 36px",
                background: "#00d4ff",
                border: "2px solid #00d4ff",
                color: "#060810",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00d4ff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#00d4ff"; e.currentTarget.style.color = "#060810"; }}
            >
              View Projects
            </button>
            <button
              onClick={() => navigateTo("about")}
              style={{
                padding: "14px 36px",
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.color = "#00d4ff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >
              About Me
            </button>
          </div>
        </div>

        {/* Floating stats — right side */}
        <div style={{
          position: "absolute", right: "8vw", bottom: "14vh",
          display: isMobile ? "none" : "flex", 
          flexDirection: "column", gap: 28, zIndex: 2,
        }}>
          {[
            { num: "5+", label: "Years Exp" },
            { num: "40+", label: "Projects" },
            { num: "500+", label: "Students" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#00d4ff", textShadow: "0 0 20px #00d4ff", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "float 2s ease-in-out infinite",
        }}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: "rgba(255,255,255,0.2)" }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #00d4ff, transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT BRIEF ── */}
      <section style={{ padding: isMobile ? "80px 5vw" : "100px 10vw", background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <AnimFadeUp>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>// who i am</div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 32 }} />
          
          <div style={{ maxWidth: 800 }}>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, marginBottom: 24, lineHeight: 1.1 }}>
              Building immersive experiences<br />
              <span style={{ color: "#00d4ff" }}>where tech meets creativity</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
              I'm a software professional with a Computer Engineering degree (3.87 GPA, Highest Honors) from the University of Sharjah.
              I specialize in Unity, AR/VR, and interactive technologies — creating experiences that bridge the digital and physical worlds.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontSize: 15, marginBottom: 32 }}>
              Over 5+ years, I've delivered <span style={{ color: "#00d4ff", fontWeight: 700 }}>40+ projects</span> for major brands like STC, Etisalat, and Saudi Tourism Authority, 
              while teaching <span style={{ color: "#00d4ff", fontWeight: 700 }}>500+ students</span> at cultural festivals across the UAE.
            </p>
            <button
              onClick={() => navigateTo("about")}
              style={{
                background: "none", border: "none",
                color: "#00d4ff", fontSize: 12, letterSpacing: 3,
                fontFamily: "'Courier New', monospace", textTransform: "uppercase",
                padding: 0, display: "flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={(e) => e.currentTarget.style.gap = "18px"}
              onMouseLeave={(e) => e.currentTarget.style.gap = "10px"}
            >
              Learn more →
            </button>
          </div>
        </AnimFadeUp>
      </section>

      {/* ── PROJECT CATEGORIES ── */}
      <section style={{ padding: isMobile ? "80px 5vw" : "100px 10vw" }}>
        <AnimFadeUp>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>// explore work</div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 16 }} />
          <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, marginBottom: 56, lineHeight: 1.1 }}>Projects</h2>
        </AnimFadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: 2 }}>
          {PROJECT_CATEGORIES.map((cat, i) => (
            <AnimFadeUp key={cat.id} delay={i * 0.08}>
              <button
                onClick={() => navigateTo("projects", cat.id)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: "100%",
                  background: hovered === cat.id ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${hovered === cat.id ? "rgba(0,212,255,0.5)" : "rgba(0,212,255,0.1)"}`,
                  padding: "32px 28px",
                  textAlign: "left",
                  fontFamily: "'Courier New', monospace",
                  color: "#e0f0ff",
                  transition: "all 0.3s ease",
                  transform: hovered === cat.id ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hovered === cat.id ? "0 12px 40px rgba(0,212,255,0.1)" : "none",
                }}
              >
                <div style={{
                  fontSize: 28,
                  color: "#00d4ff",
                  textShadow: hovered === cat.id ? "0 0 20px #00d4ff" : "none",
                  marginBottom: 16,
                  transition: "text-shadow 0.3s",
                }}>
                  {cat.icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 16 }}>
                  {cat.desc}
                </div>
                <div style={{
                  fontSize: 10,
                  color: hovered === cat.id ? "#00d4ff" : "rgba(255,255,255,0.25)",
                  letterSpacing: 3,
                  transition: "color 0.3s",
                }}>
                  {cat.count.toUpperCase()}
                </div>
              </button>
            </AnimFadeUp>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        padding: "36px 10vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ color: "#00d4ff", fontWeight: 700, letterSpacing: 4, fontSize: 14, textShadow: "0 0 15px #00d4ff" }}>XOiRDz</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>
          © 2026 ABDULLAH BADAHDAH — BUILT WITH REACT
        </div>
      </footer>
    </div>
  );
}