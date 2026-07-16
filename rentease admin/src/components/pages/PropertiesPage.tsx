import React from "react";
import { Property } from "../../types";
import { Badge, EmptyState } from "../Shared";

interface PropertiesPageProps {
  properties: Property[];
  searchQuery: string;
  handleCSVExport: (table: "users" | "properties" | "disputes" | "transactions" | "auditLog") => void;
  handleApproveProperty: (id: string, name: string) => void;
  handleRejectProperty: (id: string, name: string) => void;
  handleFlagProperty: (id: string, name: string) => void;
}

export function PropertiesPage({
  properties,
  searchQuery,
  handleCSVExport,
  handleApproveProperty,
  handleRejectProperty,
  handleFlagProperty
}: PropertiesPageProps) {
  const pendingProperties = properties.filter(p => p.status === "Pending Review");
  const filteredProperties = properties.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.landlord.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Property Oversight & Verification</h1>
      <p className="ad-page-sub">Review new landlord submissions to combat listing fraud. Inspect, approve, block, or flag platform listings.</p>

      {/* Pending reviews block */}
      {pendingProperties.length > 0 ? (
        <div className="ad-card" style={{ marginBottom: 24 }}>
          <p className="ad-section-title">RentEase Property Appraisals Awaiting Action</p>
          <p className="ad-section-subtitle">Awaiting verification against official state and tenancy documentation.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {pendingProperties.map((property) => (
              <div key={property.id} style={{ flex: "1 1 300px", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", background: "#ffffff" }}>
                <div style={{ height: 110, background: "#e6f4f1", padding: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", background: "#1a6b5a", color: "#ffffff", padding: "3px 8px", borderRadius: "99px", alignSelf: "flex-start", fontWeight: "bold" }}>AWAITING APPRAISAL</span>
                  <p style={{ fontSize: "11px", color: "#1a6b5a", fontWeight: "600" }}>{property.id}</p>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{property.name}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1a6b5a" }}>GH₵{property.rent}/mo</p>
                  </div>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>{property.address}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 12, color: "#6b7280" }}>Landlord: <strong>{property.landlord}</strong></p>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="ad-btn ad-btn--outline" onClick={() => handleRejectProperty(property.id, property.name)}>Reject</button>
                      <button className="ad-btn ad-btn--primary" onClick={() => handleApproveProperty(property.id, property.name)}>Approve ✓</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="ad-card" style={{ marginBottom: 24, padding: "16px", background: "#f0fdf4", borderColor: "#bbf7d0" }}>
          <p style={{ fontSize: "14px", color: "#166534", fontWeight: 600 }}>✓ Zero listing appraisal queue bottleneck. All submitted properties have been reviewed.</p>
        </div>
      )}

      <div className="ad-card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p className="ad-section-title">RentEase Platform Portfolio</p>
            <p className="ad-section-subtitle">Real estate directory registry tracking listings status</p>
          </div>
          <button className="ad-btn ad-btn--outline" onClick={() => handleCSVExport("properties")}>Export directory to CSV ⬇️</button>
        </div>
        
        <table className="ad-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Property Identifier</th>
              <th>Landlord</th>
              <th>Rent Periodical</th>
              <th>Operational Status</th>
              <th>Occupancy Space</th>
              <th style={{ textAlign: "right" }}>System Moderation</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id}>
                <td>
                  <p style={{ fontWeight: 600, color: "#111827" }}>{property.name}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{property.id} · {property.address}</p>
                </td>
                <td>{property.landlord}</td>
                <td style={{ fontWeight: 600 }}>GH₵{property.rent}</td>
                <td>
                  <Badge 
                    label={property.status} 
                    tone={property.status === "Live" ? "green" : property.status === "Pending Review" ? "yellow" : "red"} 
                  />
                </td>
                <td>
                  <Badge 
                    label={property.occupancy} 
                    tone={property.occupancy === "Occupied" ? "green" : "gray"} 
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  {property.status !== "Flagged" && (
                    <button 
                      className="ad-action-btn ad-action-btn--danger" 
                      onClick={() => handleFlagProperty(property.id, property.name)} 
                      title="Flag irregularities & suspend public listing"
                    >
                      🚩
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
