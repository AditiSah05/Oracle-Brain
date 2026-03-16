import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { doctors, specializations } from '../data/mockData'

function SearchDoctorsPage() {
  const [query, setQuery] = useState('')
  const [specialization, setSpecialization] = useState('All')
  const [availability, setAvailability] = useState('All')
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimerRef = useRef(null)

  function triggerFilteringFeedback() {
    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current)
    }
    setIsFiltering(true)
    filterTimerRef.current = setTimeout(() => {
      setIsFiltering(false)
    }, 250)
  }

  useEffect(() => {
    return () => {
      if (filterTimerRef.current) {
        clearTimeout(filterTimerRef.current)
      }
    }
  }, [])

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesQuery = doctor.name.toLowerCase().includes(query.toLowerCase())
      const matchesSpecialization = specialization === 'All' || doctor.specialization === specialization
      const matchesAvailability = availability === 'All' || doctor.availability === availability
      return matchesQuery && matchesSpecialization && matchesAvailability
    })
  }, [availability, query, specialization])

  return (
    <div className="page">
      <PageHeader title="Find Doctors" subtitle="Filter by specialization and availability for quick appointment booking." />

      <section className="card">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="search-query">Doctor name</label>
            <input
              id="search-query"
              placeholder="Search by name"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                triggerFilteringFeedback()
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="search-specialization">Specialization</label>
            <select
              id="search-specialization"
              value={specialization}
              onChange={(event) => {
                setSpecialization(event.target.value)
                triggerFilteringFeedback()
              }}
            >
              <option>All</option>
              {specializations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="search-availability">Availability</label>
            <select
              id="search-availability"
              value={availability}
              onChange={(event) => {
                setAvailability(event.target.value)
                triggerFilteringFeedback()
              }}
            >
              <option>All</option>
              <option>Available Today</option>
              <option>Tomorrow</option>
              <option>In 2 days</option>
            </select>
          </div>
        </div>
      </section>

      {isFiltering ? (
        <section className="skeleton-grid" aria-label="Loading doctors">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </section>
      ) : (
        <section className="search-grid">
          {filteredDoctors.map((doctor) => (
            <article key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p className="muted">{doctor.specialization}</p>
              <p>
                Experience: {doctor.experience} | Rating: {doctor.rating}
              </p>
              <p>
                Availability: <strong>{doctor.availability}</strong>
              </p>
              <p>Consultation fee: Rs. {doctor.fee}</p>
              <div className="cta-row">
                <Link className="btn btn-primary" to={`/book?doctor=${doctor.id}`}>
                  Book with this doctor
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}

      {!isFiltering && filteredDoctors.length === 0 ? (
        <EmptyState
          title="No doctors match these filters"
          message="Try changing specialization or availability to discover more options."
          action={
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setQuery('')
                setSpecialization('All')
                setAvailability('All')
                triggerFilteringFeedback()
              }}
            >
              Reset Filters
            </button>
          }
        />
      ) : null}
    </div>
  )
}

export default SearchDoctorsPage
