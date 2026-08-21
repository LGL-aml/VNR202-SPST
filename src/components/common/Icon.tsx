type IconProps = {
  name: string
  label?: string
  filled?: boolean
  className?: string
}

export function Icon({ name, label, filled = false, className = '' }: IconProps) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`material-symbols-outlined ${className}`.trim()}
      style={filled ? { fontVariationSettings: "'FILL' 1, 'wght' 450, 'GRAD' 0, 'opsz' 24" } : undefined}
    >
      {name}
    </span>
  )
}

