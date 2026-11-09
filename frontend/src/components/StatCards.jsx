function StatCards({ total, completed, pending }) {
  return (
    <section className="stats-grid">
      <article className="stat-card">
        <p>Total Tasks</p>
        <h2>{total}</h2>
      </article>
      <article className="stat-card">
        <p>Completed Tasks</p>
        <h2>{completed}</h2>
      </article>
      <article className="stat-card">
        <p>Pending Tasks</p>
        <h2>{pending}</h2>
      </article>
    </section>
  );
}

export default StatCards;
