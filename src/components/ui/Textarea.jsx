
import { useId } from 'react'

function Textarea({
  label,
  name,
  id,
  value,
  defaultValue,
  onChange,
  placeholder = '',
  rows = 4,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  resize = 'vertical',
  className = '',
  ...props
}) {
  const generatedId = useId()
  const textareaId = id || name || generatedId

  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>

      {label && (
        <label
          htmlFor={textareaId}
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

      <textarea
        id={textareaId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${textareaId}-error`
            : helperText
              ? `${textareaId}-helper`
              : undefined
        }
        className={`
          w-full rounded-lg border bg-surface px-4 py-3
          text-sm text-text outline-none transition-colors
          placeholder:text-text-muted
          focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60
          ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border'}
          ${resizeStyles[resize] ?? resizeStyles.vertical}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-1.5 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${textareaId}-helper`}
          className="mt-1.5 text-sm text-text-muted"
        >
          {helperText}
        </p>
      )}

    </div>
  )
}

export default Textarea
