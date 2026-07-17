import { useState } from "react";
import { Bell, Wrench, FileClock, MessageSquare, CheckCircle2 } from "lucide-react";
import Badge from "../components/Badge";
import { initialNotifications } from "../data/mockData";

const iconMap = {
  reminder: Bell,
  maintenance: Wrench,
  lease: FileClock,
  complaint: MessageSquare,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div>
      <div className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-desc">Updates about your rental and account.</p>
        </div>
        {unreadCount > 0 && <Badge tone="red">{unreadCount} new</Badge>}
      </div>

      <div className="max-w" style={{ maxWidth: 620 }}>
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || Bell;
          return (
            <div
              key={n.id}
              onClick={() =>
                setNotifications(notifications.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)))
              }
              className={`row-card ${!n.isRead ? "is-unread" : ""}`}
              style={{ alignItems: "flex-start", cursor: "pointer" }}
            >
              <span className="notif-icon">
                <Icon size={18} />
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14.5, color: "var(--ink-800)", marginBottom: 4 }}>
                  {n.title}
                </p>
                <p style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 6 }}>{n.message}</p>
                <p style={{ fontSize: 12, color: "var(--ink-400)" }}>{n.date}</p>
              </div>
            </div>
          );
        })}
        {unreadCount === 0 && (
          <div className="empty-state">
            <CheckCircle2 size={28} />
            <p style={{ fontSize: 14 }}>You're all caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
