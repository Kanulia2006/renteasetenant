import { useState } from "react";
import { Camera } from "lucide-react";
import BackButton from "../components/BackButton";
import FormField from "../components/FormField";
import { user } from "../data/mockData";

export default function EditProfile({ onNavigate }) {
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  }

  function handleSave() {
    alert(`Profile saved!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    onNavigate("settings");
  }

  return (
    <div>
      <BackButton onClick={() => onNavigate("settings")} />
      <div className="page-head">
        <h1 className="page-title">Edit Profile</h1>
        <p className="page-desc">Update your photo, personal info, and how we reach you.</p>
      </div>

      <div className="card card-pad max-w" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <label style={{ cursor: "pointer", position: "relative" }}>
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid var(--line)",
                }}
              />
            ) : (
              <div className="avatar" style={{ width: 84, height: 84, fontSize: 26 }}>
                {user.initials}
              </div>
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--amber-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--card)",
                color: "#fff",
              }}
            >
              <Camera size={13} />
            </div>
          </label>
          <p style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 10 }}>Click the photo to change it</p>
        </div>

        <p className="section-label">Personal Info</p>
        <FormField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        <FormField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
        <FormField label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 XX XXX XXXX" />
      </div>

      <div className="card card-pad max-w" style={{ marginBottom: 20 }}>
        <p className="section-label">Emergency Contact</p>
        <FormField label="Contact Name" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} placeholder="Full name" />
        <FormField label="Contact Phone" type="tel" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} placeholder="+233 XX XXX XXXX" />
      </div>

      <button className="btn btn-primary btn-block max-w" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
