
const variants = {
  default: 'bg-surface border border-border shadow-sm',

  outlined: 'bg-surface border border-primary',

  elevated: 'bg-surface shadow-lg',

  muted: 'bg-background border border-border',
}

const paddings = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) {
  const variantStyles = variants[variant] ?? variants.default
  const paddingStyles = paddings[padding] ?? paddings.md

  return (
    <div
      className={`
        rounded-xl
        transition-shadow duration-200
        ${variantStyles}
        ${paddingStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
