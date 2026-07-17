import { useState } from "react";
import { FileText, Download, Upload, CheckCircle2 } from "lucide-react";
import Badge from "../components/Badge";
import PeriodPills from "../components/PeriodPills";
import { lease, periods } from "../data/mockData";

export default function Contract() {
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [notes, setNotes] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Contract</h1>
        <p className="page-desc">Manage, upload, and renew your lease agreement.</p>
      </div>

      <div className="card card-pad max-w" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "var(--brand-50)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--brand-600)",
              flexShrink: 0,
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <p className="card-title">Current Lease</p>
            <p style={{ fontSize: 13, color: "var(--ink-400)" }}>
              {lease.property} · {lease.unit}
            </p>
          </div>
        </div>

        <div className="card-row">
          <span className="card-row-label">Start Date</span>
          <span className="card-row-value">{lease.startDate}</span>
        </div>
        <div className="card-row">
          <span className="card-row-label">End Date</span>
          <span className="card-row-value">{lease.endDate}</span>
        </div>
        <div className="card-row">
          <span className="card-row-label">Monthly Rent</span>
          <span className="card-row-value">
            {lease.currency}
            {lease.monthlyRent.toLocaleString()}
          </span>
        </div>
        <div className="card-row" style={{ marginBottom: 20 }}>
          <span className="card-row-label">Status</span>
          <Badge tone="green">{lease.status}</Badge>
        </div>

        <button className="btn btn-outline btn-block" onClick={() => alert("Downloading contract...")}>
          <Download size={16} /> Download Contract
        </button>
      </div>

      <div className="card card-pad max-w" style={{ marginBottom: 20 }}>
        <h2 className="card-title" style={{ marginBottom: 6 }}>
          Upload Signed Contract
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 16 }}>
          Upload your signed contract (PDF or image). Your landlord will automatically receive a copy.
        </p>
        <label className={`dropzone ${uploadedFile ? "has-file" : ""}`} style={{ cursor: "pointer" }}>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) setUploadedFile(f.name);
            }}
            style={{ display: "none" }}
          />
          <span className="dropzone-icon">
            {uploadedFile ? <CheckCircle2 size={20} /> : <Upload size={20} />}
          </span>
          <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-700)" }}>
            {uploadedFile ? uploadedFile : "Click to upload"}
          </p>
          <p style={{ fontSize: 12, color: "var(--ink-400)" }}>
            {uploadedFile ? "File ready to send" : "PDF, JPG or PNG (max 10MB)"}
          </p>
        </label>
      </div>

      <div className="card card-pad max-w">
        <h2 className="card-title" style={{ marginBottom: 20 }}>
          Request Renewal
        </h2>
        <p className="section-label">Renewal Period</p>
        <PeriodPills periods={periods} selected={selectedMonths} onSelect={setSelectedMonths} />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes or requests..."
          rows={4}
          className="textarea"
          style={{ marginTop: 16 }}
        />
        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 16 }}
          onClick={() =>
            alert(`Renewal request submitted for ${selectedMonths} month${selectedMonths > 1 ? "s" : ""}!`)
          }
        >
          Submit Renewal Request
        </button>
      </div>
    </div>
  );
}
