import { useState } from "react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
];

export default function Navbar({ currentPage, navigateTo }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 500,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 48px",
      background: "rgba(6,8,16,0.88)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,212,255,0.12)",
    }}>
      {/* Logo */}
      <button
        onClick={() => navigateTo("home")}
        style={{
          background: "none",
          border: "none",
          color: "#00d4ff",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 4,
          fontFamily: "'Courier New', monospace",
          textShadow: "0 0 20px #00d4ff",
          padding: 0,
        }}
      >
        XOiRDz
      </button>

      {/* Desktop Nav */}
      <ul style={{ display: "flex", gap: 8, listStyle: "none", alignItems: "center" }}>
        {NAV.map((item) => {
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => navigateTo(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  background: isActive ? "rgba(0,212,255,0.1)" : "none",
                  border: isActive ? "1px solid rgba(0,212,255,0.4)" : "1px solid transparent",
                  color: isActive || isHovered ? "#00d4ff" : "rgba(255,255,255,0.45)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  padding: "8px 20px",
                  fontFamily: "'Courier New', monospace",
                  transition: "all 0.25s ease",
                  textShadow: isActive ? "0 0 12px #00d4ff" : "none",
                }}
              >
                {isActive && <span style={{ marginRight: 6, opacity: 0.6 }}>//</span>}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Status dot */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 7, height: 7,
          borderRadius: "50%",
          background: "#00d4ff",
          animation: "pulse 2s infinite",
        }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 2 }}>
          AVAILABLE
        </span>
      </div>
    </nav>
  );
}