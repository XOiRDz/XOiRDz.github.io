import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

const PAGES = ["home", "projects", "about"];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [transitioning, setTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState("left");
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigateTo = (page) => {
    if (page === currentPage || transitioning) return;
    const fromIndex = PAGES.indexOf(currentPage);
    const toIndex = PAGES.indexOf(page);
    setSlideDir(toIndex > fromIndex ? "left" : "right");
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 400);
  };

  const pageMap = { home: Home, projects: Projects, about: About };
  const PageComponent = pageMap[currentPage];

  return (
    <div style={{ background: "#060810", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      {/* Custom Cursor */}
      <div style={{
        position: "fixed",
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid #00d4ff",
        pointerEvents: "none",
        zIndex: 9999,
        left: mousePos.x - 8,
        top: mousePos.y - 8,
        boxShadow: "0 0 12px #00d4ff",
        transition: "transform 0.05s ease",
        mixBlendMode: "screen",
      }} />
      <div style={{
        position: "fixed",
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "#00d4ff",
        pointerEvents: "none",
        zIndex: 9999,
        left: mousePos.x - 2,
        top: mousePos.y - 2,
        boxShadow: "0 0 6px #00d4ff",
      }} />

      <Navbar currentPage={currentPage} navigateTo={navigateTo} />

      <div style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning
          ? `translateX(${slideDir === "left" ? "-40px" : "40px"})`
          : "translateX(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <PageComponent navigateTo={navigateTo} />
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none !important; }
        a, button { cursor: none !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #060810; }
        ::-webkit-scrollbar-thumb { background: #00d4ff; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 10px #00d4ff; }
          50% { box-shadow: 0 0 25px #00d4ff, 0 0 50px rgba(0,212,255,0.3); }
        }
      `}</style>
    </div>
  );
}