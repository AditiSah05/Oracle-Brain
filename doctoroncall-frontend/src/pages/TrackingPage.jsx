import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import StatusTimeline from '../components/StatusTimeline'
import { appointments, doctorById } from '../data/mockData'

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('DOC-9X2Q1')
  const [selectedAppointment, setSelectedAppointment] = useState(
    appointments.find((item) => item.trackingId === 'DOC-9X2Q1'),
  )
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  async function handleTrack(event) {
    event.preventDefault()
    setIsSearching(true)
    await new Promise((resolve) => {
      setTimeout(resolve, 350)
    })
    const result = appointments.find((item) => item.trackingId === trackingId.trim().toUpperCase())
    if (!result) {
      setSelectedAppointment(null)
      setError('Tracking ID not found. Please check and try again.')
      setIsSearching(false)
      return
    }
    setError('')
    setSelectedAppointment(result)
    setIsSearching(false)
  }

  return (
    <div className="page">
      <PageHeader title="Track Appointment" subtitle="Enter tracking ID to monitor appointment progress in real time." />

      <section className="card tracking-box">
        <form onSubmit={handleTrack} className="stack">
          <div className="form-group">
            <label htmlFor="tracking-id">Tracking ID</label>
            <input
              id="tracking-id"
              value={trackingId}
              onChange={(event) => setTrackingId(event.target.value)}
              placeholder="Example: DOC-9X2Q1"
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Track'}
            </button>
          </div>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </section>

      {!selectedAppointment && !isSearching ? (
        <EmptyState
          title="No appointment found"
          message="Use a valid tracking ID like DOC-9X2Q1 to view appointment progress."
        />
      ) : null}

      {selectedAppointment ? (
        <section className="card tracking-box">
          <h3>
            {selectedAppointment.id} | {selectedAppointment.patientName}
          </h3>
          <p className="muted">
            Doctor: {doctorById[selectedAppointment.doctorId]?.name} | {selectedAppointment.date} | {selectedAppointment.timeRange}
          </p>
          <StatusTimeline status={selectedAppointment.status} />
        </section>
      ) : null}
    </div>
  )
}

export default TrackingPage
