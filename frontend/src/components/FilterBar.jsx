const FILTERS = ["All", "Pending", "Completed"];

function FilterBar({ value, onChange }) {
  return (
    <div className="filters">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${value === filter ? "active" : ""}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
