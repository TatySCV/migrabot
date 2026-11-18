
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from 'lucide-react'

const variants = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  danger: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: Info,
    iconColor: 'text-blue-600',
  },
}

function Alert({
  title,
  children,
  variant = 'info',
  dismissible = false,
  onClose,
  className = '',
}) {
  const styles = variants[variant] ?? variants.info
  const Icon = styles.icon

  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={`
        flex items-start gap-3 rounded-xl border p-4
        ${styles.container}
        ${className}
      `}
    >
      <Icon
        size={20}
        className={`mt-0.5 shrink-0 ${styles.iconColor}`}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        {title && (
          <h3 className="font-semibold">
            {title}
          </h3>
        )}

        <div className="mt-1 text-sm leading-relaxed">
          {children}
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="rounded-md p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}

export default Alert