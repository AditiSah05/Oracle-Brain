import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <p>
            <strong>DoctorOnCall</strong> | Reliable digital care booking and tracking.
          </p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/doctors">Find Doctors</Link>
            <Link to="/track">Track Case</Link>
            <Link to="/book?type=emergency">Emergency Help</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
