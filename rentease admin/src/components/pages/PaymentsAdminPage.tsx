import React from "react";
import { Transaction } from "../../types";
import { Badge } from "../Shared";

interface PaymentsAdminPageProps {
  transactions: Transaction[];
  searchQuery: string;
  handlePaymentAnomalyScan: () => void;
  handleCSVExport: (table: "users" | "properties" | "disputes" | "transactions" | "auditLog") => void;
}

export function PaymentsAdminPage({
  transactions,
  searchQuery,
  handlePaymentAnomalyScan,
  handleCSVExport
}: PaymentsAdminPageProps) {
  const filteredTransactions = transactions.filter(t => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return t.id.toLowerCase().includes(q) || t.tenant.toLowerCase().includes(q) || t.property.toLowerCase().includes(q) || t.method.toLowerCase().includes(q);
  });

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Rent Transactions & Escrows</h1>
      <p className="ad-page-sub">Monitor rent clearing records, inspect flagged Mobile Money (MoMo) operations, and review systemic payout receipts.</p>

      <div className="ad-card" style={{ marginBottom: 24, padding: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <p className="ad-section-title">Financial Gateway Transactions Log</p>
            <p className="ad-section-subtitle">Aggregated processing tracking ledger</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="ad-btn ad-btn--outline" onClick={handlePaymentAnomalyScan}>⚠️ Run Gateway Integrity Scan</button>
            <button className="ad-btn ad-btn--primary" onClick={() => handleCSVExport("transactions")}>Export ledger to CSV ⬇️</button>
          </div>
        </div>

        <table className="ad-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>TX ID</th>
              <th>Tenant Accountholder</th>
              <th>Selected Property</th>
              <th>Gateway Method</th>
              <th>Date Triggered</th>
              <th>Gross Amount</th>
              <th>Clearing Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td style={{ fontWeight: 600, color: "#1a6b5a" }}>{tx.id}</td>
                <td style={{ fontWeight: 500 }}>{tx.tenant}</td>
                <td style={{ color: "#6b7280" }}>{tx.property}</td>
                <td>{tx.method}</td>
                <td style={{ color: "#9ca3af" }}>{tx.date}</td>
                <td style={{ fontWeight: 700, color: "#111827" }}>GH₵{tx.amount.toLocaleString()}</td>
                <td>
                  <Badge 
                    label={tx.status} 
                    tone={tx.status === "Completed" ? "green" : tx.status === "Pending" ? "blue" : "red"} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
