import { cloneElement, isValidElement } from 'react'

function FormField({ id, label, error, children }) {
  const errorId = error ? `${id}-error` : undefined
  const control = isValidElement(children)
    ? cloneElement(children, {
        'aria-invalid': Boolean(error),
        'aria-describedby': errorId,
      })
    : children

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {control}
      {error ? <span id={errorId} className="error">{error}</span> : null}
    </div>
  )
}

export default FormField
