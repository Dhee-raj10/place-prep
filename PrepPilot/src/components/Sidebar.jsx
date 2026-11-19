
import {
  LayoutDashboard, Code2, BookOpen,
  Brain, ClipboardList, BriefcaseBusiness,
  FileText, UserRound, Settings, GraduationCap
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "DSA Tracker", icon: Code2 },
  { name: "Question Bank", icon: BookOpen },
  { name: "Aptitude", icon: Brain },
  { name: "Mock Tests", icon: ClipboardList },
  { name: "Applications", icon: BriefcaseBusiness },
  { name: "Resume Analyzer", icon: FileText }
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <GraduationCap size={23} />
        </div>
        <span>Prep<span className="brand-accent">Pilot</span></span>
      </div>

      <p className="menu-label">MENU</p>

      <nav className="side-nav">
        {menu.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`nav-item ${active === name ? "active" : ""}`}
            onClick={() => setActive(name)}
          >
            <Icon size={19} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className={`nav-item ${active === "Profile" ? "active" : ""}`}
          onClick={() => setActive("Profile")}
        >
          <UserRound size={19} />
          <span>Profile</span>
        </button>
        <button
          className={`nav-item ${active === "Settings" ? "active" : ""}`}
          onClick={() => setActive("Settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <div className="upgrade-card">
          <div className="upgrade-icon">✦</div>
          <strong>Stay consistent!</strong>
          <p>Small progress every day leads to big results.</p>
        </div>
      </div>
    </aside>
  );
}
