import { useRef, useState } from 'react'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'

function DoctorVerifyEmailPage() {
  const [form, setForm] = useState({ email: '', code: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const fieldRefs = useRef({})

  function setFieldRef(name) {
    return (element) => {
      fieldRefs.current[name] = element
    }
  }

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
    if (Object.keys(nextErrors).length > 0) {
      const [firstInvalidField] = Object.keys(nextErrors)
      fieldRefs.current[firstInvalidField]?.focus()
      setMessage('')
      return
    }
    setMessage('Verification flow validated for doctor onboarding.')
  }

  return (
    <div className="page">
      <PageHeader title="Doctor Email Verification" subtitle="Secure email verification screen for doctor onboarding." />
      <section className="card auth-card">
        <form className="stack" onSubmit={handleSubmit} noValidate>
          <p className="sr-only" aria-live="polite">
            Enter doctor email and six-digit verification code.
          </p>
          <FormField id="doctor-email" label="Doctor email" error={errors.email}>
            <input
              id="doctor-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
              required
              ref={setFieldRef('email')}
            />
          </FormField>

          <FormField id="doctor-code" label="6-digit verification code" error={errors.code}>
            <input
              id="doctor-code"
              name="code"
              value={form.code}
              onChange={handleChange}
              maxLength="6"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              ref={setFieldRef('code')}
            />
          </FormField>

          <button className="btn btn-primary" type="submit">
            Verify Email
          </button>
          {Object.keys(errors).length > 0 ? (
            <p className="error" role="alert" aria-live="assertive">
              Please fix the highlighted fields before submitting.
            </p>
          ) : null}
          {message ? (
            <p className="success" role="status" aria-live="polite">
              {message}
            </p>
          ) : null}
        </form>
      </section>
    </div>
  )
}

export default DoctorVerifyEmailPage
