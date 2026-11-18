
import { ChevronRight } from 'lucide-react'

function ChatOptions({ options = [], onSelect, disabled = false }) {
  if (!options.length) return null

  return (
    <div className="ml-12 flex w-full max-w-md flex-col gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="group flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 text-left text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{option.label}</span>

          <ChevronRight
            size={18}
            className="shrink-0 text-text-muted transition group-hover:translate-x-1 group-hover:text-primary"
          />
        </button>
      ))}
    </div>
  )
}

export default ChatOptions
