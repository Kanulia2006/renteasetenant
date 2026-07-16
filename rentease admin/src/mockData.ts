import {
  StatItem,
  RevenueItem,
  ComplaintCategoryItem,
  ComplaintMixItem,
  Dispute,
  Transaction,
  User,
  Property,
  AuditLog,
  AdminUser
} from "./types";

export const initialAdmin: AdminUser = {
  name: "Kofi Mensah",
  role: "System Super Admin",
  email: "kofi.mensah@rentease.com"
};

export const initialStats: StatItem[] = [
  { label: "Total active users", value: 1420, change: "12%", trend: "up" },
  { label: "Active listings", value: 384, change: "8%", trend: "up" },
  { label: "Monthly transaction volume", value: 452000, suffix: " GH₵", change: "18%", trend: "up" },
  { label: "Pending disputes", value: 14, change: "5%", trend: "down" }
];

export const initialRevenueData: RevenueItem[] = [
  { month: "Jan", revenue: 210000, payouts: 185000 },
  { month: "Feb", revenue: 245000, payouts: 220000 },
  { month: "Mar", revenue: 310000, payouts: 280000 },
  { month: "Apr", revenue: 290000, payouts: 265000 },
  { month: "May", revenue: 380000, payouts: 340000 },
  { month: "Jun", revenue: 452000, payouts: 410000 }
];

export const initialComplaintsData: ComplaintCategoryItem[] = [
  { category: "Maintenance", count: 48 },
  { category: "Disputes", count: 24 },
  { category: "Payments", count: 18 },
  { category: "Policies", count: 12 },
  { category: "Other", count: 6 }
];

export const initialComplaintsMix: ComplaintMixItem[] = [
  { name: "Maintenance & Repairs", value: 48 },
  { name: "Security Deposit Disputes", value: 24 },
  { name: "Late Rent Issues", value: 18 },
  { name: "Noise & Conduct", value: 12 },
  { name: "Contract Misunderstandings", value: 6 }
];

export const initialDisputes: Dispute[] = [
  {
    id: "DSP-042",
    title: "Unresolved plumbing leak at East Legon",
    property: "East Legon Executive Apartment",
    partyA: "Abena Osei (Tenant)",
    partyB: "Kwame Boateng (Landlord)",
    parties: "Abena vs Kwame",
    priority: "High",
    status: "Escalated"
  },
  {
    id: "DSP-039",
    title: "Wrongful security deposit deduction",
    property: "Cantonments Luxury Suite",
    partyA: "Ekow Appiah (Tenant)",
    partyB: "Elizabeth Alabi (Landlord)",
    parties: "Ekow vs Elizabeth",
    priority: "Medium",
    status: "In Review"
  },
  {
    id: "DSP-037",
    title: "Delayed key collection & access dispute",
    property: "Airport Residential Studio",
    partyA: "Yaw Addo (Tenant)",
    partyB: "Emmanuel Tetteh (Landlord)",
    parties: "Yaw vs Emmanuel",
    priority: "Low",
    status: "Open"
  },
  {
    id: "DSP-031",
    title: "Unauthorized subletting conflict",
    property: "Spintex Road Townhouse",
    partyA: "George Gyamfi (Landlord)",
    partyB: "Selasi Agbenu (Tenant)",
    parties: "George vs Selasi",
    priority: "High",
    status: "Resolved"
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: "TXN-90812",
    tenant: "Ama Serwaa",
    property: "Dzorwulu Twin Villa",
    method: "Mobile Money (MTN)",
    date: "2026-07-14",
    amount: 14500,
    status: "Completed",
    party: "Ama Serwaa to Kofi Asare"
  },
  {
    id: "TXN-90743",
    tenant: "Nii Lantei",
    property: "Labone Garden Flat",
    method: "Bank Transfer (GCB)",
    date: "2026-07-12",
    amount: 8200,
    status: "Flagged",
    party: "Nii Lantei to Gladys Ofori"
  },
  {
    id: "TXN-90651",
    tenant: "Adjoa Danso",
    property: "East Legon Executive Apartment",
    method: "Visa Card",
    date: "2026-07-10",
    amount: 5000,
    status: "Completed",
    party: "Adjoa Danso to Kwame Boateng"
  },
  {
    id: "TXN-90510",
    tenant: "Kojo Antwi",
    property: "Tema Community 9 Oasis",
    method: "Mobile Money (Telecel)",
    date: "2026-07-08",
    amount: 3200,
    status: "Failed",
    party: "Kojo Antwi to Joshua Mensah"
  },
  {
    id: "TXN-90400",
    tenant: "Sena Amenyo",
    property: "Osu Heritage Loft",
    method: "Mobile Money (MTN)",
    date: "2026-07-06",
    amount: 6500,
    status: "Pending",
    party: "Sena Amenyo to Anita Cudjoe"
  }
];

export const initialUsers: User[] = [
  {
    id: "USR-001",
    name: "Kwame Boateng",
    email: "kwame.boateng@gmail.com",
    role: "Landlord",
    status: "Active",
    lastActive: "2 hours ago",
    initials: "KB"
  },
  {
    id: "USR-002",
    name: "Abena Osei",
    email: "abena.osei95@yahoo.com",
    role: "Tenant",
    status: "Active",
    lastActive: "15 minutes ago",
    initials: "AO"
  },
  {
    id: "USR-003",
    name: "Ekow Appiah",
    email: "ekow.appiah@outlook.com",
    role: "Tenant",
    status: "Active",
    lastActive: "1 day ago",
    initials: "EA"
  },
  {
    id: "USR-004",
    name: "Gladys Ofori",
    email: "g_ofori@gmail.com",
    role: "Landlord",
    status: "Active",
    lastActive: "3 days ago",
    initials: "GO"
  },
  {
    id: "USR-005",
    name: "Mawuli Agbenu",
    email: "mawuli.ag@gmail.com",
    role: "Prospect",
    status: "Pending",
    lastActive: "5 days ago",
    initials: "MA"
  },
  {
    id: "USR-006",
    name: "Sowah Gbedemah",
    email: "sowah.g@yahoo.com",
    role: "Tenant",
    status: "Suspended",
    lastActive: "2 weeks ago",
    initials: "SG"
  }
];

export const initialProperties: Property[] = [
  {
    id: "PRP-101",
    name: "East Legon Executive Apartment",
    address: "Block B, East Legon High Street, Accra",
    rent: 5000,
    status: "Live",
    occupancy: "Occupied",
    landlord: "Kwame Boateng"
  },
  {
    id: "PRP-102",
    name: "Labone Garden Flat",
    address: "14 Circular Rd, Labone, Accra",
    rent: 8200,
    status: "Flagged",
    occupancy: "Occupied",
    landlord: "Gladys Ofori"
  },
  {
    id: "PRP-103",
    name: "Kumasi Cozy Penthouse",
    address: "Ridge Residential Area, Kumasi",
    rent: 3800,
    status: "Pending Review",
    occupancy: "Vacant",
    landlord: "George Gyamfi"
  },
  {
    id: "PRP-104",
    name: "Osu Heritage Loft",
    address: "Mission Street, Osu, Accra",
    rent: 6500,
    status: "Pending Review",
    occupancy: "Vacant",
    landlord: "Anita Cudjoe"
  },
  {
    id: "PRP-105",
    name: "Dzorwulu Twin Villa",
    address: "Olusegun Obasanjo Way, Dzorwulu",
    rent: 14500,
    status: "Live",
    occupancy: "Occupied",
    landlord: "Kofi Asare"
  }
];

export const initialAuditLog: AuditLog[] = [
  {
    when: "2026-07-15 17:45",
    actor: "Kofi Mensah",
    actorRole: "Super Admin",
    action: "Dispute Escalated Access",
    target: "DSP-042",
    severity: "Info"
  },
  {
    when: "2026-07-15 16:30",
    actor: "System Sentinel",
    actorRole: "Automated Bot",
    action: "Anomaly Flag Triggered",
    target: "TXN-90743",
    severity: "Warn"
  },
  {
    when: "2026-07-15 14:12",
    actor: "Kofi Mensah",
    actorRole: "Super Admin",
    action: "Suspended User Access",
    target: "USR-006 (Sowah Gbedemah)",
    severity: "Critical"
  },
  {
    when: "2026-07-15 11:05",
    actor: "Kwame Boateng",
    actorRole: "Landlord",
    action: "Created Listing Draft",
    target: "PRP-101",
    severity: "Info"
  },
  {
    when: "2026-07-15 09:20",
    actor: "System Shield",
    actorRole: "Security Engine",
    action: "Failed Login Attempt x5",
    target: "Admin Portal IP: 192.168.1.105",
    severity: "Critical"
  }
];
