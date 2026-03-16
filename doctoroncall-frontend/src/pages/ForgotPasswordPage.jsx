import { useState } from 'react'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) {
      setError('Email is required.')
      setMessage('')
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
          <FormField id="forgot-email" label="Registered email" error={error}>
            <input id="forgot-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </FormField>
          <button className="btn btn-primary" type="submit">
            Send Reset Link
          </button>
          {message ? <p className="success">{message}</p> : null}
        </form>
      </section>
    </div>
  )
}

export default ForgotPasswordPage
