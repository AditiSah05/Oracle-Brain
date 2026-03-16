import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import { appointments, doctors } from '../data/mockData'

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '12:00 PM - 12:30 PM',
  '03:00 PM - 03:30 PM',
  '03:30 PM - 04:00 PM',
  '05:00 PM - 05:30 PM',
]

function validate(values) {
  const errors = {}
  if (!values.patientName.trim()) errors.patientName = 'Patient name is required.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.date) errors.date = 'Select an appointment date.'
  if (!values.timeRange) errors.timeRange = 'Select a time range.'
  if (!values.doctorId) errors.doctorId = 'Select a preferred doctor.'
  if (!values.concern.trim()) errors.concern = 'Please describe symptoms or concern.'
  return errors
}

function BookingPage() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    patientName: '',
    email: '',
    type: searchParams.get('type') === 'emergency' ? 'emergency' : 'normal',
    date: '',
    timeRange: '',
    doctorId: searchParams.get('doctor') || '',
    concern: '',
  })
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  const selectedDoctor = useMemo(() => doctors.find((doctor) => doctor.id === form.doctorId), [form.doctorId])
  const bookedSlots = useMemo(() => {
    if (!form.doctorId || !form.date) return []

    return appointments
      .filter((appointment) => appointment.doctorId === form.doctorId && appointment.date === form.date)
      .map((appointment) => appointment.timeRange)
  }, [form.date, form.doctorId])

  const availableSlots = useMemo(
    () => timeSlots.filter((slot) => !bookedSlots.includes(slot)),
    [bookedSlots],
  )

  const selectedTimeRange = form.timeRange && !bookedSlots.includes(form.timeRange) ? form.timeRange : ''
  const nextAvailableSlot = availableSlots[0] || null

  function updateField(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate({ ...form, timeRange: selectedTimeRange })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const trackingId = `DOC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    setResult({ trackingId, status: form.type === 'emergency' ? 'prioritized' : 'queued' })
  }

  return (
    <div className="page">
      <PageHeader
        title="Book Appointment"
        subtitle="Choose doctor, date, and time slot. Emergency flow is prioritized in the triage queue."
      />

      <section className="card">
        <form className="stack" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <FormField id="patientName" label="Patient name" error={errors.patientName}>
              <input id="patientName" name="patientName" value={form.patientName} onChange={updateField} />
            </FormField>

            <FormField id="email" label="Email" error={errors.email}>
              <input id="email" name="email" type="email" value={form.email} onChange={updateField} />
            </FormField>

            <FormField id="type" label="Appointment type" error={errors.type}>
              <select id="type" name="type" value={form.type} onChange={updateField}>
                <option value="normal">Normal consultation</option>
                <option value="emergency">Emergency appointment</option>
              </select>
            </FormField>

            <FormField id="doctorId" label="Preferred doctor" error={errors.doctorId}>
              <select id="doctorId" name="doctorId" value={form.doctorId} onChange={updateField}>
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} | {doctor.specialization}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="date" label="Date" error={errors.date}>
              <input id="date" name="date" type="date" value={form.date} onChange={updateField} />
            </FormField>

            <FormField id="timeRange" label="Time range" error={errors.timeRange}>
              <select id="timeRange" name="timeRange" value={selectedTimeRange} onChange={updateField}>
                <option value="">Select slot</option>
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot)
                  return (
                    <option key={slot} value={slot} disabled={isBooked}>
                      {isBooked ? `${slot} (Booked)` : slot}
                    </option>
                  )
                })}
              </select>
            </FormField>
          </div>

          {form.doctorId && form.date ? (
            <div className="slot-hint" role="status" aria-live="polite">
              {nextAvailableSlot ? (
                <p className="muted">Next available slot: {nextAvailableSlot}</p>
              ) : (
                <p className="error">No slots left for this date. Please choose another date.</p>
              )}
            </div>
          ) : null}

          <FormField id="concern" label="Symptoms / Notes" error={errors.concern}>
            <textarea id="concern" name="concern" rows="4" value={form.concern} onChange={updateField} />
          </FormField>

          {selectedDoctor ? (
            <p className="muted">
              Estimated consultation fee with {selectedDoctor.name}: Rs. {selectedDoctor.fee}
            </p>
          ) : null}

          <div>
            <button className={`btn ${form.type === 'emergency' ? 'btn-alert' : 'btn-primary'}`} type="submit">
              {form.type === 'emergency' ? 'Request Emergency Appointment' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </section>

      {result ? (
        <section className="card success">
          Appointment request submitted. Tracking ID: <strong>{result.trackingId}</strong> | Queue: {result.status}
        </section>
      ) : null}
    </div>
  )
}

export default BookingPage
