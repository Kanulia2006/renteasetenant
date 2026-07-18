import { User, Lock, Bell, Star, ChevronRight, LogOut, RefreshCw } from "lucide-react";
import Badge from "../components/Badge";
import { user, roles } from "../data/mockData";

function SettingsRow({ icon: Icon, title, subtitle, onClick }) {
  return (
    <div className="settings-row" onClick={onClick}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--line-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-600, var(--ink-700))",
            flexShrink: 0,
          }}
        >
          <Icon size={16} />
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink-900)", marginBottom: 2 }}>{title}</p>
          <p style={{ fontSize: 12, color: "var(--ink-400)" }}>{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={18} color="var(--ink-400)" />
    </div>
  );
}

export default function Settings({ currentRole, onRoleChange, onNavigate, onSignOut }) {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Settings</h1>
        <p className="page-desc">Manage your profile and preferences.</p>
      </div>

      <div className="card card-pad max-w" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <div className="avatar avatar-lg">{user.initials}</div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 16, color: "var(--ink-900)", marginBottom: 4 }}>{user.name}</p>
          <p style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 6 }}>{user.email}</p>
          <Badge tone="green">{currentRole}</Badge>
        </div>
      </div>

      <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <RefreshCw size={12} /> Switch Role
      </p>
      <div className="card max-w" style={{ overflow: "hidden", marginBottom: 20 }}>
        {roles.map((role) => (
          <div key={role} className="settings-row" onClick={() => onRoleChange(role)}>
            <span style={{ fontSize: 14, fontWeight: currentRole === role ? 700 : 400, color: "var(--ink-900)" }}>
              {role}
            </span>
            {currentRole === role && <Badge tone="green">Active</Badge>}
          </div>
        ))}
      </div>

      <p className="section-label">Account</p>
      <div className="card max-w" style={{ overflow: "hidden", marginBottom: 20 }}>
        <SettingsRow icon={User} title="Edit Profile" subtitle="Name, photo, email, phone" onClick={() => onNavigate("edit-profile")} />
        <SettingsRow icon={Lock} title="Change Password" subtitle="Update your password" onClick={() => onNavigate("change-password")} />
      </div>

      <p className="section-label">Preferences</p>
      <div className="card max-w" style={{ overflow: "hidden", marginBottom: 20 }}>
        <SettingsRow icon={Bell} title="Notifications" subtitle="Push, email, SMS alerts" onClick={() => onNavigate("notifications")} />
        <SettingsRow icon={Star} title="My Reviews" subtitle="Leave or manage property reviews" onClick={() => onNavigate("reviews")} />
      </div>

      <button className="btn btn-danger-soft btn-block max-w" onClick={onSignOut}>
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}
