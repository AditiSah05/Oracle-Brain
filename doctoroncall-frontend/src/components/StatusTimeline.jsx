const steps = ['pending', 'confirmed', 'inprogress', 'completed']

function prettyLabel(status) {
  return status === 'inprogress' ? 'In Progress' : status[0].toUpperCase() + status.slice(1)
}

function StatusTimeline({ status }) {
  const activeIndex = steps.indexOf(status)

  return (
    <div className="status-rail" role="list" aria-label="Appointment status timeline">
      {steps.map((step, index) => {
        let stateClass = ''
        if (index < activeIndex) stateClass = 'completed'
        if (index === activeIndex) stateClass = 'active'

        return (
          <div key={step} className={`status-step ${stateClass}`} role="listitem">
            <span className="dot" aria-hidden="true" />
            <span>
              <strong>{prettyLabel(step)}</strong>
              {index === activeIndex ? ' - current' : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default StatusTimeline
