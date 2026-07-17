import {
  Wallet,
  ShieldCheck,
  MessageSquare,
  Bell,
  CreditCard,
  RefreshCw,
  Settings,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Badge from "../components/Badge";
import {
  tenant,
  lease,
  invoice,
  paymentHistory,
  initialComplaints,
  initialNotifications,
} from "../data/mockData";

function leaseProgress() {
  const start = new Date(lease.startDate);
  const end = new Date(lease.endDate);
  const today = new Date("2026-03-20"); // reference "today" within the app's mock timeline
  const total = end - start;
  const done = Math.min(Math.max(today - start, 0), total);
  const pct = Math.round((done / total) * 100);
  const monthsLeft = Math.max(0, Math.round((end - today) / (1000 * 60 * 60 * 24 * 30)));
  return { pct, monthsLeft };
}

export default function Dashboard({ onNavigate }) {
  const openComplaints = initialComplaints.filter((c) => c.status !== "Resolved").length;
  const unreadCount = initialNotifications.filter((n) => !n.isRead).length;
  const { pct, monthsLeft } = leaseProgress();

  const actions = [
    { icon: CreditCard, label: "Make Payment", color: "var(--brand-500)", page: "payments" },
    { icon: MessageSquare, label: "Report Issue", color: "var(--amber-500)", page: "complaints" },
    { icon: RefreshCw, label: "Renew Contract", color: "var(--blue-500)", page: "contract" },
    { icon: Settings, label: "Settings", color: "var(--brand-700)", page: "settings" },
  ];

  const stats = [
    {
      label: "Current Rent",
      value: `${tenant.currency}${tenant.rent.toLocaleString()}`,
      foot: `Due ${tenant.dueDate}`,
      icon: Wallet,
      brand: true,
    },
    {
      label: "Lease Status",
      value: lease.status,
      foot: `Ends ${lease.endDate}`,
      icon: ShieldCheck,
    },
    {
      label: "Open Complaints",
      value: openComplaints,
      foot: openComplaints ? "Awaiting response" : "All clear",
      icon: MessageSquare,
    },
    {
      label: "Notifications",
      value: unreadCount,
      foot: unreadCount ? "Unread updates" : "You're all caught up",
      icon: Bell,
    },
  ];

  const circumference = 2 * Math.PI * 52;
  const dash = (pct / 100) * circumference;

  return (
    <div>
      <div className="hero-band">
        <div>
          <p className="hero-eyebrow">Welcome back,</p>
          <h1 className="hero-name">{tenant.name}</h1>
          <p className="hero-meta">
            <MapPin size={14} /> {tenant.property} · {tenant.unit}
          </p>
        </div>
        <Badge tone={tenant.isPaid ? "green" : "red"}>{tenant.isPaid ? "Rent Paid" : "Rent Unpaid"}</Badge>
      </div>

      <div className="stat-grid">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`stat-card ${s.brand ? "is-brand" : ""}`}>
              <div className="stat-card-top">
                <span className="stat-card-label">{s.label}</span>
                <span className="stat-card-icon">
                  <Icon size={16} strokeWidth={2.2} />
                </span>
              </div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-foot">{s.foot}</div>
            </div>
          );
        })}
      </div>

      <p className="section-label">Quick Actions</p>
      <div className="action-grid" style={{ marginBottom: 20 }}>
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button key={a.label} className="action-card" onClick={() => onNavigate(a.page)}>
              <span className="action-icon" style={{ background: a.color }}>
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <span className="action-label">{a.label}</span>
            </button>
          );
        })}
      </div>

      <div className="two-col">
        <div className="card card-pad">
          <div className="card-row" style={{ marginBottom: 16 }}>
            <span className="card-title">Recent Payments</span>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate("payments")}>
              View all
            </button>
          </div>
          {paymentHistory.slice(0, 3).map((p) => (
            <div key={p.id} className="card-row">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-800)" }}>{p.month}</div>
                <div style={{ fontSize: 12, color: "var(--ink-400)" }}>Paid {p.paidOn}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-800)" }}>
                  {invoice.currency}
                  {p.amount.toLocaleString()}
                </div>
                <Badge tone="green">Paid</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="card card-pad" style={{ display: "flex", flexDirection: "column" }}>
          <span className="card-title" style={{ marginBottom: 18 }}>
            Lease Progress
          </span>
          <div className="center-row">
            <div className="ring-wrap">
              <svg viewBox="0 0 120 120" width="128" height="128">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line-soft)" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="var(--brand-500)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="ring-value">
                <span className="ring-number">{pct}%</span>
                <span className="ring-caption">elapsed</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13.5, color: "var(--ink-500)", marginBottom: 8 }}>
                <CheckCircle2 size={14} style={{ verticalAlign: -2, marginRight: 6, color: "var(--green-600)" }} />
                {lease.status} lease
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-400)" }}>~{monthsLeft} months remaining</div>
              <div style={{ fontSize: 13, color: "var(--ink-400)", marginTop: 4 }}>
                {lease.startDate} – {lease.endDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
