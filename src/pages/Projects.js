import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const CATEGORIES = [
  { id: "ar", label: "AR" },
  { id: "vr", label: "VR" },
  { id: "interactive", label: "Interactive" },
  { id: "games", label: "Games" },
  { id: "workshops", label: "Workshops" },
  { id: "websites", label: "Websites" },
];

const ALL_TAGS = [
  "Activation", "Custom Hardware", "Multiple Screens", "Touch Screen",
  "Photobooth", "AI", "Simulation", "Multiplayer", "Touch & Throw", "Gitex"
];

const PROJECTS = [
  // ── GAMES ──
  { 
    id: 9, 
    title: "Al Taibeen Restaurant", 
    category: "games", 
    tags: [], 
    year: "2022", 
    desc: "Restaurant management simulation.", 
    fullDesc: "A comprehensive restaurant management simulation game where players manage all aspects of running a restaurant including staff, inventory, customer service, and finances.",
    link: null
  },
  { 
    id: 1, 
    title: "Count up", 
    category: "games", 
    tags: [], 
    year: "2020", 
    desc: "Mathematical challenge game.", 
    fullDesc: "Mathematical game where you need to reach the target number in the shortest time possible using strategic number combinations and quick thinking.",
    link: null
  },
  { 
    id: 2, 
    title: "Lost Player", 
    category: "games", 
    tags: [], 
    year: "2020", 
    desc: "Fast-paced running game.", 
    fullDesc: "Fast running game with glitches serving as difficulty modifiers and challenges. Navigate through increasingly difficult levels while dealing with environmental glitches.",
    link: null
  },
  { 
    id: 3, 
    title: "My Journey to Mars", 
    category: "games", 
    tags: [], 
    year: "2021", 
    desc: "Futuristic story-driven adventure.", 
    fullDesc: "Small story game made with a vision of the future, exploring themes of space exploration and humanity's journey to Mars through an engaging narrative.",
    link: null
  },
  { 
    id: 4, 
    title: "Space out", 
    category: "games", 
    tags: [], 
    year: "2021", 
    desc: "Space defense game.", 
    fullDesc: "Protect your ship from incoming meteors in this fast-paced space survival game. Test your reflexes and strategic positioning.",
    link: null
  },
  { 
    id: 5, 
    title: "Time Spacer", 
    category: "games", 
    tags: [], 
    year: "2021", 
    desc: "Time manipulation puzzler.", 
    fullDesc: "Time manipulation puzzle game where you control time itself to solve increasingly complex puzzles and navigate through challenging scenarios.",
    link: null
  },
  { 
    id: 6, 
    title: "Unalterable", 
    category: "games", 
    tags: [], 
    year: "2021", 
    desc: "Mystery puzzle adventure.", 
    fullDesc: "Puzzle game that requires finding clues and items to progress through a mysterious storyline. Each discovery unlocks new areas and deeper mysteries.",
    link: null
  },
  { 
    id: 7, 
    title: "Vortax", 
    category: "games", 
    tags: [], 
    year: "2021", 
    desc: "Speed-based reaction game.", 
    fullDesc: "Game that speeds up with time to test player's quick response and adaptability. How long can you survive as the pace intensifies?",
    link: null
  },
  { 
    id: 8, 
    title: "15 Puzzle", 
    category: "games", 
    tags: [], 
    year: "2020", 
    desc: "Classic sliding puzzle.", 
    fullDesc: "Classic sliding puzzle game reimagined with modern design and intuitive controls. Challenge yourself with different difficulty levels.",
    link: null
  },
  { 
    id: 10, 
    title: "Gates of Avalon", 
    category: "games", 
    tags: [], 
    year: "2022", 
    desc: "Fantasy adventure game.", 
    fullDesc: "Fantasy adventure game set in the mythical realm of Avalon. Explore ancient gates, solve mysteries, and uncover hidden treasures.",
    link: null
  },
  { 
    id: 11, 
    title: "Untitled Pong Game", 
    category: "games", 
    tags: [], 
    year: "2020", 
    desc: "Modern Pong remake.", 
    fullDesc: "Modern take on the classic Pong with enhanced visuals, sound effects, and new gameplay mechanics that bring fresh life to the iconic game.",
    link: null
  },
  { 
    id: 12, 
    title: "Future Dice", 
    category: "games", 
    tags: [], 
    year: "2021", 
    desc: "Strategic dice game.", 
    fullDesc: "Dice-based strategy game combining luck and tactical decision-making. Plan your moves carefully to outwit opponents.",
    link: null
  },

  // ── AR ──
  { 
    id: 13, 
    title: "AR Villa Visualizer", 
    category: "ar", 
    tags: ["AR"], 
    year: "2023", 
    desc: "Architecture visualization in AR.", 
    fullDesc: "Mobile AR experience for architecture visualization allowing clients to preview villa designs in real-world scale and space before construction begins.",
    link: null
  },
  { 
    id: 14, 
    title: "UAE Torath", 
    category: "ar", 
    tags: ["Activation", "AR"], 
    year: "2023", 
    desc: "Heritage AR experience.", 
    fullDesc: "AR activation that consists of multiple images to be collected while gathering information about UAE heritage. Users explore various heritage sites through augmented reality, collecting digital artifacts and learning about Emirati culture. The experience culminates in an interactive game where participants use their collected knowledge to win prizes.",
    link: null
  },
  { 
    id: 15, 
    title: "AR Coin Hunt", 
    category: "ar", 
    tags: ["AR"], 
    year: "2023", 
    desc: "AR treasure hunt game.", 
    fullDesc: "Interactive AR treasure hunt experience. Go out and gather the most coins to win - your hand is your tool. Compete with others to collect virtual coins scattered in the real world.",
    link: null
  },

  // ── VR ──
  { 
    id: 17, 
    title: "STC - VR Project", 
    category: "vr", 
    tags: ["VR"], 
    year: "2023", 
    desc: "Immersive STC experience.", 
    fullDesc: "Explore the technologies and facts about STC in a unique immersive VR experience while interacting with the virtual environment. Discover company innovations through interactive demonstrations and guided tours.",
    link: null
  },
  { 
    id: 18, 
    title: "VR 360 Videos", 
    category: "vr", 
    tags: ["Activation", "Gitex"], 
    year: "2023", 
    desc: "360° VR experiences.", 
    fullDesc: "360-degree VR video experiences showcased at Gitex technology conference. Immersive storytelling and virtual tours that transport viewers to different locations and scenarios.",
    link: null
  },

  // ── WEBSITES ──
  { 
    id: 19, 
    title: "uaeanimestore", 
    category: "websites", 
    tags: [], 
    year: "2021", 
    desc: "Anime e-commerce platform.", 
    fullDesc: "6-year-running e-commerce website for anime merchandise in the UAE. Maintained and updated regularly with new products, features, and improvements. Serves thousands of anime fans across the Emirates.",
    link: "https://uaeanimestore.com"
  },

  // ── INTERACTIVE ──
  { 
    id: 20, 
    title: "Brain Wave Racing", 
    category: "interactive", 
    tags: ["Activation", "Custom Hardware"], 
    year: "2023", 
    desc: "Mind-controlled racing.", 
    fullDesc: "Mind-controlled racing experience using brain wave sensors. Keep focusing to win the game. The more concentrated you are, the faster your car goes. A unique blend of gaming and neurofeedback technology.",
    link: null
  },
  { 
    id: 21, 
    title: "DHA - Hand Pedal", 
    category: "interactive", 
    tags: ["Activation", "Custom Hardware"], 
    year: "2023", 
    desc: "Health activation for DHA.", 
    fullDesc: "Custom hardware activation for Dubai Health Authority promoting physical activity and health awareness through an engaging hand-pedaling challenge.",
    link: null
  },
  { 
    id: 22, 
    title: "DoE", 
    category: "interactive", 
    tags: ["Activation", "Custom Hardware", "Multiple Screens"], 
    year: "2023", 
    desc: "Multi-screen exploration.", 
    fullDesc: "Explore the different buildings and units with this multi-screen interactive activation. Custom hardware integration allows visitors to navigate through various departments and learn about organizational structure interactively.",
    link: null
  },
  { 
    id: 23, 
    title: "Football ShootOut", 
    category: "interactive", 
    tags: ["Activation", "Custom Hardware", "Multiple Screens"], 
    year: "2023", 
    desc: "Interactive football challenge.", 
    fullDesc: "Interactive football experience where targets appear on multiple screens and you need to hit them with a real football. Combines physical activity with digital gaming for an engaging sports activation.",
    link: null
  },
  { 
    id: 24, 
    title: "STC - Saudi Arabia Series", 
    category: "interactive", 
    tags: ["Activation"], 
    year: "2022-2024", 
    desc: "Comprehensive activation series.", 
    fullDesc: "A series of 16 activations built together to create one big journey experience. From creating your avatar to exploring the STC world of technology and experiences. This large-scale project showcases the full range of STC's innovations through interconnected interactive installations.",
    link: null,
    featured: true
  },
  { 
    id: 29, 
    title: "Saudi Airlines Umrah", 
    category: "interactive", 
    tags: ["Activation", "Touch Screen"], 
    year: "2024", 
    desc: "Umrah services experience.", 
    fullDesc: "Touch screen interactive experience for Saudi Airlines Umrah services. Guide pilgrims through the journey with interactive maps, information, and booking assistance.",
    link: null
  },
  { 
    id: 30, 
    title: "Saudi Digital Experience", 
    category: "interactive", 
    tags: ["Activation", "Touch Screen"], 
    year: "2024", 
    desc: "Saudi innovation showcase.", 
    fullDesc: "Interactive digital experience showcasing Saudi innovation, technology advancements, and Vision 2030 initiatives through engaging touch-screen interfaces.",
    link: null
  },
  { 
    id: 31, 
    title: "AI Photobooth", 
    category: "interactive", 
    tags: ["Activation", "Touch Screen", "AI", "Photobooth"], 
    year: "2023", 
    desc: "AI-powered photo generation.", 
    fullDesc: "AI-powered photobooth generating custom edited photos with prompts and face-swap integration. Users can transform their photos into different artistic styles, backgrounds, and character transformations using cutting-edge AI technology.",
    link: null,
    featured: true
  },
  { 
    id: 32, 
    title: "Normal Photobooth", 
    category: "interactive", 
    tags: ["Activation", "Touch Screen", "AI", "Photobooth"], 
    year: "2023", 
    desc: "Traditional photobooth.", 
    fullDesc: "Traditional photobooth experience with instant printing. Classic photo strips with customizable frames and instant physical prints for events and activations.",
    link: null
  },
  { 
    id: 33, 
    title: "Saudi Tourism Photobooth", 
    category: "interactive", 
    tags: ["Activation", "Photobooth", "Touch Screen"], 
    year: "2024", 
    desc: "Tourism branded photobooth.", 
    fullDesc: "Branded photobooth for Saudi Tourism Authority featuring iconic Saudi landmarks as backgrounds. Visitors can take photos with AR elements showcasing tourism destinations.",
    link: null
  },
  { 
    id: 16, 
    title: "Black Hat", 
    category: "interactive", 
    tags: ["Activation", "Multiple Screens"], 
    year: "2024", 
    desc: "Cybersecurity conference activation.", 
    fullDesc: "Multi-screen interactive activation for Black Hat cybersecurity conference. Educational experience demonstrating security concepts through interactive challenges and visualizations.",
    link: null
  },
  { 
    id: 34, 
    title: "NCEMA", 
    category: "interactive", 
    tags: ["Simulation", "Multiplayer"], 
    year: "2023", 
    desc: "Emergency management simulation.", 
    fullDesc: "Multi-user simulation experience for National Emergency Crisis and Disasters Management Authority. Features voice chatting, screen sharing, and multiple scenarios all controlled by a coordinator within the simulation. Trains teams in crisis response and coordination.",
    link: null,
    featured: true
  },
  { 
    id: 35, 
    title: "DC Expo Riyad", 
    category: "interactive", 
    tags: ["Activation", "Custom Hardware"], 
    year: "2024", 
    desc: "Data center expo activation.", 
    fullDesc: "Interactive activation for Data Center Expo in Riyadh showcasing data center technologies and infrastructure through hands-on demonstrations.",
    link: null
  },
  { 
    id: 36, 
    title: "Etisalat (MWC)", 
    category: "interactive", 
    tags: ["Activation", "Touch & Throw", "Multiple Screens"], 
    year: "2024", 
    desc: "Mobile World Congress activation.", 
    fullDesc: "Multi-screen touch and throw activation for Etisalat at Mobile World Congress. Interactive gesture-based experience showcasing telecommunications innovations.",
    link: null
  },
  { 
    id: 37, 
    title: "Mubadala", 
    category: "interactive", 
    tags: ["Activation", "Touch Screen"], 
    year: "2024", 
    desc: "Investment company experience.", 
    fullDesc: "Touch screen interactive experience for Mubadala Investment Company. Explore investment portfolios, company history, and global impact through intuitive touch interfaces.",
    link: null
  },
  { 
    id: 38, 
    title: "Dolphin Energy", 
    category: "interactive", 
    tags: ["Activation", "Touch & Throw", "Multiple Screens"], 
    year: "2024", 
    desc: "Energy sector activation.", 
    fullDesc: "Interactive multi-screen activation for Dolphin Energy. Touch and throw mechanics allow visitors to explore energy infrastructure and operations in an engaging way.",
    link: null
  },
  { 
    id: 39, 
    title: "Novo Precision", 
    category: "interactive", 
    tags: ["Activation", "Touch & Throw", "Multiple Screens"], 
    year: "2024", 
    desc: "Precision technology showcase.", 
    fullDesc: "Touch and throw interactive experience across multiple displays showcasing Novo Precision's advanced manufacturing and precision technology capabilities.",
    link: null
  },

  // ── WORKSHOPS ──
  { 
    id: 40, 
    title: "Game Development with Unity", 
    category: "workshops", 
    tags: [], 
    year: "2024-2025", 
    desc: "Unity game development workshop.", 
    fullDesc: "Hands-on workshop teaching children and teens (ages 8-20) how to build their first games using Unity and C#. Conducted at major cultural events including Sharjah Children's Reading Festival and SIBF. Participants learn game design fundamentals, coding basics, and create their own playable games.",
    link: null,
    featured: true
  },
  { 
    id: 41, 
    title: "AI Visual Arts Workshop", 
    category: "workshops", 
    tags: [], 
    year: "2024-2025", 
    desc: "AI art generation workshop.", 
    fullDesc: "Creative workshop exploring AI-generated art using tools like ChatGPT and image generation AI. Participants learn to create a full story comic made of 4 panels while focusing on consistency between characters and background environments. Teaches prompt engineering, AI art techniques, and visual storytelling.",
    link: null,
    featured: true
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
        cursor: "pointer",
      }}
    >
      {/* Icon Display */}
      <div style={{
        height: 180,
        background: "rgba(0,212,255,0.04)",
        borderBottom: "1px solid rgba(0,212,255,0.1)",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        position: "relative", 
        overflow: "hidden",
      }}>
        <div style={{
          fontSize: 64, 
          opacity: hovered ? 0.25 : 0.15,
          fontFamily: "'Courier New', monospace",
          color: "#00d4ff",
          transition: "all 0.3s",
          textShadow: hovered ? "0 0 30px rgba(0,212,255,0.5)" : "none",
        }}>
          {categoryIcons[project.category] || "◈"}
        </div>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      <section style={{ padding: isMobile ? "80px 5vw 60px" : "80px 10vw 100px" }}>

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

        {/* Tag Filter Pills - Only show for Interactive category and hide on mobile */}
        {activeCategory === "interactive" && !isMobile && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12, textTransform: "uppercase" }}>
              Filter by tags:
            </div>
            <div style={{ display: "flex", 
            flexWrap: isMobile ? "nowrap" : "wrap", 
            gap: 8,
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
          }}>
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
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
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
        <>
          {/* Custom Cursor for Modal */}
          <div style={{
            position: "fixed",
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid #00d4ff",
            pointerEvents: "none",
            zIndex: 10002,
            left: -100,
            top: -100,
            boxShadow: "0 0 12px #00d4ff",
            transition: "transform 0.05s ease",
            mixBlendMode: "screen",
          }} id="modal-cursor-ring" />
          <div style={{
            position: "fixed",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#00d4ff",
            pointerEvents: "none",
            zIndex: 10002,
            left: -100,
            top: -100,
            boxShadow: "0 0 6px #00d4ff",
          }} id="modal-cursor-dot" />
          
          <div
            onClick={() => setSelectedProject(null)}
            onMouseMove={(e) => {
              const ring = document.getElementById('modal-cursor-ring');
              const dot = document.getElementById('modal-cursor-dot');
              if (ring) {
                ring.style.left = (e.clientX - 8) + 'px';
                ring.style.top = (e.clientY - 8) + 'px';
              }
              if (dot) {
                dot.style.left = (e.clientX - 2) + 'px';
                dot.style.top = (e.clientY - 2) + 'px';
              }
            }}
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
              padding: isMobile ? "10px" : "20px",
              animation: "fadeIn 0.3s ease",
              overflow: "hidden",
              cursor: "none",
            }}
          >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#060810",
              border: "1px solid rgba(0,212,255,0.3)",
              maxWidth: 1100,
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

            {/* Icon Display */}
            <div style={{
              padding: isMobile ? "60px 20px" : "80px 40px",
              background: "rgba(0,212,255,0.03)",
              borderBottom: "1px solid rgba(0,212,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 20,
            }}>
              <div style={{ fontSize: isMobile ? 80 : 120, opacity: 0.2, color: "#00d4ff", textShadow: "0 0 40px rgba(0,212,255,0.3)" }}>
                {{ games: "◈", ar: "◎", vr: "⬡", interactive: "◉", workshops: "◈", websites: "◈" }[selectedProject.category]}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 4, textTransform: "uppercase" }}>
                {selectedProject.category}
              </div>
            </div>

            {/* Content - Takes remaining space, scrollable if needed */}
            <div style={{ 
              flex: 1, 
              padding: isMobile ? "24px 20px 28px" : "32px 40px 40px", 
              overflowY: "auto",
              minHeight: 0,
            }}>
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
              <h2 style={{ fontSize: 32, color: "rgba(255,255,255,0.65)", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
                {selectedProject.title}
              </h2>

              {/* Description */}
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 28 }}>
                {selectedProject.fullDesc || selectedProject.desc}
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

              {/* Visit Project Button */}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 24,
                    padding: "14px 32px",
                    background: "#00d4ff",
                    border: "2px solid #00d4ff",
                    color: "#060810",
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#00d4ff";
                    e.currentTarget.style.color = "#060810";
                  }}
                >
                  Visit Project →
                </a>
              )}
            </div>
          </div>
        </div>
        </>,
        document.body
      )}

      <footer style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        padding: "36px 10vw",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ color: "#00d4ff", fontWeight: 700, letterSpacing: 4, fontSize: 14, textShadow: "0 0 15px #00d4ff" }}>XOiRDz</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>© 2026 ABDULLAH BADAHDAH</div>
      </footer>
    </div>
  );
}