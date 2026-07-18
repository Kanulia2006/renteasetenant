import { useNavigate } from "react-router-dom";
import { Building2, ArrowLeft } from "lucide-react";
import "../App.css";
import { logout } from "../lib/auth";

export default function AdminApp() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        background: "var(--bg)",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "var(--brand-500)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Building2 size={26} />
      </div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--ink-900)" }}>
        The Landlord portal is on its way
      </h1>
      <p style={{ fontSize: 14, color: "var(--ink-500)", maxWidth: 360 }}>
        We're polishing property oversight, disputes, payments, and reporting tools next. Check back soon.
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </button>
        <button
          className="btn btn-danger-soft"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
