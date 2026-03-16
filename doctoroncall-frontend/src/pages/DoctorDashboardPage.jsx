import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { appointments, doctorById } from '../data/mockData'

function DoctorDashboardPage() {
  const [selectedId, setSelectedId] = useState(appointments[0]?.id || null)

  const selectedAppointment = useMemo(
    () => appointments.find((appointment) => appointment.id === selectedId),
    [selectedId],
  )

  const total = appointments.length
  const emergencyCount = appointments.filter((appointment) => appointment.type === 'emergency').length
  const activeCount = appointments.filter((appointment) => ['confirmed', 'inprogress'].includes(appointment.status)).length

  return (
    <div className="page">
      <PageHeader title="Doctor Dashboard" subtitle="Manage appointments, patient details, and treatment notes." />

      <section className="grid-three">
        <StatCard title="Total Appointments" value={total} hint="Today and upcoming" />
        <StatCard title="Active Cases" value={activeCount} hint="Confirmed + in-progress" />
        <StatCard title="Emergency Cases" value={emergencyCount} hint="Prioritized triage queue" />
      </section>

      <section className="dashboard-grid">
        <article>
          <h3>Appointment List</h3>
          <div className="stack">
            {appointments.map((appointment) => (
              <button
                key={appointment.id}
                className="btn btn-secondary"
                onClick={() => setSelectedId(appointment.id)}
                type="button"
              >
                {appointment.id} | {appointment.patientName} | {appointment.date}
              </button>
            ))}
          </div>
        </article>

        <article>
          <h3>Patient Details</h3>
          {selectedAppointment ? (
            <div className="stack">
              <p>
                <strong>Name:</strong> {selectedAppointment.patientName}
              </p>
              <p>
                <strong>Doctor:</strong> {doctorById[selectedAppointment.doctorId]?.name}
              </p>
              <p>
                <strong>Concern:</strong> {selectedAppointment.concern}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`pill ${selectedAppointment.status}`}>{selectedAppointment.status}</span>
              </p>
              <div className="records-box">
                <h4>Prescription & Treatment UI</h4>
                <p className="muted">Prescription editor and treatment plan components can connect to API mutations here.</p>
                <textarea rows="4" defaultValue="Example: Continue medications for 5 days and schedule follow-up." />
              </div>
            </div>
          ) : (
            <p className="muted">Select an appointment from the list.</p>
          )}
        </article>
      </section>
    </div>
  )
}

export default DoctorDashboardPage
