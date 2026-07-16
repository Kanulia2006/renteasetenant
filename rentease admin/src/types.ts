export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  change: string;
  trend: "up" | "down";
}

export interface RevenueItem {
  month: string;
  revenue: number;
  payouts: number;
}

export interface ComplaintCategoryItem {
  category: string;
  count: number;
}

export interface ComplaintMixItem {
  name: string;
  value: number;
}

export interface Dispute {
  id: string;
  title: string;
  property: string;
  partyA: string;
  partyB: string;
  parties: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Escalated" | "In Review" | "Resolved";
}

export interface Transaction {
  id: string;
  tenant: string;
  property: string;
  method: string;
  date: string;
  amount: number;
  status: "Completed" | "Failed" | "Flagged" | "Pending";
  party: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Landlord" | "Tenant" | "Prospect";
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
  initials: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  rent: number;
  status: "Live" | "Pending Review" | "Flagged" | "Rejected";
  occupancy: "Occupied" | "Vacant";
  landlord: string;
}

export interface AuditLog {
  when: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  severity: "Info" | "Warn" | "Critical";
}

export interface AdminUser {
  name: string;
  role: string;
  email: string;
}
