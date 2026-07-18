import { useNavigate, useSearchParams } from "react-router-dom";
import { Building2, Search, ArrowLeft } from "lucide-react";
import "./auth.css";

const copy = {
  landlord: {
    icon: Building2,
    title: "The Landlord portal is on its way",
    sub: "Soon you'll be able to list properties, screen tenants, and manage disputes right from RentEase.",
  },
  prospective: {
    icon: Search,
    title: "Prospective Tenant accounts are coming soon",
    sub: "For now, feel free to browse featured homes and reach out to a landlord directly from any listing.",
  },
};

export default function ComingSoon() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role") === "landlord" ? "landlord" : "prospective";
  const c = copy[role];
  const Icon = c.icon;

  return (
    <div className="coming-soon-shell">
      <div className="role-select-icon">
        <Icon size={24} />
      </div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--ink-900)", maxWidth: 380 }}>{c.title}</h1>
      <p style={{ fontSize: 14, color: "var(--ink-500)", maxWidth: 380 }}>{c.sub}</p>
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Browse Listings
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/get-started")}>
          Choose Another Role
        </button>
      </div>
    </div>
  );
}
