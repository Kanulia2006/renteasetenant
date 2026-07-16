import React from "react";
import { User } from "../../types";
import { Badge, EmptyState } from "../Shared";

interface UsersPageProps {
  users: User[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleCSVExport: (table: "users" | "properties" | "disputes" | "transactions" | "auditLog") => void;
  handleVerifyUser: (id: string, name: string) => void;
  handleResetPassword: (name: string, id?: string) => void;
  handleToggleSuspendUser: (id: string, name: string, currentStatus: string) => void;
  handleRemoveUser: (id: string, name: string) => void;
}

export function UsersPage({
  users,
  searchQuery,
  setSearchQuery,
  handleCSVExport,
  handleVerifyUser,
  handleResetPassword,
  handleToggleSuspendUser,
  handleRemoveUser
}: UsersPageProps) {
  const filteredUsers = users.filter(u => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
  });

  return (
    <div className="ad-page">
      <h1 className="ad-page-title">User Registry & Moderation</h1>
      <p className="ad-page-sub">Comprehensive overview of all RentEase users. Verify landlords, moderate tenant profiles, and handle privilege controls.</p>

      {/* Custom Search Filter integration */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="ad-filters">
          <button 
            className={`ad-filter-btn ${!searchQuery ? "ad-filter-btn--active" : ""}`}
            onClick={() => setSearchQuery("")}
          >
            Reset Query
          </button>
          <button className="ad-filter-btn" onClick={() => handleCSVExport("users")}>Export registry to CSV ⬇️</button>
        </div>
        {searchQuery && (
          <p style={{ fontSize: "13px", color: "#1a6b5a" }}>
            Filtering by search keyword: <strong>"{searchQuery}"</strong>
          </p>
        )}
      </div>

      <div className="ad-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="ad-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Accountholder Identity</th>
              <th>Account Classification</th>
              <th>Operational Status</th>
              <th>Last Gateway Contact</th>
              <th style={{ textAlign: "right" }}>System Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState text="No accounts match the current query filter." />
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="ad-avatar">{user.initials}</div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: "#9ca3af" }}>{user.id} · {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{user.role}</td>
                  <td>
                    <Badge 
                      label={user.status} 
                      tone={user.status === "Active" ? "green" : user.status === "Pending" ? "yellow" : "red"} 
                    />
                  </td>
                  <td style={{ color: "#9ca3af" }}>{user.lastActive}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      {user.status === "Pending" && (
                        <button 
                          className="ad-action-btn" 
                          title="Approve & Verify Credentials" 
                          onClick={() => handleVerifyUser(user.id, user.name)}
                        >
                          ✓
                        </button>
                      )}
                      <button 
                        className="ad-action-btn" 
                        title="Force Security Password Reset" 
                        onClick={() => handleResetPassword(user.name, user.id)}
                      >
                        🔑
                      </button>
                      <button 
                        className="ad-action-btn" 
                        title={user.status === "Suspended" ? "Lift Suspension" : "Suspend Account"} 
                        onClick={() => handleToggleSuspendUser(user.id, user.name, user.status)}
                        style={{ color: user.status === "Suspended" ? "#1a6b5a" : "#dc2626" }}
                      >
                        ⊘
                      </button>
                      <button 
                        className="ad-action-btn ad-action-btn--danger" 
                        title="Purge Record Irreversibly" 
                        onClick={() => handleRemoveUser(user.id, user.name)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
