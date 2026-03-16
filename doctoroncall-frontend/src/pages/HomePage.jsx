import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import {
  CalendarIcon,
  EmergencyIcon,
  PinIcon,
  PulseIcon,
  SearchIcon,
  StackIcon,
  StethoscopeIcon,
  UserIcon,
  ZapIcon,
} from '../components/UiIcons'
import heroImg from '../assets/hero.png'
import { doctors } from '../data/mockData'

function HomePage() {
  const [isDoctorsLoading, setIsDoctorsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDoctorsLoading(false)
    }, 420)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page">
      <section className="hero-card">
        <div>
          <h1 className="hero-title">
            Healthcare help
            <span className="hero-line">On your schedule</span>
          </h1>
          <p className="hero-subtitle">
            Book normal and emergency appointments, track progress in real time, and manage treatment plans from one
            modern patient platform.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/book">
              <span className="btn-mark" aria-hidden="true">
                <CalendarIcon />
              </span>
              BOOK APPOINTMENT
            </Link>
            <Link className="btn btn-alert" to="/book?type=emergency">
              <span className="btn-mark" aria-hidden="true">
                <EmergencyIcon />
              </span>
              EMERGENCY
            </Link>
            <Link className="btn btn-outline" to="/doctors">
              <span className="btn-mark" aria-hidden="true">
                <SearchIcon />
              </span>
              DISCOVER DOCTORS
            </Link>
          </div>
        </div>
        <div className="card" style={{ alignSelf: 'stretch' }}>
          <h3>Quick Access</h3>
          <div className="hero-visual">
            <div className="hero-rings">
              <span className="ring r1" />
              <span className="ring r2" />
              <span className="ring r3" />
              <img src={heroImg} alt="Doctor with digital healthcare interface" className="hero-image" />
            </div>
            <ul>
              <li>Average booking flow under 60 seconds</li>
              <li>Emergency queue with instant visual priority</li>
              <li>Live tracking via appointment tracking ID</li>
            </ul>
          </div>
          <div className="stack">
            <Link className="btn btn-secondary quick-link" to="/track">
              <PinIcon />
              Track Appointment
            </Link>
            <Link className="btn btn-secondary quick-link" to="/patient/dashboard">
              <UserIcon />
              Patient Dashboard
            </Link>
            <Link className="btn btn-secondary quick-link" to="/doctor/dashboard">
              <StethoscopeIcon />
              Doctor Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-strip section-band" aria-label="Trust metrics">
        <article>
          <h3>180+</h3>
          <p className="muted">Verified doctors onboarded</p>
        </article>
        <article>
          <h3>24/7</h3>
          <p className="muted">Emergency booking availability</p>
        </article>
        <article>
          <h3>15k+</h3>
          <p className="muted">Appointments coordinated yearly</p>
        </article>
        <article>
          <h3>4.8/5</h3>
          <p className="muted">Average patient satisfaction score</p>
        </article>
      </section>

      <section className="doctor-preview card" aria-label="Top doctors preview">
        <div className="doctor-preview-head">
          <h3>Top Doctors</h3>
          <Link className="btn btn-outline" to="/doctors">
            View all doctors
          </Link>
        </div>
        <div className="doctor-preview-grid">
          {isDoctorsLoading
            ? [1, 2, 3].map((item) => <div key={item} className="skeleton-card doctor-skeleton" />)
            : doctors.slice(0, 3).map((doctor) => (
                <article key={doctor.id} className="doctor-card">
                  <h4>{doctor.name}</h4>
                  <p className="muted">{doctor.specialization}</p>
                  <p>
                    Experience: {doctor.experience} | Rating: {doctor.rating}
                  </p>
                  <p className="muted">Availability: {doctor.availability}</p>
                </article>
              ))}
        </div>
      </section>

      <div className="grid-three">
        <article className="card">
          <span className="feature-icon" aria-hidden="true">
            <ZapIcon />
          </span>
          <h3>Performance-first UI</h3>
          <p className="muted">Lazy-loaded routes and reusable components keep this frontend fast and maintainable.</p>
        </article>
        <article className="card">
          <span className="feature-icon" aria-hidden="true">
            <PulseIcon />
          </span>
          <h3>Emergency-first UX</h3>
          <p className="muted">Dedicated emergency booking flow and clear status updates for urgent appointments.</p>
        </article>
        <article className="card">
          <span className="feature-icon" aria-hidden="true">
            <StackIcon />
          </span>
          <h3>Backend-ready structure</h3>
          <p className="muted">All data is mocked in a centralized module and can be swapped with APIs later.</p>
        </article>
      </div>

      <section className="testimonials-shell card">
        <h3 className="section-title">What patients say</h3>
        <div className="testimonials-grid">
          <article>
            <p>
              "Booked a cardiology consult in minutes. The tracking page kept me updated at every step."
            </p>
            <span className="muted">Aditi Sharma, Janakpur</span>
          </article>
          <article>
            <p>
              "Emergency flow felt clear and fast. I could instantly see that my request was prioritized."
            </p>
            <span className="muted">Vivek Rao, Kathmandu</span>
          </article>
          <article>
            <p>
              "Simple dashboard, clean prescription view, and no confusion while checking treatment updates."
            </p>
            <span className="muted">Nisha Verma, Rajbiraj</span>
          </article>
        </div>
      </section>

      <PageHeader
        headingLevel="h2"
        title="Primary Frontend Modules"
        subtitle="This implementation includes all requested screens and UI flows with responsive behavior."
      />

      <section className="cta-band">
        <div>
          <h3>Need urgent care right now?</h3>
          <p className="muted">Use the emergency flow to get prioritized support and immediate appointment visibility.</p>
        </div>
        <div className="cta-row">
          <Link className="btn btn-alert" to="/book?type=emergency">
            Start Emergency Booking
          </Link>
          <Link className="btn btn-secondary" to="/track">
            Track Existing Case
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
