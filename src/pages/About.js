import { useState, useEffect, useRef } from "react";

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

function AnimFadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const SKILLS = [
  {
    category: "Game & Interactive Development",
    items: ["Unity 3D", "C#", "Game Design", "Blender", "Physics Simulations"],
  },
  {
    category: "AR/VR Technologies",
    items: ["ARCore", "ARKit", "Vuforia", "VR Development", "360° Videos"],
  },
  {
    category: "Web & Creative",
    items: ["React", "JavaScript", "Web Design", "UI/UX", "Responsive Design"],
  },
  {
    category: "Hardware & IoT",
    items: ["Arduino", "Custom Controllers", "Sensor Integration", "Electronics"],
  },
  {
    category: "AI & Emerging Tech",
    items: ["AI Art Generation", "ChatGPT Integration", "Prompt Engineering", "Computer Vision"],
  },
];

const SOCIALS = [
  { label: "GitHub", value: "github.com/XOiRDz", link: "https://github.com/XOiRDz" },
  { label: "Email", value: "a.f.bahemdan@gmail.com", link: "mailto:a.f.bahemdan@gmail.com" },
  { label: "Phone", value: "+971 54 511 7090", link: "tel:+971545117090" },
  { label: "Portfolio Drive", value: "Google Drive Collection", link: "https://drive.google.com/your-link" },
];

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const typedRoles = useLoopingTypewriter([
    "Unity Developer",
    "AR/VR Creator", 
    "Workshop Instructor",
    "Interactive Developer",
    "Game Designer"
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", color: "#e0f0ff", paddingTop: 80 }}>
      {/* ── INTRO ── */}
      <section style={{ padding: isMobile ? "80px 5vw" : "90px 10vw", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div>
          <AnimFadeUp>
            <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>
              // about me
            </div>
            <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 32 }} />
          </AnimFadeUp>

          <AnimFadeUp delay={0.1}>
            <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, marginBottom: 20, lineHeight: 1 }}>
              Abdullah Badahdah
            </h1>
          </AnimFadeUp>

          <AnimFadeUp delay={0.2}>
            <p style={{ 
              fontSize: "clamp(16px,2vw,20px)", 
              color: "#00d4ff", 
              marginBottom: 40,
              minHeight: 32,
              letterSpacing: 1,
            }}>
              {typedRoles}<span style={{ animation: "blink 1s infinite" }}>_</span>
            </p>
          </AnimFadeUp>

          <AnimFadeUp delay={0.3}>
            <div style={{ maxWidth: 700 }}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
                I'm a software professional specializing in Unity, AR/VR, and interactive technologies. 
                With a Computer Engineering degree (3.87 GPA, Highest Honors) from the University of Sharjah, 
                I create immersive experiences that blend technology with creativity.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
                Over the past 5+ years, I've delivered <span style={{ color: "#00d4ff", fontWeight: 700 }}>40+ projects</span> across 
                games, AR/VR experiences, and interactive activations for major brands like STC, Etisalat, and Saudi Tourism Authority.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.7)" }}>
                Beyond building, I teach — having conducted workshops for <span style={{ color: "#00d4ff", fontWeight: 700 }}>500+ students</span> at 
                major cultural festivals including Sharjah Children's Reading Festival and SIBF, making complex technology 
                accessible and exciting for all ages.
              </p>
            </div>
          </AnimFadeUp>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section style={{ padding: isMobile ? "60px 5vw" : "80px 10vw", background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <AnimFadeUp>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>
            // technical skills
          </div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 48 }} />
        </AnimFadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: 16 }}>
          {SKILLS.map((skill, i) => (
            <AnimFadeUp key={skill.category} delay={i * 0.08}>
              <div
                onMouseEnter={() => setHoveredSkill(skill.category)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  background: hoveredSkill === skill.category ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${hoveredSkill === skill.category ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.1)"}`,
                  padding: "24px 20px",
                  transition: "all 0.3s",
                }}
              >
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "#00d4ff", letterSpacing: 1 }}>
                  {skill.category}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {skill.items.map((item) => (
                    <li key={item} style={{ 
                      fontSize: 12, 
                      color: "rgba(255,255,255,0.6)", 
                      marginBottom: 8,
                      paddingLeft: 12,
                      position: "relative",
                    }}>
                      <span style={{ position: "absolute", left: 0, color: "#00d4ff" }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimFadeUp>
          ))}
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section style={{ padding: isMobile ? "60px 5vw" : "80px 10vw" }}>
        <AnimFadeUp>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 48 }}>
            // by the numbers
          </div>
        </AnimFadeUp>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 40 }}>
          {[
            { num: "40+", label: "Projects Delivered" },
            { num: "5+", label: "Years Experience" },
            { num: "500+", label: "Students Taught" },
            { num: "3.87", label: "GPA • Highest Honors" },
          ].map((stat, i) => (
            <AnimFadeUp key={stat.label} delay={i * 0.1}>
              <div style={{ textAlign: isMobile ? "left" : "center" }}>
                <div style={{ 
                  fontSize: "clamp(36px,4vw,48px)", 
                  fontWeight: 900, 
                  color: "#00d4ff", 
                  textShadow: "0 0 20px rgba(0,212,255,0.5)", 
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </div>
            </AnimFadeUp>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ padding: isMobile ? "60px 5vw" : "80px 10vw", background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <AnimFadeUp>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>
            // education
          </div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 32 }} />
        </AnimFadeUp>

        <AnimFadeUp delay={0.1}>
          <div style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(0,212,255,0.2)",
            padding: isMobile ? "24px 20px" : "32px 40px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                  B.Sc. Computer Engineering
                </h3>
                <p style={{ fontSize: 14, color: "#00d4ff" }}>University of Sharjah</p>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>
                2014 - 2019
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              GPA: 3.87 • Highest Honors • Dean's List
            </p>
          </div>
        </AnimFadeUp>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ padding: isMobile ? "60px 5vw" : "80px 10vw" }}>
        <AnimFadeUp>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", textTransform: "uppercase", marginBottom: 8 }}>
            // get in touch
          </div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 40 }} />
        </AnimFadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: 2 }}>
          {SOCIALS.map((social, i) => (
            <AnimFadeUp key={social.label} delay={i * 0.08}>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  display: "block",
                  background: hoveredSocial === social.label ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${hoveredSocial === social.label ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.1)"}`,
                  padding: "20px 24px",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
              >
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                  {social.label}
                </div>
                <div style={{ fontSize: 13, color: hoveredSocial === social.label ? "#00d4ff" : "rgba(255,255,255,0.8)", transition: "color 0.3s" }}>
                  {social.value}
                </div>
              </a>
            </AnimFadeUp>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        padding: "36px 10vw",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ color: "#00d4ff", fontWeight: 700, letterSpacing: 4, fontSize: 14, textShadow: "0 0 15px #00d4ff" }}>
          XOiRDz
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>
          © 2025 ABDULLAH BADAHDAH
        </div>
      </footer>
    </div>
  );
}