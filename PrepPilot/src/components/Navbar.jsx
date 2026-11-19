
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search anything..." />
        <kbd>Ctrl K</kbd>
      </div>

      <div className="topbar-right">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="user-profile">
          <div className="avatar">DR</div>
          <div className="user-info">
            <strong>Dheeraj</strong>
            <span>Student</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
