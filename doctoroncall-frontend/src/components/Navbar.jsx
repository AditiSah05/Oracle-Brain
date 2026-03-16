import { useEffect, useId, useRef, useState } from 'react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navPanelRef = useRef(null)
  const menuToggleRef = useRef(null)
  const menuId = useId()

  const authLinks = auth.isLoggedIn
    ? [
        { to: auth.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard', label: 'Dashboard' },
        ...(auth.role === 'doctor' ? [{ to: '/doctor/dashboard', label: 'For Doctors' }] : []),
      ]
    : [{ to: '/auth/sign-in', label: 'Login' }, { to: '/doctor/dashboard', label: 'For Doctors' }]

  const links = [...baseLinks, ...authLinks]

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    const navPanel = navPanelRef.current
    const focusableElements = navPanel?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    const firstFocusable = focusableElements?.[0]
    const lastFocusable = focusableElements?.[focusableElements.length - 1]

    firstFocusable?.focus()
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsMenuOpen(false)
        menuToggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !firstFocusable || !lastFocusable) return

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  function handleLogout() {
    signOut()
    setIsMenuOpen(false)
    navigate('/', { replace: true })
  }

  function handleMenuToggle() {
    setIsMenuOpen((open) => !open)
  }

  function handleMenuClose() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-nav" role="banner">
      <div className="container">
        <NavLink to="/" className="brand" aria-label="DoctorOnCall home">
          Doctor<span>OnCall</span>
        </NavLink>
        <div className="nav-actions">
          <button
            ref={menuToggleRef}
            type="button"
            className="btn btn-outline nav-toggle"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? 'Close menu' : 'Menu'}
          </button>
          <div ref={navPanelRef} id={menuId} className={`nav-panel${isMenuOpen ? ' open' : ''}`}>
            <nav className="nav-links" aria-label="Main Navigation">
              {links.map((link) => (
                <NavLink
                  key={`${link.to}-${link.label}`}
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={handleMenuClose}
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
      </div>
    </header>
  )
}

export default Navbar
