export default function PeriodPills({ periods, selected, onSelect }) {
  return (
    <div className="pill-row">
      {periods.map((p) => (
        <button
          key={p.months}
          onClick={() => onSelect(p.months)}
          className={`btn-pill ${selected === p.months ? "is-active" : ""}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
