
const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'max-w-none',
}

function Container({
  children,
  size = 'lg',
  padding = true,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const sizeStyles = sizes[size] ?? sizes.lg

  return (
    <Component
      className={`
        mx-auto w-full
        ${sizeStyles}
        ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container
