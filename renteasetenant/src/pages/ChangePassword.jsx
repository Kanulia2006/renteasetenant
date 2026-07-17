import { useState } from "react";
import BackButton from "../components/BackButton";
import FormField from "../components/FormField";

export default function ChangePassword({ onNavigate }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const strength = newPw.length === 0 ? null : newPw.length < 6 ? "Weak" : newPw.length < 10 ? "Medium" : "Strong";
  const strengthColor = strength === "Weak" ? "var(--red-500)" : strength === "Medium" ? "var(--amber-500)" : "var(--green-600)";
  const strengthWidth = strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%";

  function handleSave() {
    if (!currentPw || !newPw || !confirmPw) return alert("Please fill in all fields.");
    if (newPw !== confirmPw) return alert("New passwords don't match.");
    alert("Password updated successfully!");
    onNavigate("settings");
  }

  return (
    <div>
      <BackButton onClick={() => onNavigate("settings")} />
      <div className="page-head">
        <h1 className="page-title">Change Password</h1>
        <p className="page-desc">Choose a strong password you don't use elsewhere.</p>
      </div>

      <div className="card card-pad max-w">
        <FormField label="Current Password" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Enter current password" />
        <FormField label="New Password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Enter new password" />

        {strength && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, marginTop: -8 }}>
            <div className="strength-track">
              <div className="strength-fill" style={{ width: strengthWidth, background: strengthColor }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: strengthColor }}>{strength}</span>
          </div>
        )}

        <FormField label="Confirm New Password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Re-enter new password" />

        <button className="btn btn-primary btn-block" onClick={handleSave}>
          Update Password
        </button>
      </div>
    </div>
  );
}
