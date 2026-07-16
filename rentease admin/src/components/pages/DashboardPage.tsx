import React from "react";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StatItem, RevenueItem, ComplaintCategoryItem, Dispute, Transaction } from "../../types";
import { NAV_ITEMS, Badge, EmptyState } from "../Shared";
import { IconDownload } from "../Icons";

interface DashboardPageProps {
  liveStats: StatItem[];
  revenueData: RevenueItem[];
  complaintsData: ComplaintCategoryItem[];
  disputes: Dispute[];
  transactions: Transaction[];
  setActivePage: (page: string) => void;
  setShowExportModal: (show: boolean) => void;
  handleResolveDispute: (id: string, title: string) => void;
}

export function DashboardPage({
  liveStats,
  revenueData,
  complaintsData,
  disputes,
  transactions,
  setActivePage,
  setShowExportModal,
  handleResolveDispute
}: DashboardPageProps) {
  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Dashboard Summary</h1>
      <p className="ad-page-sub">Central real-time indicators and operational platform performance charts.</p>

      {/* Stat Cards */}
      <div className="ad-stats">
        {liveStats.map((stat) => (
          <div key={stat.label} className="ad-stat-card">
            <p className="ad-stat-label">{stat.label}</p>
            <p className="ad-stat-value">
              {typeof stat.value === "number" && stat.label.includes("volume") ? `GH₵${stat.value.toLocaleString()}` : stat.value}
              {stat.suffix}
            </p>
            <p className={`ad-stat-change ad-stat-change--${stat.trend}`}>
              <span>{stat.trend === "up" ? "↗" : "↘"}</span>
              <span>{stat.change} vs last calendar month</span>
            </p>
          </div>
        ))}
      </div>

      {/* Quick links to core areas */}
      <div className="ad-card" style={{ marginBottom: 24 }}>
        <p className="ad-section-title" style={{ marginBottom: 16 }}>Rapid System Actions</p>
        <div className="ad-quicklinks">
          {NAV_ITEMS.filter(item => item.key !== "dashboard").map(({ key, label, Icon }) => (
            <button key={key} className="ad-quicklink" onClick={() => setActivePage(key)}>
              <Icon />
              <span>{label}</span>
            </button>
          ))}
          <button className="ad-quicklink" onClick={() => setShowExportModal(true)}>
            <IconDownload />
            <span>Download Assets</span>
          </button>
        </div>
      </div>

      {/* Charts Segment */}
      <div className="ad-two-col">
        <div className="ad-card">
          <div className="ad-section-header">
            <p className="ad-section-title">Rent Revenue vs Landlord Payouts</p>
          </div>
          <p className="ad-section-subtitle">Financial volume over current semester (GH₵)</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a6b5a" stopOpacity={0.35}/>
                  <stop offset="100%" stopColor="#1a6b5a" stopOpacity={0.02}/>
                </linearGradient>
                <linearGradient id="payoutGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.35}/>
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={val => `GH₵${val/1000}k`} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <Tooltip formatter={(val: any) => `GH₵${Number(val).toLocaleString()}`} contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
              <Area type="monotone" dataKey="revenue" stroke="#1a6b5a" strokeWidth={2} fill="url(#revenueGrad)"/>
              <Area type="monotone" dataKey="payouts" stroke="#6ee7b7" strokeWidth={2} fill="url(#payoutGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="ad-card">
          <div className="ad-section-header">
            <p className="ad-section-title">Open Tenant Complaints</p>
          </div>
          <p className="ad-section-subtitle">Aggregated distribution by core categorization</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={complaintsData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false}/>
              <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }}/>
              <Bar dataKey="count" fill="#1a6b5a" radius={[6, 6, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom dynamic list blocks */}
      <div className="ad-two-col">
        <div className="ad-card">
          <div className="ad-section-header">
            <div>
              <p className="ad-section-title">Escalated Disputes Registry</p>
              <p className="ad-section-subtitle">Immediate administrative mediation is required</p>
            </div>
            <button className="ad-section-link" onClick={() => setActivePage("complaints")}>Navigate to Disputes</button>
          </div>
          {disputes.filter(d => d.status === "Escalated").length > 0 ? (
            disputes.filter(d => d.status === "Escalated").map(dispute => (
              <div key={dispute.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{dispute.title}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{dispute.id} · {dispute.parties}</p>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Badge label="Escalated" tone="red" />
                  <button 
                    className="ad-btn ad-btn--outline" 
                    style={{ padding: "4px 8px", fontSize: "11px" }}
                    onClick={() => handleResolveDispute(dispute.id, dispute.title)}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState text="Zero escalated dispute files are pending review." />
          )}
        </div>

        <div className="ad-card">
          <div className="ad-section-header">
            <div>
              <p className="ad-section-title">Flagged Payments & Escrows</p>
              <p className="ad-section-subtitle">Financial clearing alerts requiring manual verification</p>
            </div>
            <button className="ad-section-link" onClick={() => setActivePage("payments")}>Financial Gateways</button>
          </div>
          {transactions.filter(t => t.status === "Flagged" || t.status === "Failed").length > 0 ? (
            transactions.filter(t => t.status === "Flagged" || t.status === "Failed").map(tx => (
              <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>
                    {tx.id} · {tx.tenant}
                  </p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>Method: {tx.method} · GH₵{tx.amount.toLocaleString()}</p>
                </div>
                <Badge label={tx.status} tone="red" />
              </div>
            ))
          ) : (
            <EmptyState text="Zero transaction irregularities have been detected." />
          )}
        </div>
      </div>
    </div>
  );
}
