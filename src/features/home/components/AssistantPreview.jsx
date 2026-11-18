import { Bot, User, ChevronRight, ShieldCheck } from 'lucide-react'

function AssistantPreview() {
  const options = [
    'Quiero consultar sobre mi situación migratoria',
    'Necesito información para viajar',
    'Tengo dudas sobre documentos',
  ]

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">

      {/* Encabezado */}
      <div className="flex items-center gap-3 bg-primary p-4 text-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
          <Bot size={24} />
        </div>

        <div>
          <h3 className="font-semibold">Migrabot</h3>
          <p className="text-xs text-white/70">
            Asistente de orientación migratoria
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1 text-xs">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          En línea
        </div>
      </div>

      {/* Conversación de ejemplo */}
      <div className="space-y-5 bg-background p-5">

        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Bot size={17} />
          </div>

          <div className="max-w-[85%] rounded-xl rounded-tl-none bg-white p-3 shadow-sm">
            <p className="text-sm text-text">
              ¡Hola! Soy Migrabot. Estoy aquí para orientarte sobre trámites
              y procedimientos migratorios relacionados con la PDI.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-end gap-2">
          <div className="rounded-xl rounded-tr-none bg-primary p-3 text-white">
            <p className="text-sm">Necesito orientación.</p>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <User size={17} />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Bot size={17} />
          </div>

          <div className="max-w-[85%] rounded-xl rounded-tl-none bg-white p-3 shadow-sm">
            <p className="mb-3 text-sm text-text">
              ¡Claro! Selecciona una de las siguientes opciones para comenzar:
            </p>

            <div className="space-y-2">
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border p-3 text-sm text-primary"
                >
                  <span>{option}</span>
                  <ChevronRight size={16} className="shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pie */}
      <div className="flex items-center justify-center gap-2 border-t border-border bg-white p-3">
        <ShieldCheck size={15} className="text-success" />
        <p className="text-xs text-text-muted">
          Orientación informativa basada en fuentes oficiales
        </p>
      </div>
    </div>
  )
}

export default AssistantPreview