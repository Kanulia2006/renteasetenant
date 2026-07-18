import { useNavigate } from "react-router-dom";
import { Building2, Home, Search, ArrowRight, ArrowLeft } from "lucide-react";
import "./auth.css";

const roles = [
  {
    key: "landlord",
    icon: Building2,
    title: "Landlord",
    sub: "Manage properties, tenants, and complaints",
    to: "/coming-soon?role=landlord",
  },
  {
    key: "tenant",
    icon: Home,
    title: "Tenant",
    sub: "Pay rent, submit complaints, and view lease",
    to: "/login?role=tenant",
  },
  {
    key: "prospective",
    icon: Search,
    title: "Prospective Tenant",
    sub: "Browse listings, read reviews, and apply",
    to: "/coming-soon?role=prospective",
  },
];

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-select-shell">
      <div className="role-select-card">
        <div className="role-select-icon">
          <Building2 size={24} />
        </div>
        <h1 className="role-select-title">Welcome to RentEase</h1>
        <p className="role-select-sub">Select your role to continue</p>

        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button key={r.key} className="role-option" onClick={() => navigate(r.to)}>
              <span className="role-option-icon">
                <Icon size={20} />
              </span>
              <span>
                <span className="role-option-title" style={{ display: "block" }}>
                  {r.title}
                </span>
                <span className="role-option-sub">{r.sub}</span>
              </span>
              <ArrowRight size={18} className="role-option-arrow" />
            </button>
          );
        })}

        <button className="btn btn-outline role-select-back" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    </div>
  );
}
