
const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-light',

  secondary:
    'bg-secondary text-primary hover:bg-secondary-dark',

  outline:
    'border border-primary bg-transparent text-primary hover:bg-primary hover:text-white',

  danger:
    'bg-danger text-white hover:bg-red-700',

  ghost:
    'bg-transparent text-text hover:bg-slate-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-semibold
    transition-colors duration-200
    focus:outline-none focus:ring-2
    focus:ring-primary focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `

  const variantStyles = variants[variant] ?? variants.primary
  const sizeStyles = sizes[size] ?? sizes.md

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles}
        ${sizeStyles}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  )
}

export default Button
