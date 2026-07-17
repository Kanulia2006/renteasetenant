import { useState } from "react";
import {
  Home,
  LayoutDashboard,
  CreditCard,
  FileText,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { user, roles } from "../data/mockData";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
  { icon: CreditCard, label: "Payments", page: "payments" },
  { icon: FileText, label: "Contract", page: "contract" },
  { icon: Bell, label: "Notifications", page: "notifications" },
  { icon: Settings, label: "Settings", page: "settings" },
];

export default function Sidebar({ activePage, onNavigate, currentRole, onRoleChange, unreadCount, isOpen, onClose }) {
  const [roleOpen, setRoleOpen] = useState(false);

  function go(page) {
    onNavigate(page);
    onClose();
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "is-open" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            <Home size={19} strokeWidth={2.3} />
          </div>
          <div>
            <div className="sidebar-brand-name">RentEase</div>
            <div className="sidebar-brand-tag">Tenant Portal</div>
          </div>
        </div>

        <p className="sidebar-label">Navigation</p>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className={`nav-item ${active ? "active" : ""}`}
              >
                <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                {item.label}
                {item.page === "notifications" && unreadCount > 0 && (
                  <span className="nav-badge">{unreadCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-role">
          <p className="sidebar-label">Switch Role</p>
          <button className="role-trigger" onClick={() => setRoleOpen(!roleOpen)}>
            <span>{currentRole}</span>
            {roleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {roleOpen && (
            <div className="role-menu">
              {roles.map((role) => (
                <div
                  key={role}
                  className={`role-menu-item ${currentRole === role ? "is-active" : ""}`}
                  onClick={() => {
                    onRoleChange(role);
                    setRoleOpen(false);
                  }}
                >
                  <span>{role}</span>
                  {currentRole === role && <span className="badge badge-green">Active</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar-user">
          <div className="avatar">{user.initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-role">{currentRole}</div>
          </div>
          <button className="icon-btn" aria-label="Sign out" onClick={() => alert("Signing out...")}>
            <LogOut size={17} />
          </button>
        </div>
      </aside>
    </>
  );
}
