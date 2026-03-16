import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'

function AuthSignInPage() {
  const [form, setForm] = useState({ email: '', password: '', role: 'patient' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!form.password.trim()) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    signIn({ email: form.email.trim(), role: form.role })
    setMessage('Signed in successfully. Redirecting...')

    const fromPath = location.state?.from
    const roleDashboard = form.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'
    const nextPath = fromPath || roleDashboard
    navigate(nextPath, { replace: true })
  }

  return (
    <div className="page">
      <PageHeader title="Sign In" subtitle="Securely access your DoctorOnCall account." />

      <section className="card auth-card">
        <form onSubmit={handleSubmit} className="stack" noValidate>
          <FormField id="sign-in-email" label="Email" error={errors.email}>
            <input id="sign-in-email" name="email" type="email" value={form.email} onChange={handleChange} />
          </FormField>

          <FormField id="sign-in-password" label="Password" error={errors.password}>
            <input
              id="sign-in-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormField>

          <FormField id="sign-in-role" label="Login as" error={errors.role}>
            <select id="sign-in-role" name="role" value={form.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </FormField>

          <button className="btn btn-primary" type="submit">
            Sign In
          </button>

          {message ? <p className="success">{message}</p> : null}

          <p className="muted">
            <Link to="/auth/forgot-password">Forgot password?</Link> | <Link to="/auth/sign-up">Create account</Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default AuthSignInPage
