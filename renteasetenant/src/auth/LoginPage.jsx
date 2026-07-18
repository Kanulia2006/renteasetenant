import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Building2, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import "./auth.css";
import { login } from "../lib/auth";

const copy = {
  tenant: {
    headline: "Manage your rental life in one place.",
    sub: "Pay rent, track your lease, and stay on top of maintenance requests without the back-and-forth.",
    points: ["Pay rent and view your full payment history", "Renew or upload your signed lease in a click", "Track complaints from submission to resolution"],
  },
  admin: {
    headline: "Run the whole platform from one dashboard.",
    sub: "Moderate users, approve listings, resolve disputes, and keep an eye on every transaction.",
    points: ["Real-time revenue and dispute analytics", "Approve or flag property listings", "Full audit trail and compliance controls"],
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialRole = params.get("role") === "admin" ? "admin" : "tenant";
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const c = copy[role];

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    login(role);
    navigate(role === "admin" ? "/admin" : "/tenant");
  }

  return (
    <div className="auth-shell">
      <div className="auth-brand">
        <div className="auth-brand-mark">
          <div className="auth-brand-mark-icon">
            <Building2 size={20} strokeWidth={2.3} />
          </div>
          <div>
            <div className="auth-brand-mark-name">RentEase</div>
            <div className="auth-brand-mark-tag">Rental management, simplified</div>
          </div>
        </div>

        <div className="auth-brand-copy">
          <h1 className="auth-brand-headline">{c.headline}</h1>
          <p className="auth-brand-sub">{c.sub}</p>
          <div className="auth-brand-points">
            {c.points.map((p) => (
              <div key={p} className="auth-brand-point">
                <CheckCircle2 size={16} />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="auth-brand-foot">© {new Date().getFullYear()} RentEase. All rights reserved.</p>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-head">
          <h2 className="auth-form-title">Sign in to RentEase</h2>
          <p className="auth-form-sub">Enter your details to access your portal.</p>
        </div>

        <div className="auth-tabs">
          <button type="button" className={`auth-tab ${role === "tenant" ? "is-active" : ""}`} onClick={() => setRole("tenant")}>
            <User size={15} /> Tenant
          </button>
          <button type="button" className={`auth-tab ${role === "admin" ? "is-active" : ""}`} onClick={() => setRole("admin")}>
            <Building2 size={15} /> Landlord
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Email Address</label>
            <div className="input-icon-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "admin" ? "landlord@rentease.com" : "you@email.com"}
                className="input"
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <div className="input-icon-wrap">
              <Lock size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input"
              />
            </div>
          </div>

          <div className="auth-meta-row">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ accentColor: "var(--brand-500)" }}
              />
              Keep me signed in
            </label>
            <button type="button" className="auth-link" onClick={() => alert("Password reset link sent (demo).")}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign In as {role === "admin" ? "Landlord" : "Tenant"}
          </button>
        </form>

        <div className="auth-demo-note">
          This is a demo build — any email and password will sign you in. Choose a tab above to preview the tenant or landlord experience.
        </div>

        <p className="auth-switch">
          {role === "tenant" ? "Manage properties instead?" : "Looking for your tenant account?"}{" "}
          <button type="button" className="auth-link" onClick={() => setRole(role === "tenant" ? "admin" : "tenant")}>
            {role === "tenant" ? "Sign in as Landlord" : "Sign in as Tenant"}
          </button>
        </p>
      </div>
    </div>
  );
}
