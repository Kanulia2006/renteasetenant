import { Menu, Bell, Settings } from "lucide-react";
import { user } from "../data/mockData";

const titles = {
  dashboard: ["Dashboard", "Plan your stay and manage your rental with ease."],
  payments: ["Payments", "Pay rent and review your payment history."],
  contract: ["Contract", "Manage, upload, and renew your lease agreement."],
  notifications: ["Notifications", "Updates about your rental and account."],
  complaints: ["Complaints", "Submit and track maintenance requests."],
  reviews: ["Reviews", "Share and manage property reviews."],
  settings: ["Settings", "Manage your profile and preferences."],
  "edit-profile": ["Edit Profile", "Update your photo, personal info, and contact details."],
  "change-password": ["Change Password", "Keep your account secure."],
};

export default function Topbar({ activePage, unreadCount, onMenuClick, onNavigate }) {
  const [title, subtitle] = titles[activePage] || ["RentEase", ""];

  return (
    <header className="topbar">
      <button className="icon-btn menu-toggle" aria-label="Open menu" onClick={onMenuClick}>
        <Menu size={20} />
      </button>

      <div className="topbar-titles">
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-subtitle">{subtitle}</div>}
      </div>

      <div className="topbar-actions">
        <div className="icon-btn-wrap">
          <button
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => onNavigate("notifications")}
          >
            <Bell size={19} />
          </button>
          {unreadCount > 0 && <span className="notif-dot" />}
        </div>
        <button className="icon-btn" aria-label="Settings" onClick={() => onNavigate("settings")}>
          <Settings size={19} />
        </button>
        <div className="topbar-divider" />
        <div className="avatar" title={user.email}>
          {user.initials}
        </div>
      </div>
    </header>
  );
}
