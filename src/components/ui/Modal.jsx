

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
}

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  showCloseButton = true,
}) {
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeStyles = sizes[size] ?? sizes.md

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (closeOnOverlay && event.target === event.currentTarget) {
          onClose?.()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className={`
          w-full ${sizeStyles} max-h-[90vh]
          overflow-y-auto rounded-2xl bg-surface shadow-2xl
        `}
      >
        {(title || showCloseButton) && (
          <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-bold text-primary"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-text-muted"
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-text-muted transition hover:bg-background hover:text-text"
              >
                <X size={20} />
              </button>
            )}
          </header>
        )}

        <div className="px-6 py-5">
          {children}
        </div>

        {footer && (
          <footer className="flex justify-end gap-3 border-t border-border bg-background/50 px-6 py-4">
            {footer}
          </footer>
        )}
      </section>
    </div>,
    document.body
  )
}

export default Modal
