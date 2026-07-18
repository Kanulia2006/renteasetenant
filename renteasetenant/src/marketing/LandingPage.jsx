import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Search,
  ArrowRight,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  CreditCard,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import "./marketing.css";
import { listings } from "./listingsData";

const features = [
  {
    icon: Building2,
    title: "Property Management",
    sub: "List, manage, and track all your properties in one place.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    sub: "Pay rent online with encrypted, hassle-free transactions.",
  },
  {
    icon: MessageSquareText,
    title: "Complaint Resolution",
    sub: "Submit and resolve issues with real-time status tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Platform",
    sub: "Verified landlords and transparent tenant reviews.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = listings.filter((l) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.location.toLowerCase().includes(q) || l.type.toLowerCase().includes(q);
  });

  return (
    <div>
      <header className="mk-header">
        <div className="mk-brand">
          <div className="mk-brand-icon">
            <Building2 size={17} strokeWidth={2.3} />
          </div>
          <span className="mk-brand-name">RentEase</span>
        </div>
      </header>

      <section className="mk-hero">
        <div className="mk-hero-inner">
          <h1 className="mk-hero-title">Simplify Your Rental Experience</h1>
          <p className="mk-hero-sub">
            The all-in-one platform for landlords, tenants, and prospective renters across Ghana.
          </p>

          <form
            className="mk-search"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("featured-homes")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="mk-search-icon">
              <Search size={16} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location (e.g. Achimota, Kumasi)"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <Search size={14} /> Search
            </button>
          </form>

          <div className="mk-hero-ctas">
            <button className="btn btn-accent" onClick={() => navigate("/login")}>
              Sign In <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-outline"
              style={{ background: "transparent", borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
              onClick={() => navigate("/get-started")}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      <section className="mk-section" id="featured-homes">
        <div className="mk-section-head">
          <h2 className="mk-section-title">Featured Homes</h2>
          <p className="mk-section-sub">Popular picks across Ghana</p>
        </div>

        <div className="mk-listing-grid">
          {filtered.map((home) => (
            <div key={home.id} className="mk-listing-card">
              <div className="mk-listing-photo" style={{ backgroundImage: `url(${home.image})` }}>
                <span className="mk-listing-tag">{home.type}</span>
                <span className="mk-listing-units">{home.unitsAvailable} unit{home.unitsAvailable > 1 ? "s" : ""} available</span>
              </div>
              <div className="mk-listing-body">
                <p className="mk-listing-name">{home.name}</p>
                <p className="mk-listing-loc">
                  <MapPin size={12} /> {home.location}
                </p>
                <div className="mk-listing-amenities">
                  {home.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="mk-listing-amenity">
                      {a}
                    </span>
                  ))}
                  {home.amenities.length > 3 && <span className="mk-listing-amenity">+{home.amenities.length - 3}</span>}
                </div>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--ink-500)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <BedDouble size={13} /> {home.beds} Bed
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Bath size={13} /> {home.baths} Bath
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Ruler size={13} /> {home.sqft} sqft
                  </span>
                </div>
                <div className="mk-listing-foot">
                  <span className="mk-listing-price">
                    {home.currency}
                    {home.rent.toLocaleString()}
                    <span>/mo</span>
                  </span>
                  <button className="btn btn-primary btn-sm mk-listing-cta" onClick={() => navigate(`/properties/${home.id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mk-browse-hint">No listings match "{query}" yet — try another location.</p>
        )}

        <p className="mk-browse-hint">
          Want to contact a landlord or book a viewing?{" "}
          <a
            href="/get-started"
            onClick={(e) => {
              e.preventDefault();
              navigate("/get-started");
            }}
          >
            Create a Prospective Tenant account
          </a>
        </p>
      </section>

      <section className="mk-section">
        <div className="mk-section-head is-center">
          <h2 className="mk-section-title">Everything You Need</h2>
          <p className="mk-section-sub">Powerful tools for every role in the rental process.</p>
        </div>
        <div className="mk-features-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="mk-feature-card">
                <div className="mk-feature-icon">
                  <Icon size={18} />
                </div>
                <p className="mk-feature-title">{f.title}</p>
                <p className="mk-feature-sub">{f.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mk-cta">
        <p className="mk-cta-title">Ready to get started?</p>
        <p className="mk-cta-sub">Join thousands of landlords and tenants already using RentEase.</p>
        <button className="btn btn-primary" onClick={() => navigate("/get-started")}>
          Get Started
        </button>
      </section>

      <footer className="mk-footer">© {new Date().getFullYear()} RentEase. All rights reserved.</footer>
    </div>
  );
}
