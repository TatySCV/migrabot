
import { useState } from 'react'

const sizes = {
  xs: 'h-7 w-7 text-xs',
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
}

const colors = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-primary',
  neutral: 'bg-slate-200 text-slate-700',
}

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function Avatar({
  src,
  name = 'Usuario',
  size = 'md',
  color = 'primary',
  shape = 'circle',
  className = '',
}) {
  const [hasError, setHasError] = useState(false)

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-xl',
  }

  const imageSize = sizes[size] ?? sizes.md
  const colorStyle = colors[color] ?? colors.primary
  const shapeStyle = shapeStyles[shape] ?? shapeStyles.circle

  return (
    <div
      role="img"
      aria-label={name}
      title={name}
      className={`
        inline-flex shrink-0 items-center justify-center
        overflow-hidden font-bold
        ${imageSize}
        ${shapeStyle}
        ${!src || hasError ? colorStyle : 'bg-background'}
        ${className}
      `}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}

export default Avatar
