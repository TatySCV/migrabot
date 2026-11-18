
import { useId } from 'react'

function Select({
  label,
  name,
  id,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Selecciona una opción',
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const selectId = id || name || generatedId

  return (
    <div className={fullWidth ? 'w-full' : ''}>

      {label && (
        <label
          htmlFor={selectId}
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

      <select
        id={selectId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helperText
              ? `${selectId}-helper`
              : undefined
        }
        className={`
          w-full rounded-lg border bg-surface px-4 py-3
          text-sm text-text outline-none transition-colors
          focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60
          ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border'}
          ${className}
        `}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-1.5 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${selectId}-helper`}
          className="mt-1.5 text-sm text-text-muted"
        >
          {helperText}
        </p>
      )}

    </div>
  )
}

export default Select
