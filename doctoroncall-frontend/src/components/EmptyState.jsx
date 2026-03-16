function EmptyState({ title, message, action }) {
  return (
    <section className="empty-state">
      <h3>{title}</h3>
      <p className="muted">{message}</p>
      {action ? <div className="cta-row">{action}</div> : null}
    </section>
  )
}

export default EmptyState
