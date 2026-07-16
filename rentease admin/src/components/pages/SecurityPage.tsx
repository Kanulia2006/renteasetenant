import React from "react";
import { AuditLog } from "../../types";
import { Badge, Toggle, accessControlRows } from "../Shared";

interface SecurityPageProps {
  auditLog: AuditLog[];
  securitySettings: {
    encryptPII: boolean;
    enforce2FA: boolean;
    autoRedact: boolean;
    rightToForget: boolean;
  };
  handleToggleSecurityOption: (key: "encryptPII" | "enforce2FA" | "autoRedact" | "rightToForget", label: string) => void;
  handleCSVExport: (table: "users" | "properties" | "disputes" | "transactions" | "auditLog") => void;
}

export function SecurityPage({
  auditLog,
  securitySettings,
  handleToggleSecurityOption,
  handleCSVExport
}: SecurityPageProps) {
  return (
    <div className="ad-page">
      <h1 className="ad-page-title">Compliance & Cyber Security Auditing</h1>
      <p className="ad-page-sub">Track comprehensive platform operations, security access control modifications, and toggle active user privacy rules.</p>

      <div className="ad-two-col">
        {/* Real-time interactive Audit log */}
        <div className="ad-card">
          <div className="ad-section-header">
            <div>
              <p className="ad-section-title">Active Security Audits Logging</p>
              <p className="ad-section-subtitle">Real-time systemic action tracking protocol</p>
            </div>
            <button className="ad-btn ad-btn--outline" style={{ fontSize: 12 }} onClick={() => handleCSVExport("auditLog")}>Export log to CSV ⬇️</button>
          </div>
          
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            <table className="ad-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Operator</th>
                  <th>Operation</th>
                  <th>Target ID</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((log, index) => (
                  <tr key={index}>
                    <td style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>{log.when}</td>
                    <td>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{log.actor}</p>
                      <p style={{ fontSize: 11, color: "#9ca3af" }}>{log.actorRole}</p>
                    </td>
                    <td style={{ fontSize: 12, fontWeight: 500 }}>{log.action}</td>
                    <td style={{ fontSize: 11, color: "#6b7280" }}>{log.target}</td>
                    <td>
                      <Badge 
                        label={log.severity} 
                        tone={log.severity === "Critical" ? "red" : log.severity === "Warn" ? "yellow" : "blue"} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GDPR Settings Panel */}
        <div className="ad-card">
          <p className="ad-section-title">Data Privacy & GDPR Controls</p>
          <p className="ad-section-subtitle">Toggle security system filters dynamically</p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block" }}>Encrypt Accountholder PII at Rest</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>AES-256 standard file encryption on user records</span>
              </div>
              <Toggle 
                checked={securitySettings.encryptPII} 
                onChange={() => handleToggleSecurityOption("encryptPII", "Encrypt Accountholder PII")} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block" }}>Force Administrative Multi-Factor Authenticator (2FA)</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Mandatory TOTP token challenge upon admin logging</span>
              </div>
              <Toggle 
                checked={securitySettings.enforce2FA} 
                onChange={() => handleToggleSecurityOption("enforce2FA", "Force Administrative MFA")} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block" }}>Automate Ledger PII Redaction on Export</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Hides email addresses and names in CSV triggers</span>
              </div>
              <Toggle 
                checked={securitySettings.autoRedact} 
                onChange={() => handleToggleSecurityOption("autoRedact", "Automate Ledger PII Redaction")} 
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block" }}>Adhere to GDPR 'Right to be Forgotten'</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Instantly purge all linked telemetry logs on account deletion</span>
              </div>
              <Toggle 
                checked={securitySettings.rightToForget} 
                onChange={() => handleToggleSecurityOption("rightToForget", "Adhere to GDPR Forgotten Right")} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Privilege Matrix table */}
      <div className="ad-card" style={{ marginTop: 24 }}>
        <p className="ad-section-title">System Role-Based Access Control (RBAC) Matrix</p>
        <p className="ad-section-subtitle">Current cryptographic privileges by user classification</p>
        <table className="ad-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Platform Resource Node</th>
              <th>Super System Administrator</th>
              <th>Support Operations Agent</th>
              <th>Compliance & Security Auditor</th>
            </tr>
          </thead>
          <tbody>
            {accessControlRows.map((row) => (
              <tr key={row.resource}>
                <td style={{ fontWeight: 600, color: "#111827" }}>{row.resource}</td>
                <td style={{ color: "#1a6b5a", fontWeight: 700 }}>{row.superAdmin}</td>
                <td style={{ color: "#4b5563" }}>{row.supportAdmin}</td>
                <td style={{ color: "#4b5563" }}>{row.auditor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
