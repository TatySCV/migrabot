
import { useState } from 'react'

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
  auto: '',
}

function Image({
  src,
  alt = '',
  aspect = 'auto',
  fit = 'cover',
  rounded = 'lg',
  fallback,
  className = '',
  containerClassName = '',
  ...props
}) {
  const [hasError, setHasError] = useState(false)

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  const fitStyles = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }

  const aspectStyles = aspectRatios[aspect] ?? aspectRatios.auto
  const roundedStyle = roundedStyles[rounded] ?? roundedStyles.lg
  const fitStyle = fitStyles[fit] ?? fitStyles.cover

  const imageClasses = `
    h-full w-full
    ${fitStyle}
    ${roundedStyle}
    ${className}
  `

  if (!src || hasError) {
    return (
      <div
        className={`
          flex items-center justify-center
          overflow-hidden bg-background
          ${aspectStyles}
          ${roundedStyle}
          ${containerClassName}
        `}
        role="img"
        aria-label={alt || 'Imagen no disponible'}
      >
        {fallback || (
          <span className="px-3 text-center text-sm text-text-muted">
            Imagen no disponible
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={`
        overflow-hidden
        ${aspectStyles}
        ${containerClassName}
      `}
    >
      <img
        src={src}
        alt={alt}
        className={imageClasses}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  )
}

export default Image
