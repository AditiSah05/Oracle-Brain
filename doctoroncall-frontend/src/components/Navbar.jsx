import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const baseLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Find Doctors' },
  { to: '/book', label: 'Appointments' },
  { to: '/track', label: 'Track' },
]

function Navbar() {
  const { auth, signOut } = useAuth()
  const navigate = useNavigate()

  const authLinks = auth.isLoggedIn
    ? [
        { to: auth.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard', label: 'Dashboard' },
        ...(auth.role === 'doctor' ? [{ to: '/doctor/dashboard', label: 'For Doctors' }] : []),
      ]
    : [{ to: '/auth/sign-in', label: 'Login' }, { to: '/doctor/dashboard', label: 'For Doctors' }]

  const links = [...baseLinks, ...authLinks]

  function handleLogout() {
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <header className="site-nav">
      <div className="container">
        <NavLink to="/" className="brand">
          Doctor<span>OnCall</span>
        </NavLink>
        <div className="nav-actions">
          <nav className="nav-links" aria-label="Main Navigation">
            {links.map((link) => (
              <NavLink
                key={`${link.to}-${link.label}`}
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          {auth.isLoggedIn ? (
            <button type="button" className="btn btn-outline nav-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Navbar
