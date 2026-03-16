function PageHeader({ title, subtitle, actions, headingLevel = 'h1' }) {
  const HeadingTag = headingLevel === 'h2' ? 'h2' : 'h1'

  return (
    <section className="card">
      <HeadingTag className="section-title">{title}</HeadingTag>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      {actions ? <div className="cta-row">{actions}</div> : null}
    </section>
  )
}

export default PageHeader
