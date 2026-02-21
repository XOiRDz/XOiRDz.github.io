import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const CATEGORIES = [
  { id: "games", label: "Games" },
  { id: "ar", label: "AR" },
  { id: "vr", label: "VR" },
  { id: "interactive", label: "Interactive" },
  { id: "workshops", label: "Workshops" },
  { id: "websites", label: "Websites" },
];

const ALL_TAGS = [
  "Activation", "Custom Hardware", "Multiple Screens", "Touch Screen",
  "Photobooth", "AI", "Simulation", "Multiplayer", "Touch & Throw", "Gitex"
];

const PROJECTS = [
  // ── GAMES ──
  { id: 1, title: "Count up", category: "games", tags: [], year: "2020", desc: "Interactive counting game experience.", image: null, media: null, mediaType: "image" },
  { id: 2, title: "Lost Player", category: "games", tags: [], year: "2020", desc: "Puzzle-based exploration game.", image: null, media: null, mediaType: "image" },
  { id: 3, title: "My Journey to Mars", category: "games", tags: [], year: "2021", desc: "Space adventure game with exploration mechanics.", image: null, media: null, mediaType: "gif" },
  { id: 4, title: "Space out", category: "games", tags: [], year: "2021", desc: "Space-themed arcade game.", image: null, media: null, mediaType: "gif" },
  { id: 5, title: "Time Spacer", category: "games", tags: [], year: "2021", desc: "Time manipulation puzzle game.", image: null, media: null, mediaType: "gif" },
  { id: 6, title: "Unalterable", category: "games", tags: [], year: "2021", desc: "Story-driven puzzle game with narrative mechanics.", image: null, media: null, mediaType: "gif" },
  { id: 7, title: "Vortax", category: "games", tags: [], year: "2021", desc: "Fast-paced action game.", image: null, media: null, mediaType: "gif" },
  { id: 8, title: "15 Puzzle", category: "games", tags: [], year: "2020", desc: "Classic sliding puzzle game reimagined.", image: null, media: null, mediaType: "image" },
  { id: 9, title: "Al Taibeen Restaurant", category: "games", tags: [], year: "2022", desc: "Restaurant management simulation game.", image: null, media: null, mediaType: "gif" },
  { id: 10, title: "Gates of Avalon", category: "games", tags: [], year: "2022", desc: "Fantasy adventure game.", image: null, media: null, mediaType: "gif" },
  { id: 11, title: "Untitled Pong Game", category: "games", tags: [], year: "2020", desc: "Modern take on the classic Pong.", image: null, media: null, mediaType: "gif" },
  { id: 12, title: "Future Dice", category: "games", tags: [], year: "2021", desc: "Dice-based strategy game.", image: null, media: null, mediaType: "image" },

  // ── AR (Yellow highlighted) ──
  { id: 13, title: "ADHA Mobile", category: "ar", tags: ["AR"], year: "2023", desc: "Mobile AR experience for ADHA.", image: null, media: null, mediaType: "video" },
  { id: 14, title: "UAE Torath", category: "ar", tags: ["Activation", "AR"], year: "2023", desc: "AR activation celebrating UAE heritage and culture.", image: null, media: null, mediaType: "video" },
  { id: 15, title: "AR Coin Hunt", category: "ar", tags: ["AR"], year: "2023", desc: "Interactive AR treasure hunt experience.", image: null, media: null, mediaType: "video" },

  // ── VR (Red highlighted) ──
  { id: 17, title: "STC - VR Project", category: "vr", tags: ["VR"], year: "2023", desc: "Immersive VR experience for STC.", image: null, media: null, mediaType: "video" },
  { id: 18, title: "VR 360 Videos", category: "vr", tags: ["Activation", "Gitex"], year: "2023", desc: "360-degree VR video experiences showcased at Gitex.", image: null, media: null, mediaType: "video" },

  // ── WEBSITES ──
  { id: 19, title: "uaeanimestore", category: "websites", tags: [], year: "2021", desc: "E-commerce website for anime merchandise in the UAE.", image: null, media: null, mediaType: "image" },

  // ── WORKSHOPS ──
  { id: 41, title: "Game Development with Unity", category: "workshops", tags: [], year: "2024-2025", desc: "Hands-on workshop teaching children and teens how to build their first games using Unity and C#. Conducted at Sharjah Children's Reading Festival and SIBF.", image: null, media: null, mediaType: "video", featured: true },
  { id: 42, title: "AI Visual Arts Workshop", category: "workshops", tags: [], year: "2024-2025", desc: "Creative workshop exploring AI-generated art using tools like Midjourney and Stable Diffusion. Participants learn to create characters and visual assets for their projects.", image: null, media: null, mediaType: "video", featured: true },
  { id: 43, title: "Arduino & Electronics Workshop", category: "workshops", tags: [], year: "2024", desc: "Interactive electronics workshop where participants build working hardware projects with Arduino, sensors, and custom circuits.", image: null, media: null, mediaType: "video" },

  // ── INTERACTIVE (All other activations) ──
  { id: 20, title: "Brain Wave Racing", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2023", desc: "Mind-controlled racing experience using brain wave sensors.", image: null, media: null, mediaType: "video" },
  { id: 21, title: "DHA - Hand Pedal", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2023", desc: "Custom hardware activation for Dubai Health Authority.", image: null, media: null, mediaType: "video" },
  { id: 22, title: "DoE", category: "interactive", tags: ["Activation", "Custom Hardware", "Multiple Screens"], year: "2023", desc: "Multi-screen interactive activation with custom hardware integration.", image: null, media: null, mediaType: "video" },
  { id: 23, title: "Football ShootOut", category: "interactive", tags: ["Activation", "Custom Hardware", "Multiple Screens"], year: "2023", desc: "Interactive football experience with motion tracking and multiple displays.", image: null, media: null, mediaType: "video" },
  
  { id: 24, title: "STC - Saudio Arabia Series", category: "interactive", tags: ["Activation"], year: "2022-2024", desc: "A series of interactive activations delivered for STC across Saudi Arabia, including multiple installations and experiences.", image: null, media: null, mediaType: "video", featured: true },
  
  { id: 25, title: "STC - Employer Brand", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2023", desc: "Interactive employer branding activation for STC.", image: null, media: null, mediaType: "video" },
  { id: 26, title: "STC - Spinning Wheel", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2023", desc: "Gamified spinning wheel activation with custom hardware.", image: null, media: null, mediaType: "gif" },
  { id: 27, title: "STC - Avatar Creator", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2023", desc: "Interactive avatar creation station with real-time customization.", image: null, media: null, mediaType: "gif" },
  { id: 28, title: "STC - E-Gaming", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2023", desc: "E-sports gaming activation with custom controller integration.", image: null, media: null, mediaType: "video" },
  
  { id: 29, title: "Saudi Airlines Umrah", category: "interactive", tags: ["Activation", "Touch Screen"], year: "2024", desc: "Touch screen interactive experience for Saudi Airlines Umrah services.", image: null, media: null, mediaType: "video" },
  { id: 30, title: "Saudi Digital Experience", category: "interactive", tags: ["Activation", "Touch Screen"], year: "2024", desc: "Interactive digital experience showcasing Saudi innovation.", image: null, media: null, mediaType: "video" },
  
  { id: 31, title: "AI Photobooth", category: "interactive", tags: ["Activation", "Touch Screen", "AI", "Photobooth"], year: "2023", desc: "AI-powered photobooth generating custom edited photos with prompts and face-swap integration.", image: null, media: null, mediaType: "video", featured: true },
  { id: 32, title: "Normal Photobooth", category: "interactive", tags: ["Activation", "Touch Screen", "AI", "Photobooth"], year: "2023", desc: "Traditional photobooth experience with instant printing.", image: null, media: null, mediaType: "gif" },
  { id: 33, title: "Saudi Tourism Photobooth", category: "interactive", tags: ["Activation", "Photobooth", "Touch Screen"], year: "2024", desc: "Branded photobooth for Saudi Tourism Authority.", image: null, media: null, mediaType: "video" },
  
  { id: 16, title: "Black Hat", category: "interactive", tags: ["Activation", "Multiple Screens"], year: "2024", desc: "Multi-screen interactive activation for Black Hat conference.", image: null, media: null, mediaType: "video" },
  
  { id: 34, title: "NCEMA", category: "interactive", tags: ["Simulation", "Multiplayer"], year: "2023", desc: "Multi-user simulation experience for National Emergency Crisis and Disasters Management Authority.", image: null, media: null, mediaType: "video", featured: true },
  
  { id: 35, title: "DC Expo Riyad", category: "interactive", tags: ["Activation", "Custom Hardware"], year: "2024", desc: "Interactive activation for Data Center Expo in Riyadh.", image: null, media: null, mediaType: "video" },
  { id: 36, title: "Etisalat (MWC)", category: "interactive", tags: ["Activation", "Touch & Throw", "Multiple Screens"], year: "2024", desc: "Multi-screen touch and throw activation for Etisalat at Mobile World Congress.", image: null, media: null, mediaType: "video" },
  { id: 37, title: "Mubadala", category: "interactive", tags: ["Activation", "Touch Screen"], year: "2024", desc: "Touch screen interactive experience for Mubadala Investment Company.", image: null, media: null, mediaType: "video" },
  { id: 38, title: "Dolphin Energy", category: "interactive", tags: ["Activation", "Touch & Throw", "Multiple Screens"], year: "2024", desc: "Interactive multi-screen activation for Dolphin Energy.", image: null, media: null, mediaType: "video" },
  { id: 39, title: "Novo Precision", category: "interactive", tags: ["Activation", "Touch & Throw", "Multiple Screens"], year: "2024", desc: "Touch and throw interactive experience across multiple displays.", image: null, media: null, mediaType: "video" },
  { id: 40, title: "Sadio One", category: "interactive", tags: ["Activation", "Photobooth", "Touch Screen"], year: "2024", desc: "Custom photobooth activation for Sadio One brand.", image: null, media: null, mediaType: "gif" },
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

function ProjectCard({ project, index, setSelectedProject }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  const categoryIcons = {
    games: "◈",
    ar: "◎",
    vr: "⬡",
    interactive: "◉",
    workshops: "◈",
    websites: "◈",
  };

  return (
    <div
      ref={ref}
      onClick={() => setSelectedProject(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`,
        background: hovered ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.01)",
        border: `1px solid ${hovered ? "rgba(0,212,255,0.45)" : "rgba(0,212,255,0.1)"}`,
        overflow: "hidden",
        boxShadow: hovered ? "0 16px 48px rgba(0,212,255,0.1)" : "none",
        cursor: "none",
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
          {categoryIcons[project.category] || "◈"}
        </div>
        {project.image && (
          <img src={project.image} alt={project.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        {!project.image && (
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            fontSize: 9, color: "rgba(0,212,255,0.4)", letterSpacing: 2, border: "1px solid rgba(0,212,255,0.2)", padding: "3px 8px",
          }}>
            ADD IMAGE
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
            {project.category}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>{project.year}</span>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>{project.title}</h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 16 }}>{project.desc}</p>

        {project.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontSize: 9, padding: "3px 10px",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)", letterSpacing: 1,
              }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects({ initialCategory = "games" }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Update category when initialCategory changes
  useEffect(() => {
    setActiveCategory(initialCategory);
    setSelectedTags([]);
  }, [initialCategory]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Filter logic
  let filtered = PROJECTS;
  
  // First filter by category
  if (activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  
  // Then filter by tags (OR logic - show if has ANY selected tag)
  if (selectedTags.length > 0) {
    filtered = filtered.filter(p => 
      selectedTags.some(tag => p.tags.includes(tag))
    );
  }

  return (
    <div style={{ fontFamily: "'Courier New', monospace", color: "#e0f0ff", paddingTop: 80, position: "relative" }}>
      <section style={{ padding: "80px 10vw 100px" }}>

        {/* Header */}
        <div style={{
          opacity: 1,
          animation: "fadeUp 0.7s ease both",
          marginBottom: 50,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#00d4ff", marginBottom: 8 }}>// my work</div>
          <div style={{ width: 50, height: 2, background: "#00d4ff", boxShadow: "0 0 10px #00d4ff", marginBottom: 24 }} />
          <h1 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, lineHeight: 1, marginBottom: 16 }}>Projects</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, maxWidth: 600, lineHeight: 1.7 }}>
            {PROJECTS.length} interactive experiences, games, AR/VR projects, and activations delivered across the UAE and Saudi Arabia.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: "flex", gap: 2, flexWrap: "wrap",
          marginBottom: 24,
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          paddingBottom: 0,
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === "all" 
              ? PROJECTS.length 
              : PROJECTS.filter(p => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSelectedTags([]); }}
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

        {/* Tag Filter Pills - Only show for Interactive category */}
        {activeCategory === "interactive" && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12, textTransform: "uppercase" }}>
              Filter by tags:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ALL_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      background: isSelected ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isSelected ? "#00d4ff" : "rgba(255,255,255,0.1)"}`,
                      color: isSelected ? "#00d4ff" : "rgba(255,255,255,0.4)",
                      fontSize: 10,
                      letterSpacing: 2,
                      padding: "6px 14px",
                      fontFamily: "'Courier New', monospace",
                      transition: "all 0.2s",
                      textShadow: isSelected ? "0 0 8px rgba(0,212,255,0.4)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 10,
                    letterSpacing: 2,
                    padding: "6px 14px",
                    fontFamily: "'Courier New', monospace",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00d4ff";
                    e.currentTarget.style.borderColor = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results count */}
        <div style={{ 
          fontSize: 11, 
          color: "rgba(255,255,255,0.3)", 
          letterSpacing: 2, 
          marginBottom: 24,
          textTransform: "uppercase",
        }}>
          {filtered.length} {filtered.length === 1 ? 'Project' : 'Projects'}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} setSelectedProject={setSelectedProject} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "80px 0", 
            color: "rgba(255,255,255,0.25)", 
            fontSize: 13, 
            letterSpacing: 3,
            border: "1px solid rgba(0,212,255,0.1)",
            background: "rgba(0,212,255,0.02)",
          }}>
            NO PROJECTS MATCH YOUR FILTERS
          </div>
        )}
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && createPortal(
        <div
          onClick={() => setSelectedProject(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(6,8,16,0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.3s ease",
            overflow: "hidden",
            cursor: "auto"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#060810",
              border: "1px solid rgba(0,212,255,0.3)",
              maxWidth: 900,
              width: "100%",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              animation: "slideUp 0.3s ease",
              overflow: "hidden",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00d4ff",
                fontSize: 18,
                fontFamily: "'Courier New', monospace",
                zIndex: 10,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,212,255,0.2)";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,212,255,0.1)";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              ×
            </button>

            {/* Media section */}
            <div style={{
              height: 300,
              flexShrink: 0,
              background: "rgba(0,212,255,0.03)",
              borderBottom: "1px solid rgba(0,212,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              {selectedProject.media ? (
                selectedProject.mediaType === "video" ? (
                  <video
                    src={selectedProject.media}
                    controls
                    autoPlay
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : selectedProject.mediaType === "gif" ? (
                  <img
                    src={selectedProject.media}
                    alt={selectedProject.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <img
                    src={selectedProject.media}
                    alt={selectedProject.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                )
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 64, opacity: 0.15, marginBottom: 16, color: "#00d4ff" }}>
                    {{ games: "◈", ar: "◎", vr: "⬡", interactive: "◉", workshops: "◈", websites: "◈" }[selectedProject.category]}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 3 }}>
                    MEDIA COMING SOON
                  </div>
                </div>
              )}
            </div>

            {/* Content - Scrollable */}
            <div style={{ padding: "40px 48px 48px", overflowY: "auto", flex: 1 }}>
              {/* Meta */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  color: "#00d4ff",
                  border: "1px solid rgba(0,212,255,0.3)",
                  padding: "4px 12px",
                  textTransform: "uppercase",
                }}>
                  {selectedProject.category}
                </span>
                {selectedProject.featured && (
                  <span style={{
                    fontSize: 9,
                    letterSpacing: 2,
                    color: "#060810",
                    background: "#00d4ff",
                    padding: "4px 12px",
                  }}>
                    FEATURED
                  </span>
                )}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginLeft: "auto" }}>
                  {selectedProject.year}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
                {selectedProject.title}
              </h2>

              {/* Description */}
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 28 }}>
                {selectedProject.desc}
              </p>

              {/* Tags */}
              {selectedProject.tags.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12, textTransform: "uppercase" }}>
                    Technologies & Features:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: 11,
                        padding: "6px 14px",
                        border: "1px solid rgba(0,212,255,0.3)",
                        color: "#00d4ff",
                        letterSpacing: 1,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Media type indicator */}
              <div style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: 2,
                padding: "12px 0",
                borderTop: "1px solid rgba(0,212,255,0.1)",
              }}>
                MEDIA TYPE: {selectedProject.mediaType.toUpperCase()}
                {!selectedProject.media && " — AWAITING UPLOAD"}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

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