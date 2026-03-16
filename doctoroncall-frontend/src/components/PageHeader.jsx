function PageHeader({ title, subtitle, actions }) {
  return (
    <section className="card">
      <h1 className="section-title">{title}</h1>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      {actions ? <div className="cta-row">{actions}</div> : null}
    </section>
  )
}

export default PageHeader
