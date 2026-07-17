import { useState } from "react";
import StarRating from "../components/StarRating";
import { tenant, initialReviews, properties } from "../data/mockData";

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function submitReview() {
    if (!selectedProperty || rating === 0 || !comment) return alert("Please fill in all fields and select a rating.");
    const review = {
      id: reviews.length + 1,
      property: selectedProperty,
      rating,
      comment,
      author: tenant.name,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([review, ...reviews]);
    setSelectedProperty("");
    setRating(0);
    setComment("");
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Reviews</h1>
        <p className="page-desc">Share and manage your property reviews.</p>
      </div>

      <button className="btn btn-primary btn-block max-w" style={{ marginBottom: 20 }} onClick={() => setShowForm(!showForm)}>
        Write a Review
      </button>

      {showForm && (
        <div className="card card-pad max-w" style={{ marginBottom: 20 }}>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="select"
            style={{ marginBottom: 16 }}
          >
            <option value="" disabled>
              Select Property
            </option>
            {properties.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <p className="field-label">Rating</p>
          <div style={{ marginBottom: 16 }}>
            <StarRating rating={rating} onRate={setRating} />
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="textarea"
            style={{ marginBottom: 16 }}
          />

          <button className="btn btn-accent btn-block" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      )}

      {reviews.map((review) => (
        <div key={review.id} className="entity-card max-w">
          <div className="card-row" style={{ alignItems: "flex-start", marginBottom: 8 }}>
            <StarRating rating={review.rating} size={16} />
            <span style={{ fontSize: 12.5, color: "var(--ink-400)" }}>{review.date}</span>
          </div>
          <p style={{ fontWeight: 700, fontSize: 15, color: "var(--ink-900)", marginBottom: 6 }}>
            {review.property}
          </p>
          <p style={{ fontSize: 13.5, color: "var(--ink-700)", marginBottom: 8 }}>{review.comment}</p>
          <p style={{ fontSize: 12, color: "var(--ink-400)" }}>— {review.author}</p>
        </div>
      ))}
    </div>
  );
}
