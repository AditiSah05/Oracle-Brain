import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { appointments, doctorById, prescriptionsByAppointment } from '../data/mockData'

function PatientDashboardPage() {
  const completed = appointments.filter((appointment) => appointment.status === 'completed').length
  const upcoming = appointments.filter((appointment) => ['confirmed', 'inprogress'].includes(appointment.status)).length

  return (
    <div className="page">
      <PageHeader title="Patient Dashboard" subtitle="Review appointments, treatment status, and medication details." />

      <section className="grid-three">
        <StatCard title="Appointment History" value={appointments.length} hint="All records" />
        <StatCard title="Upcoming / Active" value={upcoming} hint="Need attention" />
        <StatCard title="Completed" value={completed} hint="Finished consultations" />
      </section>

      <section className="dashboard-grid">
        <article>
          <h3>Appointment History</h3>
          <div className="stack">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="records-box">
                <p>
                  <strong>{appointment.id}</strong> | {appointment.date} | {appointment.timeRange}
                </p>
                <p className="muted">Doctor: {doctorById[appointment.doctorId]?.name}</p>
                <span className={`pill ${appointment.status}`}>{appointment.status}</span>
                <div className="cta-row">
                  <Link className="btn btn-secondary" to={`/records/${appointment.id}`}>
                    Prescription & Invoice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article>
          <h3>Medication Snapshot</h3>
          <div className="stack">
            {appointments.map((appointment) => {
              const prescription = prescriptionsByAppointment[appointment.id]
              return (
                <div className="records-box" key={appointment.id}>
                  <p>
                    <strong>{appointment.id}</strong> | {prescription?.diagnosis || 'Diagnosis pending'}
                  </p>
                  <ul className="list">
                    {(prescription?.medications || ['No medication published yet']).map((medicine) => (
                      <li key={medicine}>{medicine}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}

export default PatientDashboardPage
