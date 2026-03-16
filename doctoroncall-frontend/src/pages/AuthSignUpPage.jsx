import { Link } from 'react-router-dom'
import { useState } from 'react'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'

function AuthSignUpPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    role: 'patient',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.password.length < 8) nextErrors.password = 'Password must have at least 8 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setMessage('Account details validated and ready for API integration.')
  }

  return (
    <div className="page">
      <PageHeader title="Create Account" subtitle="Register as patient or doctor with validated onboarding forms." />

      <section className="card auth-card">
        <form className="stack" onSubmit={handleSubmit} noValidate>
          <FormField id="sign-up-full-name" label="Full name" error={errors.fullName}>
            <input id="sign-up-full-name" name="fullName" value={form.fullName} onChange={handleChange} />
          </FormField>

          <FormField id="sign-up-email" label="Email" error={errors.email}>
            <input id="sign-up-email" type="email" name="email" value={form.email} onChange={handleChange} />
          </FormField>

          <FormField id="sign-up-role" label="Role" error={errors.role}>
            <select id="sign-up-role" name="role" value={form.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </FormField>

          <FormField id="sign-up-password" label="Password" error={errors.password}>
            <input id="sign-up-password" type="password" name="password" value={form.password} onChange={handleChange} />
          </FormField>

          <FormField id="sign-up-confirm-password" label="Confirm password" error={errors.confirmPassword}>
            <input
              id="sign-up-confirm-password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </FormField>

          <button className="btn btn-primary" type="submit">
            Create Account
          </button>
          {message ? <p className="success">{message}</p> : null}

          <p className="muted">
            Already registered? <Link to="/auth/sign-in">Sign in</Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default AuthSignUpPage
