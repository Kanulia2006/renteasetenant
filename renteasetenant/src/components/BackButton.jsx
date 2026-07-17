import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick, label = "Back to Settings" }) {
  return (
    <button onClick={onClick} className="back-link">
      <ArrowLeft size={16} strokeWidth={2.3} />
      {label}
    </button>
  );
}
