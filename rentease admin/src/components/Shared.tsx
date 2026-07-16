import React from "react";
import {
  IconDashboard,
  IconUsers,
  IconProperties,
  IconComplaints,
  IconPayments,
  IconReports,
  IconSecurity
} from "./Icons";

// ─────────────────────────────────────────────
// DATA STRUCTURE / CONSTANTS
// ─────────────────────────────────────────────
export const NAV_ITEMS = [
  { key: "dashboard",  label: "Dashboard",  Icon: IconDashboard },
  { key: "users",      label: "Users",       Icon: IconUsers },
  { key: "properties", label: "Properties",  Icon: IconProperties },
  { key: "complaints", label: "Complaints",  Icon: IconComplaints },
  { key: "payments",   label: "Payments",    Icon: IconPayments },
  { key: "reports",    label: "Reports",     Icon: IconReports },
  { key: "security",   label: "Security",    Icon: IconSecurity },
];

export const TAB_TITLES: Record<string, string> = {
  dashboard:  "Dashboard Overview",
  users:      "User Management & Moderation",
  properties: "Property Oversight & Approvals",
  complaints: "Complaints & Dispute Resolution",
  payments:   "Financial Audit & Transactions",
  reports:    "Executive Reports & Analytics",
  security:   "Compliance & Cyber Security Audit",
};

export const accessControlRows = [
  { resource: "User Administration", superAdmin: "Full Control", supportAdmin: "Moderate Only", auditor: "Audit Read-Only" },
  { resource: "Property Appraisals", superAdmin: "Full Control", supportAdmin: "Review Drafts",  auditor: "Audit Read-Only" },
  { resource: "Payment Gateways",    superAdmin: "Full Control", supportAdmin: "Audit logs",     auditor: "Audit Read-Only" },
  { resource: "System Security Rules", superAdmin: "Full Control", supportAdmin: "No Access",     auditor: "Read Compliance" },
  { resource: "Platform Auditing",   superAdmin: "Full Control", supportAdmin: "Read logs",     auditor: "Full Access" }
];

export const donutColors = ["#1a6b5a", "#2f9e83", "#6ee7b7", "#a7f3d0", "#d1fae5"];

export const reportTemplates = [
  { icon: "📊", title: "Monthly Financial Ledger",  subtitle: "Full revenue, platform commission & transaction flow · CSV", tag: "FINANCIAL"   },
  { icon: "🏢", title: "Comprehensive Occupancy & Vacancy Readout", subtitle: "Zonal occupancy charts, average duration of tenancy · PDF",  tag: "OPERATIONAL" },
  { icon: "📋", title: "Complaint Matrix & Issue Analysis",   subtitle: "Time-to-resolve indexes, core repair hot-spots · PDF", tag: "OPERATIONAL" },
  { icon: "👥", title: "User Enrollment & Cohort Tracking",     subtitle: "Annual landlord onboarding ratios & tenant cohorts · CSV",   tag: "ACADEMIC"    },
];

export const tagClass: Record<string, string> = {
  FINANCIAL: "ad-tag--green",
  OPERATIONAL: "ad-tag--blue",
  ACADEMIC: "ad-tag--amber"
};

// Helper: Download generator
export function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────
// COMPONENT: Badge
// ─────────────────────────────────────────────
interface BadgeProps {
  label: string;
  tone?: "green" | "red" | "yellow" | "blue" | "gray";
}
export function Badge({ label, tone = "gray" }: BadgeProps) {
  return (
    <span className={`ad-badge ad-badge--${tone}`}>
      <span className="ad-badge-dot" />
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: EmptyState
// ─────────────────────────────────────────────
export function EmptyState({ text }: { text: string }) {
  return <div className="ad-empty">{text}</div>;
}

// ─────────────────────────────────────────────
// COMPONENT: Toggle
// ─────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}
export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <label className="ad-toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ad-toggle-track" />
    </label>
  );
}
