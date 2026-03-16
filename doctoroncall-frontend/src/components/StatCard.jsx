function StatCard({ title, value, hint }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p style={{ fontSize: '1.8rem', margin: '0.1rem 0 0.2rem', fontWeight: 700 }}>{value}</p>
      <p className="muted">{hint}</p>
    </article>
  )
}

export default StatCard
