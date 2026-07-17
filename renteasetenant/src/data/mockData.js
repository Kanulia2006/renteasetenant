export const tenant = {
  name: "Kofi Asante",
  property: "Golden Tulip Residences",
  unit: "Unit 4B",
  rent: 1800,
  currency: "GH₵",
  dueDate: "2026-03-01",
  period: "March 2026",
  isPaid: false,
};

export const user = {
  name: "Kofi Asante",
  initials: "KA",
  email: "kofi.asante@email.com",
  role: "Tenant",
};

export const invoice = {
  period: "March 2026",
  dueDate: "2026-03-01",
  property: "Golden Tulip Residences, 4B",
  amount: 1800,
  currency: "GH₵",
};

export const paymentHistory = [
  { id: 1, month: "February 2026", paidOn: "2026-01-29", amount: 1800 },
  { id: 2, month: "January 2026", paidOn: "2025-12-30", amount: 1800 },
  { id: 3, month: "December 2025", paidOn: "2025-11-28", amount: 1800 },
];

export const periods = [
  { label: "1 Month", months: 1 },
  { label: "3 Months", months: 3 },
  { label: "6 Months", months: 6 },
];

export const lease = {
  property: "Golden Tulip Residences",
  unit: "Unit 4B",
  startDate: "Jan 1, 2025",
  endDate: "Dec 31, 2026",
  monthlyRent: 1800,
  currency: "GH₵",
  status: "Active",
};

export const initialNotifications = [
  { id: 1, type: "reminder", title: "Rent Reminder", message: "Your rent for March 2026 is due on March 1st.", date: "2026-02-25", isRead: false },
  { id: 2, type: "maintenance", title: "Maintenance Scheduled", message: "Building maintenance scheduled for March 22nd, 9am-12pm.", date: "2026-03-18", isRead: false },
  { id: 3, type: "lease", title: "Lease Renewal", message: "Your lease expires in 60 days. Contact us to discuss renewal options.", date: "2026-03-15", isRead: true },
  { id: 4, type: "complaint", title: "Complaint Update", message: "Your AC complaint has been resolved. Please confirm.", date: "2026-03-12", isRead: true },
];

export const initialComplaints = [
  { id: 1, category: "Plumbing", tenant: "Kofi Asante", property: "Golden Tulip Residences", description: "Kitchen faucet has been leaking for 3 days. Water is pooling under the sink.", date: "2026-03-18", status: "Open", priority: "HIGH" },
  { id: 2, category: "Electrical", tenant: "Abena Darkwa", property: "Santasi Family Home", description: "Living room light switch sparks occasionally when toggled.", date: "2026-03-15", status: "In-Progress", priority: "HIGH" },
  { id: 3, category: "Noise", tenant: "Yaw Boateng", property: "Teshie Beachside Studio", description: "Excessive noise from upstairs neighbour after 11pm regularly.", date: "2026-03-17", status: "Open", priority: "MEDIUM" },
  { id: 4, category: "HVAC", tenant: "Kofi Asante", property: "Golden Tulip Residences", description: "AC unit stopped working. Temperature inside is uncomfortably high.", date: "2026-03-10", status: "Resolved", priority: "HIGH" },
];

export const initialReviews = [
  { id: 1, property: "Golden Tulip Residences", rating: 4, comment: "Great location, responsive landlord. Minor parking issues.", author: "Kofi Asante", date: "2026-02-10" },
  { id: 2, property: "Santasi Family Home", rating: 5, comment: "Amazing property, well-maintained. Highly recommend.", author: "Abena Darkwa", date: "2026-01-20" },
];

export const roles = ["Landlord", "Tenant", "Prospective Tenant"];
export const complaintCategories = ["Plumbing", "Electrical", "HVAC", "Pest Control", "Noise", "Other"];
export const properties = ["Golden Tulip Residences", "Santasi Family Home", "Teshie Beachside Studio"];
