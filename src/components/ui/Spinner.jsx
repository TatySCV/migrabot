
const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-7 w-7 border-[3px]',
  lg: 'h-10 w-10 border-4',
}

function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Cargando...',
  showLabel = false,
  className = '',
}) {
  const colors = {
    primary: 'border-primary/20 border-t-primary',
    secondary: 'border-secondary/30 border-t-secondary-dark',
    white: 'border-white/30 border-t-white',
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span
        className={`
          animate-spin rounded-full
          ${sizes[size] ?? sizes.md}
          ${colors[color] ?? colors.primary}
        `}
        aria-hidden="true"
      />

      {showLabel && (
        <span className="text-sm text-text-muted">
          {label}
        </span>
      )}

      <span className="sr-only">
        {label}
      </span>
    </div>
  )
}

export default Spinner
