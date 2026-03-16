import { useRef, useState } from 'react'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const emailRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) {
      setError('Email is required.')
      setMessage('')
      emailRef.current?.focus()
      return
    }
    setError('')
    setMessage('Password reset link UI confirmed. Connect email API endpoint to complete flow.')
  }

  return (
    <div className="page">
      <PageHeader title="Password Recovery" subtitle="Send reset instructions securely to registered email accounts." />
      <section className="card auth-card">
        <form className="stack" onSubmit={handleSubmit} noValidate>
          <p className="sr-only" aria-live="polite">
            Enter your registered email to request a password reset link.
          </p>
          <FormField id="forgot-email" label="Registered email" error={error}>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              required
              ref={emailRef}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormField>
          <button className="btn btn-primary" type="submit">
            Send Reset Link
          </button>
          {error ? (
            <p className="error" role="alert" aria-live="assertive">
              Please enter a valid registered email.
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

export default ForgotPasswordPage
