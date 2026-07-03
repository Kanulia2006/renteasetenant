import { useState } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const tenant = {
  name: "Kofi Asante",
  property: "Golden Tulip Residences",
  unit: "Unit 4B",
  rent: 1800,
  currency: "GH₵",
  dueDate: "2026-03-01",
  period: "March 2026",
  isPaid: false,
};

const user = {
  name: "Kofi Asante",
  initials: "KA",
  email: "kofi.asante@email.com",
  role: "Tenant",
};

const invoice = {
  period: "March 2026",
  dueDate: "2026-03-01",
  property: "Golden Tulip Residences, 4B",
  amount: 1800,
  currency: "GH₵",
};

const paymentHistory = [
  { id: 1, month: "February 2026", paidOn: "2026-01-29", amount: 1800 },
  { id: 2, month: "January 2026", paidOn: "2025-12-30", amount: 1800 },
  { id: 3, month: "December 2025", paidOn: "2025-11-28", amount: 1800 },
];

const periods = [
  { label: "1 Month", months: 1 },
  { label: "3 Months", months: 3 },
  { label: "6 Months", months: 6 },
];

const lease = {
  property: "Golden Tulip Residences",
  unit: "Unit 4B",
  startDate: "Jan 1, 2025",
  endDate: "Dec 31, 2026",
  monthlyRent: 1800,
  currency: "GH₵",
  status: "Active",
};

const initialNotifications = [
  { id: 1, icon: "🔔", title: "Rent Reminder", message: "Your rent for March 2026 is due on March 1st.", date: "2026-02-25", isRead: false },
  { id: 2, icon: "🔔", title: "Maintenance Scheduled", message: "Building maintenance scheduled for March 22nd, 9am-12pm.", date: "2026-03-18", isRead: false },
  { id: 3, icon: "⏰", title: "Lease Renewal", message: "Your lease expires in 60 days. Contact us to discuss renewal options.", date: "2026-03-15", isRead: true },
  { id: 4, icon: "⏰", title: "Complaint Update", message: "Your AC complaint has been resolved. Please confirm.", date: "2026-03-12", isRead: true },
];

const initialComplaints = [
  { id: 1, category: "Plumbing", tenant: "Kofi Asante", property: "Golden Tulip Residences", description: "Kitchen faucet has been leaking for 3 days. Water is pooling under the sink.", date: "2026-03-18", status: "Open", priority: "HIGH" },
  { id: 2, category: "Electrical", tenant: "Abena Darkwa", property: "Santasi Family Home", description: "Living room light switch sparks occasionally when toggled.", date: "2026-03-15", status: "In-Progress", priority: "HIGH" },
  { id: 3, category: "Noise", tenant: "Yaw Boateng", property: "Teshie Beachside Studio", description: "Excessive noise from upstairs neighbour after 11pm regularly.", date: "2026-03-17", status: "Open", priority: "MEDIUM" },
  { id: 4, category: "HVAC", tenant: "Kofi Asante", property: "Golden Tulip Residences", description: "AC unit stopped working. Temperature inside is uncomfortably high.", date: "2026-03-10", status: "Resolved", priority: "HIGH" },
];

const initialReviews = [
  { id: 1, property: "Golden Tulip Residences", rating: 4, comment: "Great location, responsive landlord. Minor parking issues.", author: "Kofi Asante", date: "2026-02-10" },
  { id: 2, property: "Santasi Family Home", rating: 5, comment: "Amazing property, well-maintained. Highly recommend.", author: "Abena Darkwa", date: "2026-01-20" },
];

const roles = ["Landlord", "Tenant", "Prospective Tenant"];
const complaintCategories = ["Plumbing", "Electrical", "HVAC", "Pest Control", "Noise", "Other"];
const properties = ["Golden Tulip Residences", "Santasi Family Home", "Teshie Beachside Studio"];


// ─────────────────────────────────────────────
// SHARED: PeriodButton
// ─────────────────────────────────────────────
function PeriodButton({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "10px 24px", borderRadius: "999px", border: "1px solid #e5e7eb", background: active ? "#1a6b5a" : "white", color: active ? "white" : "#374151", fontWeight: active ? 600 : 400, fontSize: "14px", cursor: "pointer", transition: "all 0.15s" }}>
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// SHARED: NavItem
// ─────────────────────────────────────────────
function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", borderRadius: "8px", border: "none", background: active ? "#e6f4f1" : "transparent", color: active ? "#1a6b5a" : "#555", fontWeight: active ? 600 : 400, fontSize: "14px", cursor: "pointer", textAlign: "left" }}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// SHARED: StarRating — shows stars
// ─────────────────────────────────────────────
function StarRating({ rating, onRate }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate && onRate(star)}
          style={{ fontSize: "22px", color: star <= rating ? "#f59e0b" : "#d1d5db", cursor: onRate ? "pointer" : "default" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SHARED: Sidebar
// ─────────────────────────────────────────────
function Sidebar({ activePage, onNavigate, currentRole, onRoleChange }) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { icon: "⊞", label: "Dashboard", page: "dashboard" },
    { icon: "💳", label: "Payments", page: "payments" },
    { icon: "📄", label: "Contract", page: "contract" },
    { icon: "🔔", label: "Notifications", page: "notifications" },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ];

  return (
    <div style={{ width: "220px", minHeight: "100vh", background: "white", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", padding: "20px 12px", flexShrink: 0, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", paddingLeft: "8px" }}>
        <div style={{ width: "36px", height: "36px", background: "#1a6b5a", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🏠</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "15px" }}>RentEase</div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Tenant</div>
        </div>
      </div>

      <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, marginBottom: "8px", paddingLeft: "12px", letterSpacing: "0.05em" }}>Navigation</p>
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "auto" }}>
        {navItems.map((item) => (
          <NavItem key={item.page} icon={item.icon} label={item.label} active={activePage === item.page} onClick={() => onNavigate(item.page)} />
        ))}
      </nav>

      <div style={{ marginTop: "24px", marginBottom: "16px", position: "relative" }}>
        <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, marginBottom: "8px", paddingLeft: "12px", letterSpacing: "0.05em" }}>Switch Role</p>
        <div onClick={() => setRoleDropdownOpen(!roleDropdownOpen)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#f9fafb", borderRadius: "8px", fontSize: "14px", cursor: "pointer", border: "1px solid #e5e7eb" }}>
          <span>{currentRole}</span>
          <span>{roleDropdownOpen ? "▴" : "▾"}</span>
        </div>
        {roleDropdownOpen && (
          <div style={{ position: "absolute", bottom: "48px", left: 0, right: 0, background: "white", border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 100 }}>
            {roles.map((role, i) => (
              <div key={role} onClick={() => { onRoleChange(role); setRoleDropdownOpen(false); }}
                style={{ padding: "12px 16px", fontSize: "14px", cursor: "pointer", background: currentRole === role ? "#fff7ed" : "white", fontWeight: currentRole === role ? 600 : 400, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < roles.length - 1 ? "1px solid #f3f4f6" : "none", color: "#111827" }}>
                <span>{role}</span>
                {currentRole === role && <span style={{ fontSize: "11px", fontWeight: 600, color: "#1a6b5a", background: "#e6f4f1", padding: "2px 8px", borderRadius: "999px" }}>Active</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#1a6b5a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, flexShrink: 0 }}>{user.initials}</div>
        <span style={{ fontSize: "14px", fontWeight: 500, flex: 1 }}>{user.name}</span>
        <span style={{ fontSize: "16px", cursor: "pointer", color: "#9ca3af" }}>⇥</span>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Dashboard
// ─────────────────────────────────────────────
function ActionButton({ icon, label, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px 16px", border: "1px solid #e5e7eb", borderRadius: "12px", background: hovered ? "#f9fafb" : "white", cursor: "pointer", flex: 1, transition: "all 0.15s ease", transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.08)" : "none" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{icon}</div>
      <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>{label}</span>
    </button>
  );
}

function DashboardPage({ onNavigate }) {
  const actions = [
    { icon: "💳", label: "Make Payment", color: "#1a6b5a", page: "payments" },
    { icon: "💬", label: "Complaint", color: "#f59e0b", page: "complaints" },
    { icon: "🔄", label: "Renew Contract", color: "#3b82f6", page: "contract" },
    { icon: "⚙️", label: "Settings", color: "#1a6b5a", page: "settings" },
  ];

  return (
    <div style={{ flex: 1 }}>
      <div style={{ background: "#1a6b5a", color: "white", padding: "32px 40px" }}>
        <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "4px" }}>Welcome back,</p>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "6px" }}>{tenant.name}</h1>
        <p style={{ fontSize: "13px", opacity: 0.7 }}>{tenant.property} • {tenant.unit}</p>
      </div>
      <div style={{ padding: "32px 40px" }}>
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>Current Rent</p>
            <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "6px", color: "#111827" }}>{tenant.currency}{tenant.rent.toLocaleString()}</h2>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>{tenant.period} • Due {tenant.dueDate}</p>
          </div>
          <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, background: tenant.isPaid ? "#d1fae5" : "#fee2e2", color: tenant.isPaid ? "#065f46" : "#991b1b" }}>
            {tenant.isPaid ? "PAID" : "UNPAID"}
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {actions.map((action) => (
            <ActionButton key={action.label} icon={action.icon} label={action.label} color={action.color} onClick={() => onNavigate(action.page)} />
          ))}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Complaints
// ─────────────────────────────────────────────
function ComplaintCard({ complaint }) {
  const statusColors = {
    "Open": { bg: "#fee2e2", color: "#991b1b" },
    "In-Progress": { bg: "#fff7ed", color: "#92400e" },
    "Resolved": { bg: "#d1fae5", color: "#065f46" },
  };
  const priorityColors = { "HIGH": "#ef4444", "MEDIUM": "#f59e0b", "LOW": "#6b7280" };
  const s = statusColors[complaint.status] || statusColors["Open"];

  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "12px", maxWidth: "600px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, background: s.bg, color: s.color, padding: "3px 12px", borderRadius: "999px" }}>{complaint.status}</span>
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>{complaint.date}</span>
      </div>
      <p style={{ fontWeight: 700, fontSize: "16px", color: "#111827", marginBottom: "4px" }}>{complaint.category}</p>
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>{complaint.tenant} • {complaint.property}</p>
      <p style={{ fontSize: "13px", color: "#374151", marginBottom: "14px" }}>{complaint.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: priorityColors[complaint.priority] }}>{complaint.priority} PRIORITY</span>
        {complaint.status !== "Resolved" && <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Awaiting response</span>}
      </div>
    </div>
  );
}

function ComplaintsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [complaints, setComplaints] = useState(initialComplaints);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("HIGH");

  const filters = ["All", "Open", "In-Progress", "Resolved"];
  const filtered = activeFilter === "All" ? complaints : complaints.filter(c => c.status === activeFilter);

  function submitComplaint() {
    if (!category || category === "" || !description) return alert("Please fill in all fields.");
    const complaint = {
      id: complaints.length + 1,
      category,
      tenant: tenant.name,
      property: tenant.property,
      description,
      date: new Date().toISOString().split("T")[0],
      status: "Open",
      priority,
    };
    setComplaints([complaint, ...complaints]);
    setCategory("");
    setDescription("");
    setPriority("HIGH");
    setShowForm(false);
  }

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: "#111827" }}>Complaints</h1>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>Submit and track your complaints</p>

      {/* Submit button */}
      <button onClick={() => setShowForm(!showForm)} style={{ width: "100%", maxWidth: "600px", padding: "16px", background: "#1a6b5a", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        + Submit New Complaint
      </button>

      {/* New complaint form */}
      {showForm && (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "600px", marginBottom: "20px" }}>

          {/* Category dropdown — matches your screenshot */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", marginBottom: "12px", boxSizing: "border-box", color: category ? "#111827" : "#9ca3af", background: "white", cursor: "pointer" }}
          >
            <option value="" disabled>Select Category</option>
            {complaintCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Priority dropdown */}
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", marginBottom: "12px", boxSizing: "border-box", color: "#111827", background: "white", cursor: "pointer" }}
          >
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          {/* Description */}
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={4}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", marginBottom: "16px", boxSizing: "border-box", resize: "vertical", fontFamily: "system-ui, sans-serif", color: "#111827" }}
          />

          {/* Submit button */}
          <button onClick={submitComplaint} style={{ width: "100%", padding: "14px", background: "#f59e0b", color: "white", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
            Submit Complaint
          </button>
        </div>
      )}

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "8px 18px", borderRadius: "999px", border: "1px solid #e5e7eb", background: activeFilter === f ? "#1a6b5a" : "white", color: activeFilter === f ? "white" : "#374151", fontWeight: activeFilter === f ? 600 : 400, fontSize: "13px", cursor: "pointer" }}>
            {f}
          </button>
        ))}
      </div>

      {filtered.map(c => <ComplaintCard key={c.id} complaint={c} />)}
      {filtered.length === 0 && <p style={{ color: "#9ca3af", fontSize: "14px" }}>No complaints in this category.</p>}
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Reviews
// ─────────────────────────────────────────────
function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function submitReview() {
    if (!selectedProperty || rating === 0 || !comment) return alert("Please fill in all fields and select a rating.");
    const review = {
      id: reviews.length + 1,
      property: selectedProperty,
      rating,
      comment,
      author: tenant.name,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([review, ...reviews]);
    setSelectedProperty("");
    setRating(0);
    setComment("");
    setShowForm(false);
  }

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>Reviews</h1>

      {/* Write a Review button */}
      <button onClick={() => setShowForm(!showForm)} style={{ width: "100%", maxWidth: "600px", padding: "16px", background: "#1a6b5a", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginBottom: "20px" }}>
        Write a Review
      </button>

      {/* Review form */}
      {showForm && (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "600px", marginBottom: "20px" }}>

          {/* Property selector */}
          <select
            value={selectedProperty}
            onChange={e => setSelectedProperty(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", marginBottom: "16px", boxSizing: "border-box", color: selectedProperty ? "#111827" : "#9ca3af", background: "white", cursor: "pointer" }}
          >
            <option value="" disabled>Select Property</option>
            {properties.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          {/* Star rating */}
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>Rating</p>
          <div style={{ marginBottom: "16px" }}>
            <StarRating rating={rating} onRate={setRating} />
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", marginBottom: "16px", boxSizing: "border-box", resize: "vertical", fontFamily: "system-ui, sans-serif", color: "#111827" }}
          />

          <button onClick={submitReview} style={{ width: "100%", padding: "14px", background: "#f59e0b", color: "white", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
            Submit Review
          </button>
        </div>
      )}

      {/* Review cards */}
      {reviews.map(review => (
        <div key={review.id} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", maxWidth: "600px", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <StarRating rating={review.rating} />
            <span style={{ fontSize: "13px", color: "#9ca3af" }}>{review.date}</span>
          </div>
          <p style={{ fontWeight: 700, fontSize: "15px", color: "#111827", marginBottom: "6px" }}>{review.property}</p>
          <p style={{ fontSize: "13px", color: "#374151", marginBottom: "8px" }}>{review.comment}</p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>— {review.author}</p>
        </div>
      ))}
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Payments
// ─────────────────────────────────────────────
function PaymentHistoryRow({ month, paidOn, amount, currency }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "12px", background: "white" }}>
      <div>
        <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px", color: "#111827" }}>{month}</p>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Paid {paidOn}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px", color: "#111827" }}>{currency}{amount.toLocaleString()}</p>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#065f46", background: "#d1fae5", padding: "2px 10px", borderRadius: "999px" }}>PAID</span>
      </div>
    </div>
  );
}

function PaymentsPage() {
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const total = invoice.amount * selectedMonths;

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>Payments</h1>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px", marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827" }}>Current Invoice</h2>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#991b1b", background: "#fee2e2", padding: "4px 12px", borderRadius: "999px" }}>UNPAID</span>
        </div>
        {[{ label: "Period", value: invoice.period }, { label: "Due Date", value: invoice.dueDate }, { label: "Property", value: invoice.property }].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ color: "#9ca3af", fontSize: "14px" }}>{row.label}</span>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>{row.value}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingTop: "8px", borderTop: "1px solid #f3f4f6" }}>
          <span style={{ fontWeight: 700, color: "#111827" }}>Total Due</span>
          <span style={{ fontWeight: 700, fontSize: "22px", color: "#1a6b5a" }}>{invoice.currency}{total.toLocaleString()}</span>
        </div>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "10px" }}>COLLECTION PERIOD</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          {periods.map((p) => <PeriodButton key={p.months} label={p.label} active={selectedMonths === p.months} onClick={() => setSelectedMonths(p.months)} />)}
        </div>
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>{invoice.currency}{invoice.amount.toLocaleString()} x {selectedMonths} month{selectedMonths > 1 ? "s" : ""}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 16px", marginBottom: "12px", background: "white" }}>
          <span>💳</span>
          <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" style={{ border: "none", outline: "none", fontSize: "14px", flex: 1, background: "transparent", color: "#111827" }} />
        </div>
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none", background: "white", color: "#111827" }} />
          <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none", background: "white", color: "#111827" }} />
        </div>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>🔒 Secured with 256-bit SSL encryption</p>
        <button onClick={() => alert(`Processing payment of ${invoice.currency}${total.toLocaleString()}...`)} style={{ width: "100%", padding: "16px", background: "#f59e0b", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>
          Pay {invoice.currency}{total.toLocaleString()}
        </button>
      </div>
      <div style={{ maxWidth: "500px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", color: "#111827" }}>Payment History</h2>
        {paymentHistory.map((payment) => <PaymentHistoryRow key={payment.id} month={payment.month} paidOn={payment.paidOn} amount={payment.amount} currency={invoice.currency} />)}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Contract
// ─────────────────────────────────────────────
function ContractPage() {
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [notes, setNotes] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: "#111827" }}>Contract</h1>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>Manage, upload, and renew your lease agreement.</p>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ width: "44px", height: "44px", background: "#e6f4f1", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📄</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>Current Lease</p>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>{lease.property} • {lease.unit}</p>
          </div>
        </div>
        {[{ label: "Start Date", value: lease.startDate }, { label: "End Date", value: lease.endDate }, { label: "Monthly Rent", value: `${lease.currency}${lease.monthlyRent.toLocaleString()}` }].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>{row.label}</span>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>{row.value}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>Status</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#065f46", background: "#d1fae5", padding: "3px 12px", borderRadius: "999px" }}>{lease.status}</span>
        </div>
        <button onClick={() => alert("Downloading contract...")} style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "10px", background: "white", fontSize: "14px", fontWeight: 500, cursor: "pointer", color: "#111827" }}>⬇️ Download Contract</button>
      </div>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px", color: "#111827" }}>Upload Signed Contract</h2>
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Upload your signed contract (PDF or image). Your landlord will automatically receive a copy.</p>
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", border: "2px dashed #d1d5db", borderRadius: "12px", padding: "32px", cursor: "pointer", background: uploadedFile ? "#f0fdf4" : "white" }}>
          <input type="file" accept=".pdf,.jpg,.png" onChange={e => { const f = e.target.files[0]; if (f) setUploadedFile(f.name); }} style={{ display: "none" }} />
          <span style={{ fontSize: "28px" }}>{uploadedFile ? "✅" : "⬆️"}</span>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{uploadedFile ? uploadedFile : "Click to upload"}</p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{uploadedFile ? "File ready to send" : "PDF, JPG or PNG (max 10MB)"}</p>
        </label>
      </div>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "#111827" }}>Request Renewal</h2>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "10px" }}>RENEWAL PERIOD</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {periods.map((p) => <PeriodButton key={p.months} label={p.label} active={selectedMonths === p.months} onClick={() => setSelectedMonths(p.months)} />)}
        </div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes or requests..." rows={4} style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "system-ui, sans-serif", color: "#111827" }} />
        <button onClick={() => alert(`Renewal request submitted for ${selectedMonths} month${selectedMonths > 1 ? "s" : ""}!`)} style={{ width: "100%", marginTop: "16px", padding: "14px", background: "#1a6b5a", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>Submit Renewal Request</button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Notifications
// ─────────────────────────────────────────────
function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827" }}>Notifications</h1>
        {unreadCount > 0 && <span style={{ background: "#ef4444", color: "white", fontSize: "13px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px" }}>{unreadCount} new</span>}
      </div>
      {notifications.map((n) => (
        <div key={n.id} onClick={() => setNotifications(notifications.map(x => x.id === n.id ? { ...x, isRead: true } : x))}
          style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "20px", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "12px", background: n.isRead ? "white" : "#f0fdf4", cursor: "pointer", maxWidth: "600px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: n.isRead ? "#f3f4f6" : "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px", color: "#111827" }}>{n.title}</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>{n.message}</p>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>{n.date}</p>
          </div>
        </div>
      ))}
      {unreadCount === 0 && <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>You're all caught up! 🎉</p>}
    </div>
  );
}


// ─────────────────────────────────────────────
// SHARED: a labeled input field used across the 3 new forms
// Props: label, value, onChange, type, placeholder
// ─────────────────────────────────────────────
function FormField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111827", background: "white" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// SHARED: BackButton — used on all 3 sub-pages to return to Settings
// ─────────────────────────────────────────────
function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", background: "none", color: "#6b7280", fontSize: "14px", cursor: "pointer", marginBottom: "20px", padding: 0 }}>
      ← Back to Settings
    </button>
  );
}


// ─────────────────────────────────────────────
// PAGE: Edit Profile
// ─────────────────────────────────────────────
function EditProfilePage({ onNavigate }) {
  // Identity
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(null); // stores chosen file's preview URL

  // Contact — merged in here instead of a separate page, since a tenant
  // only ever has ONE destination for "my info"
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");

  // Emergency contact — kept as its own section so it doesn't get lost
  // among personal details, but still lives on this one screen
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file)); // turn the file into a temporary preview link
  }

  function handleSave() {
    alert(`Profile saved!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    onNavigate("settings");
  }

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <BackButton onClick={() => onNavigate("settings")} />
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: "#111827" }}>Edit Profile</h1>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>Update your photo, personal info, and how we reach you.</p>

      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px", marginBottom: "20px" }}>

        {/* Photo upload — click the circle to choose a file */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
          <label style={{ cursor: "pointer", position: "relative" }}>
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
            {photo ? (
              <img src={photo} alt="Profile" style={{ width: "84px", height: "84px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb" }} />
            ) : (
              <div style={{ width: "84px", height: "84px", borderRadius: "50%", background: "#1a6b5a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: 700 }}>
                {user.initials}
              </div>
            )}
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "28px", height: "28px", borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", border: "2px solid white" }}>
              📷
            </div>
          </label>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "10px" }}>Click the photo to change it</p>
        </div>

        <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "14px" }}>PERSONAL INFO</p>
        <FormField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        <FormField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
        <FormField label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 XX XXX XXXX" />
      </div>

      {/* Emergency contact — separate card to keep it visually distinct */}
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px", marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "14px" }}>EMERGENCY CONTACT</p>
        <FormField label="Contact Name" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} placeholder="Full name" />
        <FormField label="Contact Phone" type="tel" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} placeholder="+233 XX XXX XXXX" />
      </div>

      <button onClick={handleSave} style={{ width: "100%", maxWidth: "500px", padding: "14px", background: "#1a6b5a", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
        Save Changes
      </button>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Change Password
// ─────────────────────────────────────────────
function ChangePasswordPage({ onNavigate }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // Simple password strength check based on length
  const strength = newPw.length === 0 ? null : newPw.length < 6 ? "Weak" : newPw.length < 10 ? "Medium" : "Strong";
  const strengthColor = strength === "Weak" ? "#ef4444" : strength === "Medium" ? "#f59e0b" : "#10b981";

  function handleSave() {
    if (!currentPw || !newPw || !confirmPw) return alert("Please fill in all fields.");
    if (newPw !== confirmPw) return alert("New passwords don't match.");
    alert("Password updated successfully!");
    onNavigate("settings");
  }

  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <BackButton onClick={() => onNavigate("settings")} />
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: "#111827" }}>Change Password</h1>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>Choose a strong password you don't use elsewhere.</p>

      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", maxWidth: "500px" }}>
        <FormField label="Current Password" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Enter current password" />
        <FormField label="New Password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Enter new password" />

        {strength && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", marginTop: "-8px" }}>
            <div style={{ flex: 1, height: "6px", borderRadius: "999px", background: "#f3f4f6", overflow: "hidden" }}>
              <div style={{ height: "100%", width: strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%", background: strengthColor, transition: "width 0.2s" }} />
            </div>
            <span style={{ fontSize: "12px", fontWeight: 600, color: strengthColor }}>{strength}</span>
          </div>
        )}

        <FormField label="Confirm New Password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Re-enter new password" />

        <button onClick={handleSave} style={{ width: "100%", padding: "14px", background: "#1a6b5a", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginTop: "8px" }}>
          Update Password
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PAGE: Settings
// ─────────────────────────────────────────────
function SettingsRow({ icon, title, subtitle, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f3f4f6", cursor: "pointer", background: "white" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
      onMouseLeave={e => e.currentTarget.style.background = "white"}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{icon}</div>
        <div>
          <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", marginBottom: "2px" }}>{title}</p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{subtitle}</p>
        </div>
      </div>
      <span style={{ color: "#9ca3af", fontSize: "18px" }}>›</span>
    </div>
  );
}

function SettingsPage({ currentRole, onRoleChange, onNavigate }) {
  return (
    <div style={{ flex: 1, padding: "32px 40px", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#111827" }}>Settings</h1>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", maxWidth: "500px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#1a6b5a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 700, flexShrink: 0 }}>{user.initials}</div>
        <div>
          <p style={{ fontWeight: 700, fontSize: "16px", color: "#111827", marginBottom: "4px" }}>{user.name}</p>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>{user.email}</p>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#1a6b5a", background: "#e6f4f1", padding: "2px 10px", borderRadius: "999px" }}>{currentRole}</span>
        </div>
      </div>

      <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "8px" }}>⟳ SWITCH ROLE</p>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", maxWidth: "500px", marginBottom: "20px" }}>
        {roles.map((role, i) => (
          <div key={role} onClick={() => onRoleChange(role)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i < roles.length - 1 ? "1px solid #f3f4f6" : "none", cursor: "pointer", background: "white" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
            onMouseLeave={e => e.currentTarget.style.background = "white"}>
            <span style={{ fontSize: "14px", fontWeight: currentRole === role ? 600 : 400, color: "#111827" }}>{role}</span>
            {currentRole === role && <span style={{ fontSize: "11px", fontWeight: 600, color: "#1a6b5a", background: "#e6f4f1", padding: "2px 10px", borderRadius: "999px" }}>Active</span>}
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "8px" }}>ACCOUNT</p>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", maxWidth: "500px", marginBottom: "20px" }}>
        <SettingsRow icon="👤" title="Edit Profile" subtitle="Name, photo, email, phone" onClick={() => onNavigate("edit-profile")} />
        <SettingsRow icon="🔒" title="Change Password" subtitle="Update your password" onClick={() => onNavigate("change-password")} />
      </div>

      <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "8px" }}>PREFERENCES</p>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", maxWidth: "500px", marginBottom: "20px" }}>
        {/* Clicking Notifications goes to the Notifications page */}
        <SettingsRow icon="🔔" title="Notifications" subtitle="Push, email, SMS alerts" onClick={() => onNavigate("notifications")} />
        {/* Clicking My Reviews goes to the Reviews page */}
        <SettingsRow icon="⭐" title="My Reviews" subtitle="Leave or manage property reviews" onClick={() => onNavigate("reviews")} />
      </div>

      <button onClick={() => alert("Signing out...")} style={{ maxWidth: "500px", width: "100%", padding: "16px", background: "#fff1f2", color: "#ef4444", border: "1px solid #fecdd3", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        ⇥ Sign Out
      </button>
    </div>
  );
}


// ─────────────────────────────────────────────
// ROOT: App
// ─────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [currentRole, setCurrentRole] = useState("Tenant");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} currentRole={currentRole} onRoleChange={setCurrentRole} />
      {activePage === "dashboard"     && <DashboardPage onNavigate={setActivePage} />}
      {activePage === "payments"      && <PaymentsPage />}
      {activePage === "contract"      && <ContractPage />}
      {activePage === "notifications" && <NotificationsPage />}
      {activePage === "complaints"    && <ComplaintsPage />}
      {activePage === "reviews"       && <ReviewsPage />}
      {activePage === "settings"      && <SettingsPage currentRole={currentRole} onRoleChange={setCurrentRole} onNavigate={setActivePage} />}
      {activePage === "edit-profile"    && <EditProfilePage onNavigate={setActivePage} />}
      {activePage === "change-password" && <ChangePasswordPage onNavigate={setActivePage} />}
    </div>
  );
}
