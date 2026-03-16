function BaseIcon({ children, className = 'ui-icon' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      {children}
    </svg>
  )
}

export function CalendarIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </BaseIcon>
  )
}

export function EmergencyIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 3l8 14H4L12 3z" />
      <path d="M12 9v4M12 16h.01" />
    </BaseIcon>
  )
}

export function SearchIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </BaseIcon>
  )
}

export function ZapIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" />
    </BaseIcon>
  )
}

export function PulseIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M3 12h4l2-4 4 8 2-4h6" />
    </BaseIcon>
  )
}

export function StackIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </BaseIcon>
  )
}

export function PinIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 22s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </BaseIcon>
  )
}

export function UserIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0116 0" />
    </BaseIcon>
  )
}

export function StethoscopeIcon({ className }) {
  return (
    <BaseIcon className={className}>
      <path d="M8 4v5a4 4 0 008 0V4" />
      <path d="M8 4H6M18 4h-2" />
      <path d="M16 13v2a4 4 0 11-8 0v-2" />
      <circle cx="18" cy="15" r="2" />
      <path d="M18 17v2" />
    </BaseIcon>
  )
}
