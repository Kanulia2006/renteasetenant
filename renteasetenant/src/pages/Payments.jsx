import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import Badge from "../components/Badge";
import PeriodPills from "../components/PeriodPills";
import { invoice, paymentHistory, periods } from "../data/mockData";

export default function Payments() {
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const total = invoice.amount * selectedMonths;

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Payments</h1>
        <p className="page-desc">Pay your rent and review your payment history.</p>
      </div>

      <div className="card card-pad max-w" style={{ marginBottom: 32 }}>
        <div className="card-row" style={{ marginBottom: 20 }}>
          <span className="card-title">Current Invoice</span>
          <Badge tone="red">Unpaid</Badge>
        </div>

        <div className="card-row">
          <span className="card-row-label">Period</span>
          <span className="card-row-value">{invoice.period}</span>
        </div>
        <div className="card-row">
          <span className="card-row-label">Due Date</span>
          <span className="card-row-value">{invoice.dueDate}</span>
        </div>
        <div className="card-row">
          <span className="card-row-label">Property</span>
          <span className="card-row-value">{invoice.property}</span>
        </div>

        <div
          className="card-row"
          style={{ paddingTop: 14, marginTop: 6, marginBottom: 20, borderTop: "1px solid var(--line-soft)" }}
        >
          <span style={{ fontWeight: 700, color: "var(--ink-800)" }}>Total Due</span>
          <span style={{ fontWeight: 800, fontSize: 22, color: "var(--brand-500)" }}>
            {invoice.currency}
            {total.toLocaleString()}
          </span>
        </div>

        <p className="section-label">Collection Period</p>
        <PeriodPills periods={periods} selected={selectedMonths} onSelect={setSelectedMonths} />
        <p style={{ fontSize: 13, color: "var(--ink-500)", margin: "10px 0 20px" }}>
          {invoice.currency}
          {invoice.amount.toLocaleString()} × {selectedMonths} month{selectedMonths > 1 ? "s" : ""}
        </p>

        <div className="input-icon-wrap" style={{ marginBottom: 12 }}>
          <CreditCard size={17} />
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card number"
            className="input"
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="input"
          />
          <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" className="input" />
        </div>

        <p
          style={{
            fontSize: 12,
            color: "var(--ink-400)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Lock size={13} /> Secured with 256-bit SSL encryption
        </p>

        <button
          className="btn btn-accent btn-block"
          onClick={() => alert(`Processing payment of ${invoice.currency}${total.toLocaleString()}...`)}
        >
          Pay {invoice.currency}
          {total.toLocaleString()}
        </button>
      </div>

      <div className="max-w">
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: "var(--ink-900)" }}>
          Payment History
        </h2>
        {paymentHistory.map((p) => (
          <div key={p.id} className="row-card">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--ink-800)", marginBottom: 4 }}>
                {p.month}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-400)" }}>Paid {p.paidOn}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink-800)", marginBottom: 4 }}>
                {invoice.currency}
                {p.amount.toLocaleString()}
              </div>
              <Badge tone="green">Paid</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
