import { useState } from 'react'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'

function DoctorVerifyEmailPage() {
  const [form, setForm] = useState({ email: '', code: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Doctor email is required.'
    if (!/^\d{6}$/.test(form.code)) nextErrors.code = 'Verification code must be 6 digits.'
    setErrors(nextErrors)
    setMessage(Object.keys(nextErrors).length === 0 ? 'Verification flow validated for doctor onboarding.' : '')
  }

  return (
    <div className="page">
      <PageHeader title="Doctor Email Verification" subtitle="Secure email verification screen for doctor onboarding." />
      <section className="card auth-card">
        <form className="stack" onSubmit={handleSubmit} noValidate>
          <FormField id="doctor-email" label="Doctor email" error={errors.email}>
            <input id="doctor-email" name="email" value={form.email} onChange={handleChange} type="email" />
          </FormField>

          <FormField id="doctor-code" label="6-digit verification code" error={errors.code}>
            <input id="doctor-code" name="code" value={form.code} onChange={handleChange} maxLength="6" />
          </FormField>

          <button className="btn btn-primary" type="submit">
            Verify Email
          </button>
          {message ? <p className="success">{message}</p> : null}
        </form>
      </section>
    </div>
  )
}

export default DoctorVerifyEmailPage
