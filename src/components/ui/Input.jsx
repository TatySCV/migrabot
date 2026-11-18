
import { useId } from 'react'

function Input({
  label,
  name,
  id,
  type = 'text',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const inputId = id || name || generatedId

  return (
    <div className={fullWidth ? 'w-full' : ''}>

      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-text"
        >
          {label}

          {required && (
            <span className="ml-1 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` :
          helperText ? `${inputId}-helper` :
          undefined
        }
        className={`
          w-full rounded-lg border bg-surface px-4 py-3
          text-sm text-text outline-none transition-colors
          placeholder:text-text-muted
          focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60
          ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border'}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className="mt-1.5 text-sm text-text-muted"
        >
          {helperText}
        </p>
      )}

    </div>
  )
}

export default Input
