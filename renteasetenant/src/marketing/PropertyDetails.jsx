import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  TrendingUp,
  Users,
  Tag,
  Lightbulb,
  Phone,
  Mail,
} from "lucide-react";
import "./marketing.css";
import { getListing } from "./listingsData";
import { isAuthenticated } from "../lib/auth";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const home = getListing(id);

  if (!home) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>We couldn't find that listing.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  function handleRequestToRent() {
    if (isAuthenticated("tenant")) {
      alert(`Request sent to ${home.landlord.name} for ${home.name}!`);
    } else {
      navigate("/login?role=tenant");
    }
  }

  return (
    <div className="pd-shell">
      <div className="pd-photo" style={{ backgroundImage: `url(${home.image})` }}>
        <button className="pd-back" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={17} />
        </button>
        <span className="pd-price-badge">
          {home.currency}
          {home.rent.toLocaleString()}/mo
        </span>
      </div>

      <div className="pd-body">
        <h1 className="pd-title">{home.name}</h1>
        <p className="pd-loc">
          <MapPin size={14} /> {home.location}
        </p>

        <div className="pd-facts">
          <div className="pd-fact">
            <BedDouble size={18} />
            <span className="pd-fact-value">{home.beds}</span>
            <span className="pd-fact-label">Beds</span>
          </div>
          <div className="pd-divider" />
          <div className="pd-fact">
            <Bath size={18} />
            <span className="pd-fact-value">{home.baths}</span>
            <span className="pd-fact-label">Baths</span>
          </div>
          <div className="pd-divider" />
          <div className="pd-fact">
            <Ruler size={18} />
            <span className="pd-fact-value">{home.sqft}</span>
            <span className="pd-fact-label">sqft</span>
          </div>
        </div>

        <p className="pd-block-title">Description</p>
        <p className="pd-desc">{home.description}</p>

        <p className="pd-block-title">Amenities</p>
        <div className="pd-amenities">
          {home.amenities.map((a) => (
            <span key={a} className="pd-amenity">
              {a}
            </span>
          ))}
        </div>

        <div className="pd-units-card">
          <div>
            <p className="pd-units-label">Units Available</p>
            <p className="pd-units-value">{home.unitsAvailable}</p>
          </div>
          <span className="badge badge-green">Accepting tenants</span>
        </div>

        <p className="pd-block-title">Property Insights</p>
        <div className="pd-insights">
          <div className="pd-insight-row">
            <span>
              <TrendingUp size={13} /> Match Score
            </span>
            <span>{home.insights.matchScore}%</span>
          </div>
          <div className="pd-insight-row">
            <span>
              <Users size={13} /> Market Demand
            </span>
            <span>{home.insights.marketDemand}% demand</span>
          </div>
          <div className="pd-insight-row">
            <span>
              <Tag size={13} /> Fair Price
            </span>
            <span>
              {home.currency}
              {home.insights.fairPrice.toLocaleString()}/mo
            </span>
          </div>
          <div className="pd-insight-tip">
            <Lightbulb size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{home.insights.tip}</span>
          </div>
        </div>

        <p className="pd-block-title">Landlord Contact</p>
        <div className="pd-landlord">
          <div className="avatar avatar-lg" style={{ width: 46, height: 46, fontSize: 15 }}>
            {home.landlord.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink-900)", marginBottom: 4 }}>{home.landlord.name}</p>
            <div className="pd-landlord-contacts">
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Phone size={12} /> {home.landlord.phone}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Mail size={12} /> {home.landlord.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pd-cta-bar">
        <button className="btn btn-accent btn-block" onClick={handleRequestToRent}>
          Request to Rent
        </button>
      </div>
    </div>
  );
}