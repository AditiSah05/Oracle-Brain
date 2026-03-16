function FormField({ id, label, error, children }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <span className="error">{error}</span> : null}
    </div>
  )
}

export default FormField
