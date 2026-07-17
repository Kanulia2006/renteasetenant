import { useState } from "react";
import { Plus, Inbox } from "lucide-react";
import Badge from "../components/Badge";
import { tenant, initialComplaints, complaintCategories } from "../data/mockData";

const statusTone = { Open: "red", "In-Progress": "amber", Resolved: "green" };

function ComplaintCard({ complaint }) {
  const priorityColor =
    complaint.priority === "HIGH" ? "var(--red-500)" : complaint.priority === "MEDIUM" ? "var(--amber-500)" : "var(--ink-400)";

  return (
    <div className="entity-card max-w">
      <div className="card-row" style={{ marginBottom: 10 }}>
        <Badge tone={statusTone[complaint.status] || "gray"}>{complaint.status}</Badge>
        <span style={{ fontSize: 12.5, color: "var(--ink-400)" }}>{complaint.date}</span>
      </div>
      <p style={{ fontWeight: 700, fontSize: 15.5, color: "var(--ink-900)", marginBottom: 4 }}>
        {complaint.category}
      </p>
      <p style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 10 }}>
        {complaint.tenant} · {complaint.property}
      </p>
      <p style={{ fontSize: 13.5, color: "var(--ink-700)", marginBottom: 14 }}>{complaint.description}</p>
      <div className="card-row">
        <span style={{ fontSize: 12, fontWeight: 700, color: priorityColor }}>{complaint.priority} PRIORITY</span>
        {complaint.status !== "Resolved" && (
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)" }}>Awaiting response</span>
        )}
      </div>
    </div>
  );
}

export default function Complaints() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [complaints, setComplaints] = useState(initialComplaints);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("HIGH");

  const filters = ["All", "Open", "In-Progress", "Resolved"];
  const filtered = activeFilter === "All" ? complaints : complaints.filter((c) => c.status === activeFilter);

  function submitComplaint() {
    if (!category || !description) return alert("Please fill in all fields.");
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
    <div>
      <div className="page-head">
        <h1 className="page-title">Complaints</h1>
        <p className="page-desc">Submit and track your complaints.</p>
      </div>

      <button className="btn btn-primary btn-block max-w" style={{ marginBottom: 20 }} onClick={() => setShowForm(!showForm)}>
        <Plus size={17} /> Submit New Complaint
      </button>

      {showForm && (
        <div className="card card-pad max-w" style={{ marginBottom: 20 }}>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="select" style={{ marginBottom: 12 }}>
            <option value="" disabled>
              Select Category
            </option>
            {complaintCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="select" style={{ marginBottom: 12 }}>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={4}
            className="textarea"
            style={{ marginBottom: 16 }}
          />

          <button className="btn btn-accent btn-block" onClick={submitComplaint}>
            Submit Complaint
          </button>
        </div>
      )}

      <div className="pill-row" style={{ marginBottom: 20 }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`btn-pill ${activeFilter === f ? "is-active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.map((c) => (
        <ComplaintCard key={c.id} complaint={c} />
      ))}
      {filtered.length === 0 && (
        <div className="empty-state">
          <Inbox size={28} />
          <p style={{ fontSize: 14 }}>No complaints in this category.</p>
        </div>
      )}
    </div>
  );
}
