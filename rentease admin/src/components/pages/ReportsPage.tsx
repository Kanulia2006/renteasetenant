import React from "react";
import { AreaChart, Area, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RevenueItem, ComplaintMixItem } from "../../types";
import { donutColors, reportTemplates, tagClass } from "../Shared";

interface ReportsPageProps {
  revenueData: RevenueItem[];
  complaintMix: ComplaintMixItem[];
  logEvent: (action: string, target: string, severity: "Info" | "Warn" | "Critical") => void;
  pushNotification: (msg: string) => void;
}

export function ReportsPage({
  revenueData,
  complaintMix,
  logEvent,
  pushNotification
}: ReportsPageProps) {
  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Executive Analytics</h1>
      <p className="ad-page-sub">Review financial growth curves, zonal occupancy analytics, and export operational summaries.</p>

      <div className="ad-two-col">
        <div className="ad-card">
          <p className="ad-section-title">Growth Curve & Commission Ledger</p>
          <p className="ad-section-subtitle">Six-month transactional readout overview</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="ledgerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a6b5a" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#1a6b5a" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={v => `GH₵${v/1000}k`} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v => `GH₵${Number(v).toLocaleString()}`} contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
              <Area type="monotone" dataKey="revenue" stroke="#1a6b5a" strokeWidth={2} fill="url(#ledgerGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="ad-card">
          <p className="ad-section-title">Complaint Distribution Breakdown</p>
          <p className="ad-section-subtitle">Core issues categories mixture</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie 
                data={complaintMix} 
                dataKey="value" 
                nameKey="name" 
                innerRadius={55} 
                outerRadius={80} 
                paddingAngle={3}
              >
                {complaintMix.map((_, i) => (
                  <Cell key={i} fill={donutColors[i % donutColors.length]} stroke="#ffffff" strokeWidth={2}/>
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
            </PieChart>
          </ResponsiveContainer>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: "10px" }}>
            {complaintMix.map((item, i) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: donutColors[i % donutColors.length], display: "inline-block" }}/>
                <span style={{ fontSize: "11px", color: "#374151", fontWeight: 500 }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template exports matrix */}
      <div className="ad-card">
        <p className="ad-section-title">Platform Ledger Export Templates</p>
        <p className="ad-section-subtitle">Generate compiled summaries for regulatory compliance readouts</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 14 }}>
          {reportTemplates.map(report => (
            <div key={report.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "#e6f4f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {report.icon}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{report.title}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{report.subtitle}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <span className={`ad-tag ${tagClass[report.tag]}`}>{report.tag}</span>
                <button 
                  className="ad-btn ad-btn--outline" 
                  style={{ fontSize: 12, padding: "6px 12px" }} 
                  onClick={() => {
                    logEvent("Triggered Template Compiling", `Report: ${report.title}`, "Info");
                    pushNotification(`Exported "${report.title}" report successfully!`);
                  }}
                >
                  Export ⬇️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
