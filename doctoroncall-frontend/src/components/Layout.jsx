import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    const mainElement = mainRef.current
    if (!mainElement) return

    // Move focus on route changes so keyboard and screen-reader users land in page content immediately.
    requestAnimationFrame(() => {
      const heading = mainElement.querySelector('h1')
      if (heading instanceof HTMLElement) {
        heading.setAttribute('tabindex', '-1')
        heading.focus()
        return
      }
      mainElement.focus()
    })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" ref={mainRef} className="main-content" tabIndex="-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
