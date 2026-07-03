import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './Admin.css';

// ─────────────────────────────────────────────
// ICONS — hand-coded inline SVGs
// Same pattern as LandlordInterface.jsx:
// width/height="18", strokeWidth="1.8",
// fill="none", stroke="currentColor"
// ─────────────────────────────────────────────
const IconDashboard = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconUsers = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="9" cy="7" r="3"/>
    <circle cx="15" cy="7" r="3"/>
    <path d="M3 20c0-3.314 2.686-6 6-6h6c3.314 0 6 2.686 6 6"/>
  </svg>
);

const IconProperties = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 22V12h6v10"/>
  </svg>
);

const IconComplaints = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconPayments = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const IconReports = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const IconSettings = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const IconSecurity = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconSearch = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconBell = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconPanel = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
  </svg>
);

const IconChevron = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const IconShield = () => (
  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);


// ─────────────────────────────────────────────
// DATA — structural constants only (no mock business data)
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard",  label: "Dashboard",  Icon: IconDashboard },
  { key: "users",      label: "Users",       Icon: IconUsers },
  { key: "properties", label: "Properties",  Icon: IconProperties },
  { key: "complaints", label: "Complaints",  Icon: IconComplaints },
  { key: "payments",   label: "Payments",    Icon: IconPayments },
  { key: "reports",    label: "Reports",     Icon: IconReports },
  { key: "settings",   label: "Settings",    Icon: IconSettings },
  { key: "security",   label: "Security",    Icon: IconSecurity },
];

const TAB_TITLES = {
  dashboard:  "Dashboard",
  users:      "User management",
  properties: "Property oversight",
  complaints: "Complaints & disputes",
  payments:   "Payment monitoring",
  reports:    "Reports & analytics",
  settings:   "Settings",
  security:   "Security & compliance",
};

const accessControlRows = [
  { resource: "Users",       superAdmin: "Full", supportAdmin: "Edit",   auditor: "Read" },
  { resource: "Properties",  superAdmin: "Full", supportAdmin: "Review", auditor: "Read" },
  { resource: "Payments",    superAdmin: "Full", supportAdmin: "Read",   auditor: "Read" },
  { resource: "Audit logs",  superAdmin: "Full", supportAdmin: "Read",   auditor: "Read" },
  { resource: "Settings",    superAdmin: "Full", supportAdmin: "—",      auditor: "—"    },
];

const donutColors = ["#1a6b5a", "#2f9e83", "#6ee7b7", "#a7f3d0", "#d1fae5"];

const reportTemplates = [
  { icon: "📊", title: "Monthly financial summary",  subtitle: "Revenue, payouts, fees · CSV", tag: "FINANCIAL"   },
  { icon: "🏢", title: "Occupancy & vacancy report", subtitle: "Per-property occupancy · PDF",  tag: "OPERATIONAL" },
  { icon: "📋", title: "Complaint trend analysis",   subtitle: "Categories & resolution · PDF", tag: "OPERATIONAL" },
  { icon: "👥", title: "User growth (academic)",     subtitle: "Cohorts and retention · CSV",   tag: "ACADEMIC"    },
];

const tagClass = { FINANCIAL: "ad-tag--green", OPERATIONAL: "ad-tag--blue", ACADEMIC: "ad-tag--amber" };


// ─────────────────────────────────────────────
// SHARED: Badge
// ─────────────────────────────────────────────
function Badge({ label, tone = "gray" }) {
  return (
    <span className={`ad-badge ad-badge--${tone}`}>
      <span className="ad-badge-dot" />
      {label}
    </span>
  );
}


// ─────────────────────────────────────────────
// SHARED: EmptyState
// ─────────────────────────────────────────────
function EmptyState({ text }) {
  return <div className="ad-empty">{text}</div>;
}


// ─────────────────────────────────────────────
// SHARED: Toggle
// ─────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <label className="ad-toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ad-toggle-track" />
    </label>
  );
}


// ─────────────────────────────────────────────
// SHARED: Sidebar
// ─────────────────────────────────────────────
function Sidebar({ activePage, onNavigate, admin, sidebarOpen, setSidebarOpen }) {
  const displayName = admin?.name || "Admin";
  const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <aside className={`ad-sidebar ${sidebarOpen ? "ad-sidebar--open" : ""}`}>
      {/* Logo */}
      <div className="ad-logo">
        <div className="ad-logo-icon"><IconShield /></div>
        <div>
          <span className="ad-logo-name">RentEase</span>
          <span className="ad-logo-role">Admin Portal</span>
        </div>
      </div>

      {/* Nav */}
      <p className="ad-nav-label">Workspace</p>
      <ul className="ad-nav-list">
        {NAV_ITEMS.map(({ key, label, Icon }) => (
          <li key={key}>
            <button
              className={`ad-nav-item ${activePage === key ? "ad-nav-item--active" : ""}`}
              onClick={() => { onNavigate(key); setSidebarOpen(false); }}
            >
              <Icon />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Push user to bottom */}
      <div style={{ flex: 1 }} />

      {/* User strip */}
      <div className="ad-user">
        <div className="ad-user-avatar">{initials}</div>
        <div className="ad-user-info">
          <span className="ad-user-name">{displayName}</span>
          <span className="ad-user-role">{admin?.role || "Admin"}</span>
        </div>
        <button className="ad-user-logout" title="Sign out" onClick={() => alert("Signing out...")}>
          <IconLogout />
        </button>
      </div>
    </aside>
  );
}


// ─────────────────────────────────────────────
// SHARED: TopBar
// ─────────────────────────────────────────────
function TopBar({ pageLabel }) {
  return (
    <div className="ad-topbar">
      <div className="ad-topbar-breadcrumb">
        <span className="ad-topbar-breadcrumb-icon"><IconPanel /></span>
        <span>Admin</span>
        <span className="ad-topbar-breadcrumb-sep"><IconChevron /></span>
        <span className="ad-topbar-breadcrumb-page">{pageLabel}</span>
      </div>
      <div className="ad-topbar-right">
        <div className="ad-search">
          <IconSearch /> Search users, listings, TX...
        </div>
        <button className="ad-bell">
          <IconBell />
          <span className="ad-bell-dot" />
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Dashboard
// ─────────────────────────────────────────────
function DashboardPage({ onNavigate }) {
  // TODO: fetch from your API e.g. fetch('/api/admin/dashboard')
  const [stats, setStats] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [complaintsData, setComplaintsData] = useState([]);
  const [escalatedDisputes, setEscalatedDisputes] = useState([]);
  const [flaggedTransactions, setFlaggedTransactions] = useState([]);

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Dashboard</h1>
      <p className="ad-page-sub">Overview of activity across the platform.</p>

      {/* Stat cards */}
      <div className="ad-stats">
        {stats.length > 0 ? stats.map(s => (
          <div key={s.label} className="ad-stat-card">
            <p className="ad-stat-label">{s.label}</p>
            <p className="ad-stat-value">{s.value}{s.suffix}</p>
            <p className={`ad-stat-change ad-stat-change--${s.trend}`}>
              {s.trend === "up" ? "↗" : "↘"} {s.change} vs last month
            </p>
          </div>
        )) : <EmptyState text="Stats will appear once connected to live data." />}
      </div>

      {/* Quick links */}
      <div className="ad-card" style={{ marginBottom: 24 }}>
        <p className="ad-section-title" style={{ marginBottom: 16 }}>Quick links</p>
        <div className="ad-quicklinks">
          {NAV_ITEMS.filter(n => n.key !== "dashboard").map(({ key, label, Icon }) => (
            <button key={key} className="ad-quicklink" onClick={() => onNavigate(key)}>
              <Icon />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="ad-two-col">
        <div className="ad-card">
          <div className="ad-section-header"><p className="ad-section-title">Revenue vs payouts</p></div>
          <p className="ad-section-subtitle">Last 6 months · GH₵</p>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a6b5a" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="#1a6b5a" stopOpacity={0.02}/>
                  </linearGradient>
                  <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <YAxis tickFormatter={v => `GH₵${v/1000}k`} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <Tooltip formatter={v => `GH₵${v.toLocaleString()}`} contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
                <Area type="monotone" dataKey="revenue" stroke="#1a6b5a" strokeWidth={2} fill="url(#rg1)"/>
                <Area type="monotone" dataKey="payouts" stroke="#6ee7b7" strokeWidth={2} fill="url(#pg1)"/>
              </AreaChart>
            </ResponsiveContainer>
          ) : <EmptyState text="No revenue data yet." />}
        </div>

        <div className="ad-card">
          <div className="ad-section-header"><p className="ad-section-title">Complaints by category</p></div>
          <p className="ad-section-subtitle">This quarter</p>
          {complaintsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={complaintsData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
                <Bar dataKey="count" fill="#1a6b5a" radius={[6, 6, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyState text="No complaint data yet." />}
        </div>
      </div>

      {/* Bottom row */}
      <div className="ad-two-col">
        <div className="ad-card">
          <div className="ad-section-header">
            <div>
              <p className="ad-section-title">Escalated disputes</p>
              <p className="ad-section-subtitle">Require admin intervention</p>
            </div>
            <button className="ad-section-link" onClick={() => onNavigate("complaints")}>View all</button>
          </div>
          {escalatedDisputes.length > 0 ? escalatedDisputes.map(d => (
            <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{d.title}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>{d.id} · {d.parties}</p>
              </div>
              <Badge label={d.status} tone="red" />
            </div>
          )) : <EmptyState text="No escalated disputes." />}
        </div>

        <div className="ad-card">
          <div className="ad-section-header">
            <div>
              <p className="ad-section-title">Flagged transactions</p>
              <p className="ad-section-subtitle">Failed or anomalous payments</p>
            </div>
            <button className="ad-section-link" onClick={() => onNavigate("payments")}>View all</button>
          </div>
          {flaggedTransactions.length > 0 ? flaggedTransactions.map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{t.id} · GH₵{t.amount?.toLocaleString()}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>{t.party}</p>
              </div>
              <Badge label={t.status} tone="red" />
            </div>
          )) : <EmptyState text="No flagged transactions." />}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Users
// ─────────────────────────────────────────────
function UsersPage() {
  // TODO: fetch('/api/admin/users').then(r => r.json()).then(setUsers)
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");

  const filters = ["All", "Landlord", "Tenant", "Prospect"];
  const filtered = roleFilter === "All" ? users : users.filter(u => u.role === roleFilter);

  const statusTone = { Active: "green", Pending: "yellow", Suspended: "red" };

  function toggleSuspend(id) {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
  }

  function removeUser(id) {
    if (window.confirm("Remove this user?")) setUsers(users.filter(u => u.id !== id));
  }

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">User management</h1>
      <p className="ad-page-sub">View, verify, and moderate every account on the platform.</p>

      <div className="ad-filters">
        {filters.map(f => (
          <button key={f} className={`ad-filter-btn ${roleFilter === f ? "ad-filter-btn--active" : ""}`} onClick={() => setRoleFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="ad-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="ad-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>User</th><th>Role</th><th>Status</th><th>Last active</th><th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5}><EmptyState text="No users yet. They'll appear here once connected to your backend." /></td></tr>
            )}
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="ad-avatar">{u.initials}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{u.name}</p>
                      <p style={{ fontSize: 12, color: "#9ca3af" }}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td>{u.role}</td>
                <td><Badge label={u.status} tone={statusTone[u.status] || "gray"} /></td>
                <td style={{ color: "#9ca3af" }}>{u.lastActive}</td>
                <td>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button className="ad-action-btn" title="Verify" onClick={() => alert(`Verifying ${u.name}`)}>✓</button>
                    <button className="ad-action-btn" title="Reset password" onClick={() => alert(`Reset password for ${u.name}`)}>🔑</button>
                    <button className="ad-action-btn" title="Suspend / Reactivate" onClick={() => toggleSuspend(u.id)}>⊘</button>
                    <button className="ad-action-btn ad-action-btn--danger" title="Remove" onClick={() => removeUser(u.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Properties
// ─────────────────────────────────────────────
function PropertiesPage() {
  // TODO: fetch('/api/admin/properties').then(r => r.json()).then(setProperties)
  const [properties, setProperties] = useState([]);

  const pending   = properties.filter(p => p.status === "Pending Review");
  const occupied  = properties.filter(p => p.occupancy === "Occupied").length;
  const vacant    = properties.filter(p => p.occupancy === "Vacant").length;
  const flagged   = properties.filter(p => p.status === "Flagged").length;

  const statusTone = { Live: "green", "Pending Review": "yellow", Flagged: "red", Rejected: "red" };
  const occupancyTone = { Occupied: "green", Vacant: "gray" };

  function approve(id) { setProperties(properties.map(p => p.id === id ? { ...p, status: "Live" } : p)); }
  function reject(id)  { setProperties(properties.map(p => p.id === id ? { ...p, status: "Rejected" } : p)); }
  function flag(id)    { setProperties(properties.map(p => p.id === id ? { ...p, status: "Flagged" } : p)); }

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Property oversight</h1>
      <p className="ad-page-sub">Review, approve, and monitor listings.</p>

      <div className="ad-stats">
        {[["Pending review", pending.length], ["Occupied", occupied], ["Vacant", vacant], ["Flagged", flagged]].map(([label, val]) => (
          <div key={label} className="ad-stat-card">
            <p className="ad-stat-label">{label}</p>
            <p className="ad-stat-value">{val}</p>
          </div>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="ad-card" style={{ marginBottom: 24 }}>
          <p className="ad-section-title">Listings awaiting review</p>
          <p className="ad-section-subtitle">Approve before publication, or reject with reason.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {pending.map(p => (
              <div key={p.id} style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 110, background: "#e6f4f1" }} />
                <div style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</p>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>GH₵{p.rent}/mo</p>
                  </div>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{p.address}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>By {p.landlord}</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="ad-btn ad-btn--outline" onClick={() => reject(p.id)}>⊘ Reject</button>
                      <button className="ad-btn ad-btn--primary" onClick={() => approve(p.id)}>✓ Approve</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ad-card" style={{ padding: 20 }}>
        <p className="ad-section-title" style={{ marginBottom: 16 }}>All listings</p>
        <table className="ad-table" style={{ width: "100%" }}>
          <thead>
            <tr><th>Property</th><th>Landlord</th><th>Rent</th><th>Status</th><th>Occupancy</th><th style={{ textAlign: "right" }}>Actions</th></tr>
          </thead>
          <tbody>
            {properties.length === 0 && (
              <tr><td colSpan={6}><EmptyState text="No properties yet." /></td></tr>
            )}
            {properties.map(p => (
              <tr key={p.id}>
                <td><p style={{ fontWeight: 600 }}>{p.name}</p><p style={{ fontSize: 12, color: "#9ca3af" }}>{p.address}</p></td>
                <td>{p.landlord}</td>
                <td style={{ fontWeight: 600 }}>GH₵{p.rent}</td>
                <td><Badge label={p.status} tone={statusTone[p.status] || "gray"} /></td>
                <td><Badge label={p.occupancy} tone={occupancyTone[p.occupancy] || "gray"} /></td>
                <td style={{ textAlign: "right" }}><button className="ad-action-btn ad-action-btn--danger" onClick={() => flag(p.id)} title="Flag">🚩</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Complaints & Disputes
// ─────────────────────────────────────────────
function ComplaintsAdminPage() {
  // TODO: fetch('/api/admin/complaints').then(r => r.json()).then(setDisputes)
  const [disputes, setDisputes] = useState([]);
  const [complaintTrends, setComplaintTrends] = useState([]);
  const [filter, setFilter] = useState("All");

  const open       = disputes.filter(d => d.status === "Open").length;
  const escalated  = disputes.filter(d => d.status === "Escalated").length;
  const resolved   = disputes.filter(d => d.status === "Resolved").length;
  const rate       = disputes.length > 0 ? Math.round((resolved / disputes.length) * 100) : 0;

  const filters    = ["All", "Open", "Escalated", "In Review", "Resolved"];
  const filtered   = filter === "All" ? disputes : disputes.filter(d => d.status === filter);

  const priorityTone = { High: "red", Medium: "yellow", Low: "blue" };
  const statusTone   = { Escalated: "red", "In Review": "yellow", Open: "blue", Resolved: "green" };

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Complaints & disputes</h1>
      <p className="ad-page-sub">Open issues between tenants and landlords.</p>

      <div className="ad-stats">
        {[["Open", open, "#111827"], ["Escalated", escalated, "#111827"], ["Resolved", resolved, "#111827"], [`${rate}%`, "Resolution rate", "#111827"]].map(([val, label]) => (
          <div key={label} className="ad-stat-card">
            <p className="ad-stat-label">{label}</p>
            <p className="ad-stat-value">{val}</p>
          </div>
        ))}
      </div>

      <div className="ad-two-col">
        <div className="ad-card">
          <div className="ad-section-header">
            <div><p className="ad-section-title">Active complaints & disputes</p></div>
            <button className="ad-btn ad-btn--outline" style={{ fontSize: 12 }} onClick={() => alert("Generating trend report...")}>📄 Trend report</button>
          </div>
          <p className="ad-section-subtitle">Click a row to open the case</p>

          <div className="ad-filters" style={{ marginBottom: 12 }}>
            {filters.map(f => <button key={f} className={`ad-filter-btn ${filter === f ? "ad-filter-btn--active" : ""}`} onClick={() => setFilter(f)}>{f}</button>)}
          </div>

          <table className="ad-table" style={{ width: "100%" }}>
            <thead><tr><th>Issue</th><th>Parties</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={5}><EmptyState text="No complaints yet." /></td></tr>}
              {filtered.map(d => (
                <tr key={d.id} style={{ cursor: "pointer" }}>
                  <td><p style={{ fontWeight: 600 }}>{d.title}</p><p style={{ fontSize: 12, color: "#9ca3af" }}>{d.id} · {d.property}</p></td>
                  <td><p style={{ fontSize: 13 }}>{d.partyA}</p><p style={{ fontSize: 12, color: "#9ca3af" }}>vs {d.partyB}</p></td>
                  <td><Badge label={d.priority} tone={priorityTone[d.priority] || "gray"} /></td>
                  <td><Badge label={d.status}   tone={statusTone[d.status] || "gray"} /></td>
                  <td><button className="ad-section-link" onClick={() => alert(`Opening case ${d.id}`)}>Open ↗</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ad-card" style={{ maxHeight: 480 }}>
          <p className="ad-section-title">Complaint trends</p>
          <p className="ad-section-subtitle">By category</p>
          {complaintTrends.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={complaintTrends} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false}/>
                <XAxis type="number" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} width={90}/>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
                <Bar dataKey="count" fill="#1a6b5a" radius={[0, 6, 6, 0]} barSize={18}/>
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyState text="No trend data yet." />}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Payments
// ─────────────────────────────────────────────
function PaymentsAdminPage() {
  // TODO: fetch('/api/admin/payments').then(r => r.json()).then(...)
  const [paymentStats, setPaymentStats]   = useState({ collected: 0, failed: 0, flagged: 0, pending: 0 });
  const [revenueData, setRevenueData]     = useState([]);
  const [transactions, setTransactions]   = useState([]);

  const txTone = { Completed: "green", Failed: "red", Flagged: "yellow", Pending: "blue" };

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Payment monitoring</h1>
      <p className="ad-page-sub">Rent transactions and financial integrity.</p>

      <div className="ad-stats">
        <div className="ad-stat-card"><p className="ad-stat-label">Collected (month)</p><p className="ad-stat-value">GH₵{paymentStats.collected.toLocaleString()}</p></div>
        <div className="ad-stat-card"><p className="ad-stat-label">Failed</p><p className="ad-stat-value" style={{ color: "#ef4444" }}>{paymentStats.failed}</p></div>
        <div className="ad-stat-card"><p className="ad-stat-label">Flagged</p><p className="ad-stat-value" style={{ color: "#ef4444" }}>{paymentStats.flagged}</p></div>
        <div className="ad-stat-card"><p className="ad-stat-label">Pending</p><p className="ad-stat-value">{paymentStats.pending}</p></div>
      </div>

      <div className="ad-card" style={{ marginBottom: 24 }}>
        <p className="ad-section-title">Rent revenue trend</p>
        <p className="ad-section-subtitle">Aggregated across all properties · GH₵</p>
        {revenueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a6b5a" stopOpacity={0.3}/><stop offset="100%" stopColor="#1a6b5a" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={v => `GH₵${v/1000}k`} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v => `GH₵${v.toLocaleString()}`} contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
              <Area type="monotone" dataKey="revenue" stroke="#1a6b5a" strokeWidth={2} fill="url(#rg2)" dot={{ r: 3, fill: "#1a6b5a" }}/>
              <Area type="monotone" dataKey="payouts" stroke="#10b981" strokeWidth={2} fillOpacity={0} dot={{ r: 3, fill: "#10b981" }}/>
            </AreaChart>
          </ResponsiveContainer>
        ) : <EmptyState text="No revenue data yet." />}
      </div>

      <div className="ad-card" style={{ padding: 20 }}>
        <div className="ad-section-header">
          <div><p className="ad-section-title">Transactions</p><p className="ad-section-subtitle">Including failed and flagged payments</p></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="ad-btn ad-btn--outline" onClick={() => alert("Scanning...")}>⚠️ Anomaly scan</button>
            <button className="ad-btn ad-btn--primary" onClick={() => alert("Exporting...")}>⬇️ Export</button>
          </div>
        </div>
        <table className="ad-table" style={{ width: "100%" }}>
          <thead><tr><th>TX ID</th><th>Tenant</th><th>Property</th><th>Method</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {transactions.length === 0 && <tr><td colSpan={7}><EmptyState text="No transactions yet." /></td></tr>}
            {transactions.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 600, color: "#374151" }}>{t.id}</td>
                <td>{t.tenant}</td>
                <td style={{ color: "#6b7280" }}>{t.property}</td>
                <td style={{ color: "#6b7280" }}>{t.method}</td>
                <td style={{ color: "#9ca3af" }}>{t.date}</td>
                <td style={{ fontWeight: 700 }}>GH₵{t.amount?.toLocaleString()}</td>
                <td><Badge label={t.status} tone={txTone[t.status] || "gray"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Reports & Analytics
// ─────────────────────────────────────────────
function ReportsPage() {
  // TODO: fetch('/api/admin/reports').then(r => r.json()).then(...)
  const [revenueData, setRevenueData]     = useState([]);
  const [complaintMix, setComplaintMix]   = useState([]);

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Reports & analytics</h1>
      <p className="ad-page-sub">KPIs, exports, and operational insights.</p>

      <div className="ad-two-col">
        <div className="ad-card">
          <p className="ad-section-title">Platform revenue (6mo)</p>
          <p className="ad-section-subtitle">Top-line KPI for the executive readout</p>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rg3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a6b5a" stopOpacity={0.3}/><stop offset="100%" stopColor="#1a6b5a" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <YAxis tickFormatter={v => `GH₵${v/1000}k`} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
                <Tooltip formatter={v => `GH₵${v.toLocaleString()}`} contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
                <Area type="monotone" dataKey="revenue" stroke="#1a6b5a" strokeWidth={2} fill="url(#rg3)"/>
              </AreaChart>
            </ResponsiveContainer>
          ) : <EmptyState text="No revenue data yet." />}
        </div>

        <div className="ad-card">
          <p className="ad-section-title">Complaint mix</p>
          <p className="ad-section-subtitle">Distribution by category</p>
          {complaintMix.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={complaintMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                    {complaintMix.map((_, i) => <Cell key={i} fill={donutColors[i % donutColors.length]} stroke="white" strokeWidth={2}/>)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                {complaintMix.map((s, i) => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: donutColors[i % donutColors.length], display: "inline-block" }}/>
                    <span style={{ fontSize: 12, color: "#374151" }}>{s.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : <EmptyState text="No complaint data yet." />}
        </div>
      </div>

      <div className="ad-card">
        <p className="ad-section-title">Report templates</p>
        <p className="ad-section-subtitle">Generate ready-to-share exports</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {reportTemplates.map(r => (
            <div key={r.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "#e6f4f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{r.icon}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{r.title}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{r.subtitle}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <span className={`ad-tag ${tagClass[r.tag]}`}>{r.tag}</span>
                <button className="ad-btn ad-btn--outline" style={{ fontSize: 12 }} onClick={() => alert(`Exporting "${r.title}"...`)}>⬇️ Export</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Security & Compliance
// ─────────────────────────────────────────────
function SecurityPage() {
  // TODO: fetch('/api/admin/audit-log').then(r => r.json()).then(setAuditLog)
  const [auditLog, setAuditLog] = useState([]);
  const [toggles, setToggles] = useState({ encryptPII: true, enforce2FA: true, autoRedact: false, rightToForget: true });

  const severityTone = { Warn: "yellow", Info: "blue", Critical: "red" };

  const privacyControls = [
    { key: "encryptPII",    label: "Encrypt PII at rest" },
    { key: "enforce2FA",    label: "Enforce 2FA for all admins" },
    { key: "autoRedact",    label: "Auto-redact exports" },
    { key: "rightToForget", label: "Right-to-be-forgotten workflow" },
  ];

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Security & compliance</h1>
      <p className="ad-page-sub">Audit logs, access control, and privacy.</p>

      <div className="ad-two-col">
        {/* Audit log */}
        <div className="ad-card">
          <div className="ad-section-header">
            <div><p className="ad-section-title">Audit log</p><p className="ad-section-subtitle">Every action by users and admins</p></div>
            <button className="ad-btn ad-btn--outline" style={{ fontSize: 12 }} onClick={() => alert("Exporting audit log...")}>⬇️ Export</button>
          </div>
          <table className="ad-table" style={{ width: "100%" }}>
            <thead><tr><th>When</th><th>Actor</th><th>Action</th><th>Target</th><th>Severity</th><th></th></tr></thead>
            <tbody>
              {auditLog.length === 0 && <tr><td colSpan={6}><EmptyState text="No audit log entries yet." /></td></tr>}
              {auditLog.map((log, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{log.when}</td>
                  <td><p style={{ fontSize: 13, fontWeight: 600 }}>{log.actor}</p><p style={{ fontSize: 11, color: "#9ca3af" }}>{log.actorRole}</p></td>
                  <td style={{ fontSize: 13 }}>{log.action}</td>
                  <td style={{ fontSize: 13, color: "#6b7280" }}>{log.target}</td>
                  <td><Badge label={log.severity} tone={severityTone[log.severity] || "gray"} /></td>
                  <td><button className="ad-action-btn" title="View details">👁</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Privacy controls */}
        <div className="ad-card">
          <p className="ad-section-title">Privacy & compliance</p>
          <p className="ad-section-subtitle">GDPR-aligned controls</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {privacyControls.map(ctrl => (
              <div key={ctrl.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{ctrl.label}</span>
                <Toggle checked={toggles[ctrl.key]} onChange={() => setToggles(t => ({ ...t, [ctrl.key]: !t[ctrl.key] }))} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RBAC table */}
      <div className="ad-card" style={{ marginTop: 24 }}>
        <p className="ad-section-title">Role-based access control</p>
        <p className="ad-section-subtitle">Super admin vs support admin vs auditor</p>
        <table className="ad-table" style={{ width: "100%" }}>
          <thead><tr><th>Resource</th><th>Super admin</th><th>Support admin</th><th>Auditor</th></tr></thead>
          <tbody>
            {accessControlRows.map(row => (
              <tr key={row.resource}>
                <td style={{ fontWeight: 500 }}>{row.resource}</td>
                <td style={{ color: "#1a6b5a", fontWeight: 600 }}>{row.superAdmin}</td>
                <td>{row.supportAdmin}</td>
                <td>{row.auditor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Placeholder
// ─────────────────────────────────────────────
function PlaceholderPage({ title }) {
  return (
    <div className="ad-placeholder">
      <span className="ad-placeholder-icon">🚧</span>
      <p className="ad-placeholder-title">{title}</p>
      <p className="ad-placeholder-sub">Coming soon</p>
    </div>
  );
}


// ─────────────────────────────────────────────
// ROOT: Admin
// ─────────────────────────────────────────────
export default function Admin() {
  const [activePage, setActivePage]     = useState("dashboard");
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  // TODO: fetch('/api/admin/me').then(r => r.json()).then(setAdmin)
  const [admin, setAdmin] = useState(null);

  return (
    <div className="ad-layout">
      {/* Mobile hamburger */}
      <button className="ad-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {sidebarOpen
            ? <path d="M18 6L6 18M6 6l12 12"/>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
          }
        </svg>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="ad-overlay" onClick={() => setSidebarOpen(false)} />}

      <Sidebar activePage={activePage} onNavigate={setActivePage} admin={admin} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="ad-main">
        <TopBar pageLabel={TAB_TITLES[activePage]} />
        <div className="ad-content">
          {activePage === "dashboard"  && <DashboardPage onNavigate={setActivePage} />}
          {activePage === "users"      && <UsersPage />}
          {activePage === "properties" && <PropertiesPage />}
          {activePage === "complaints" && <ComplaintsAdminPage />}
          {activePage === "payments"   && <PaymentsAdminPage />}
          {activePage === "reports"    && <ReportsPage />}
          {activePage === "settings"   && <PlaceholderPage title="Settings" />}
          {activePage === "security"   && <SecurityPage />}
        </div>
      </main>
    </div>
  );
}
