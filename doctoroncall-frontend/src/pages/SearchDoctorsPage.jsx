import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { doctors, specializations } from '../data/mockData'

const availabilityOptions = ['All', 'Available Today', 'Tomorrow', 'In 2 days']

function getInitialFilters(searchParams) {
  const initialQuery = searchParams.get('q') || ''
  const initialSpecialization = searchParams.get('specialization') || 'All'
  const initialAvailability = searchParams.get('availability') || 'All'
  const initialSortBy = searchParams.get('sort') || 'rating'

  return {
    query: initialQuery,
    specialization: specializations.includes(initialSpecialization) ? initialSpecialization : 'All',
    availability: availabilityOptions.includes(initialAvailability) ? initialAvailability : 'All',
    sortBy: ['rating', 'experience', 'fee'].includes(initialSortBy) ? initialSortBy : 'rating',
  }
}

function SearchDoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilters = useMemo(() => getInitialFilters(searchParams), [searchParams])
  const [query, setQuery] = useState(initialFilters.query)
  const [specialization, setSpecialization] = useState(initialFilters.specialization)
  const [availability, setAvailability] = useState(initialFilters.availability)
  const [sortBy, setSortBy] = useState(initialFilters.sortBy)
  const [activeDoctorId, setActiveDoctorId] = useState(null)
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
    const nextParams = {}
    if (query.trim()) nextParams.q = query.trim()
    if (specialization !== 'All') nextParams.specialization = specialization
    if (availability !== 'All') nextParams.availability = availability
    if (sortBy !== 'rating') nextParams.sort = sortBy
    setSearchParams(nextParams, { replace: true })
  }, [availability, query, setSearchParams, sortBy, specialization])

  useEffect(() => {
    return () => {
      if (filterTimerRef.current) {
        clearTimeout(filterTimerRef.current)
      }
    }
  }, [])

  const filteredDoctors = useMemo(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesQuery = doctor.name.toLowerCase().includes(query.toLowerCase())
      const matchesSpecialization = specialization === 'All' || doctor.specialization === specialization
      const matchesAvailability = availability === 'All' || doctor.availability === availability
      return matchesQuery && matchesSpecialization && matchesAvailability
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'fee') return a.fee - b.fee
      if (sortBy === 'experience') return parseInt(b.experience, 10) - parseInt(a.experience, 10)
      return b.rating - a.rating
    })
  }, [availability, query, sortBy, specialization])

  const activeDoctor = useMemo(
    () => filteredDoctors.find((doctor) => doctor.id === activeDoctorId) || null,
    [activeDoctorId, filteredDoctors],
  )

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
              {availabilityOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="search-sort">Sort by</label>
            <select
              id="search-sort"
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value)
                triggerFilteringFeedback()
              }}
            >
              <option value="rating">Top rated</option>
              <option value="experience">Most experienced</option>
              <option value="fee">Lowest fee</option>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setActiveDoctorId((currentId) => (currentId === doctor.id ? null : doctor.id))}
                  aria-expanded={activeDoctorId === doctor.id}
                  aria-controls={`doctor-profile-${doctor.id}`}
                >
                  {activeDoctorId === doctor.id ? 'Hide profile' : 'View profile'}
                </button>
                <Link className="btn btn-primary" to={`/book?doctor=${doctor.id}`}>
                  Book with this doctor
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeDoctor ? (
        <section id={`doctor-profile-${activeDoctor.id}`} className="card doctor-profile-card" aria-live="polite">
          <h3>{activeDoctor.name}</h3>
          <p className="muted">{activeDoctor.specialization}</p>
          <p>{activeDoctor.bio}</p>
          <p>
            <strong>Hospital:</strong> {activeDoctor.hospital}
          </p>
          <p>
            <strong>Education:</strong> {activeDoctor.education}
          </p>
          <p>
            <strong>Languages:</strong> {activeDoctor.languages.join(', ')}
          </p>
          <p>
            <strong>Consultation modes:</strong> {activeDoctor.consultationModes.join(', ')}
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to={`/book?doctor=${activeDoctor.id}`}>
              Continue with {activeDoctor.name}
            </Link>
          </div>
        </section>
      ) : null}

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
                setSortBy('rating')
                setActiveDoctorId(null)
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
