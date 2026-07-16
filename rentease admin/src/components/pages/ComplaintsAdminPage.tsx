import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Dispute, ComplaintCategoryItem } from "../../types";
import { Badge, EmptyState } from "../Shared";

interface ComplaintsAdminPageProps {
  disputes: Dispute[];
  searchQuery: string;
  complaintsData: ComplaintCategoryItem[];
  handleResolveDispute: (id: string, title: string) => void;
  handleEscalateDispute: (id: string, title: string) => void;
}

export function ComplaintsAdminPage({
  disputes,
  searchQuery,
  complaintsData,
  handleResolveDispute,
  handleEscalateDispute
}: ComplaintsAdminPageProps) {
  const filteredDisputes = disputes.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.property.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
  });

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">RentEase Dispute Resolution Center</h1>
      <p className="ad-page-sub">Administer compliance, investigate property complaints, and moderate disputes raised by tenants and landlords.</p>

      <div className="ad-two-col">
        <div className="ad-card">
          <div className="ad-section-header">
            <div>
              <p className="ad-section-title">Active Platform Disputes</p>
              <p className="ad-section-subtitle">Click actions to mediate and resolve conflicts directly</p>
            </div>
          </div>

          <table className="ad-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Issue File</th>
                <th>Parties Involved</th>
                <th>File Priority</th>
                <th>Oversight Status</th>
                <th style={{ textAlign: "right" }}>Arbitrate</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisputes.map((dispute) => (
                <tr key={dispute.id}>
                  <td>
                    <p style={{ fontWeight: 600, color: "#111827" }}>{dispute.title}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>{dispute.id} · {dispute.property}</p>
                  </td>
                  <td>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>{dispute.partyA}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>vs {dispute.partyB}</p>
                  </td>
                  <td>
                    <Badge 
                      label={dispute.priority} 
                      tone={dispute.priority === "High" ? "red" : dispute.priority === "Medium" ? "yellow" : "blue"} 
                    />
                  </td>
                  <td>
                    <Badge 
                      label={dispute.status} 
                      tone={dispute.status === "Resolved" ? "green" : dispute.status === "Escalated" ? "red" : dispute.status === "In Review" ? "yellow" : "blue"} 
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                      {dispute.status !== "Resolved" && (
                        <button 
                          className="ad-btn ad-btn--primary" 
                          style={{ padding: "4px 8px", fontSize: "11px" }}
                          onClick={() => handleResolveDispute(dispute.id, dispute.title)}
                        >
                          Resolve ✓
                        </button>
                      )}
                      {dispute.status === "Open" && (
                        <button 
                          className="ad-btn ad-btn--outline" 
                          style={{ padding: "4px 8px", fontSize: "11px", color: "#dc2626", borderColor: "#fecaca" }}
                          onClick={() => handleEscalateDispute(dispute.id, dispute.title)}
                        >
                          Escalate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ad-card" style={{ maxHeight: 520 }}>
          <p className="ad-section-title">Open Complaint Categories Mix</p>
          <p className="ad-section-subtitle">Real-time analytical distribution metrics</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={complaintsData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false}/>
              <XAxis type="number" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} width={90}/>
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
              <Bar dataKey="count" fill="#1a6b5a" radius={[0, 6, 6, 0]} barSize={18}/>
            </BarChart>
          </ResponsiveContainer>
          
          <div style={{ marginTop: "16px", padding: "14px", background: "#f9fafb", borderRadius: "8px" }}>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>System Note:</p>
            <p style={{ fontSize: "12px", color: "#6b7280" }}>Maintenance and property repairs constitute approximately 65% of raised disputes. RentEase recommends checking automated landlord SLA compliance settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
