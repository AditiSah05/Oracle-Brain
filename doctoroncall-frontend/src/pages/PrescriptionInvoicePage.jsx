import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { appointments, doctorById, invoicesByAppointment, prescriptionsByAppointment } from '../data/mockData'

function money(value) {
  return `Rs. ${value}`
}

function PrescriptionInvoicePage() {
  const { appointmentId } = useParams()
  const appointment = appointments.find((item) => item.id === appointmentId)

  if (!appointment) {
    return (
      <div className="page">
        <section className="card">
          <h2>Appointment not found</h2>
          <p className="muted">This record ID does not exist in current mock data.</p>
          <Link className="btn btn-secondary" to="/patient/dashboard">
            Back to Dashboard
          </Link>
        </section>
      </div>
    )
  }

  const prescription = prescriptionsByAppointment[appointment.id]
  const invoice = invoicesByAppointment[appointment.id]

  return (
    <div className="page">
      <PageHeader
        title={`Records for ${appointment.id}`}
        subtitle={`${appointment.patientName} | ${doctorById[appointment.doctorId]?.name} | ${appointment.date}`}
      />

      <section className="record-grid">
        <article className="records-box">
          <h3>Prescription Preview</h3>
          <p>
            <strong>Diagnosis:</strong> {prescription?.diagnosis || 'Pending'}
          </p>
          <h4>Medications</h4>
          <ul className="list">
            {(prescription?.medications || ['No medications added']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>Doctor Notes:</strong> {prescription?.notes || 'No notes available'}
          </p>
        </article>

        <article className="records-box">
          <h3>Invoice Preview</h3>
          <p>Consultation Fee: {money(invoice?.consultationFee ?? 0)}</p>
          <p>Service Fee: {money(invoice?.serviceFee ?? 0)}</p>
          <p>Tax: {money(invoice?.taxes ?? 0)}</p>
          <hr />
          <p>
            <strong>Total: {money(invoice?.total ?? 0)}</strong>
          </p>
          <p className="muted">This layout is frontend-only and ready for printable export integration.</p>
        </article>
      </section>
    </div>
  )
}

export default PrescriptionInvoicePage
