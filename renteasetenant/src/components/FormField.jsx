export default function FormField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}
