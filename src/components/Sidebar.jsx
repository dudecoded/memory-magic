import { useState } from "react";
import {
  Brain,
  Gamepad2,
  Trophy,
  RotateCcw,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  Menu,
  ChevronLeft,
} from "lucide-react";

function Sidebar({ onNewGame }) {
  const [expanded, setExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>

      {/* Logo */}
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-icon">
            <Brain size={20} />
          </div>

          {expanded && (
            <span className="brand-name">Memory Magic</span>
          )}
        </div>

        <button
          className="collapse-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="sidebar-nav">

        <div className="nav-section">
          {expanded && <span className="section-title">GAME</span>}

          <button className="nav-item active">
            <Gamepad2 size={18} />
            {expanded && <span>Game</span>}
          </button>

          <button className="nav-item" onClick={onNewGame}>
            <RotateCcw size={18} />
            {expanded && <span>New Game</span>}
          </button>

          <button className="nav-item">
            <Trophy size={18} />
            {expanded && <span>Progress</span>}
          </button>
        </div>

        <div className="nav-section">
          {expanded && <span className="section-title">OTHER</span>}

          <button className="nav-item">
            <Settings size={18} />
            {expanded && <span>Settings</span>}
          </button>

          <button className="nav-item">
            <HelpCircle size={18} />
            {expanded && <span>Help</span>}
          </button>
        </div>
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}

          {expanded && (
            <span>{darkMode ? "Dark mode" : "Light mode"}</span>
          )}
        </button>

        {expanded && (
          <div className="version">
            Memory Magic
            <span>v1.0</span>
          </div>
        )}

      </div>
    </aside>
  );
}

export default Sidebar;