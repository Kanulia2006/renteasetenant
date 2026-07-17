import { Star } from "lucide-react";

export default function StarRating({ rating, onRate, size = 20 }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate && onRate(star)}
          aria-label={`${star} star`}
          style={{
            border: "none",
            background: "none",
            padding: 0,
            cursor: onRate ? "pointer" : "default",
            display: "inline-flex",
            color: star <= rating ? "#f59e0b" : "#d1d5db",
          }}
        >
          <Star size={size} fill={star <= rating ? "#f59e0b" : "none"} strokeWidth={1.6} />
        </button>
      ))}
    </div>
  );
}
