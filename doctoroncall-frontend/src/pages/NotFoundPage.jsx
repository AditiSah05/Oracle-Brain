import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p className="muted">The route you requested does not exist in this frontend build.</p>
      <Link className="btn btn-secondary" to="/">
        Go to homepage
      </Link>
    </section>
  )
}

export default NotFoundPage
