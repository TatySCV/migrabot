
import { RotateCcw, ArrowLeft, Bot } from 'lucide-react'

import ChatMessage from './ChatMessage'
import ChatOptions from './ChatOption'

function ChatWindow({
  currentNode,
  history = [],
  onSelectOption,
  onGoBack,
  onReset,
}) {
  if (!currentNode) {
    return null
  }

  const isAnswer = currentNode.type === 'answer'

  return (
    <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lg">

      {/* Encabezado */}
      <div className="flex items-center gap-3 bg-primary p-4 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <Bot size={22} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">Migrabot</h3>
          <p className="text-xs text-white/70">
            Asistente de orientación migratoria
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          aria-label="Reiniciar conversación"
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <RotateCcw size={19} />
        </button>
      </div>

      {/* Conversación */}
      <div className="flex min-h-[350px] flex-col gap-5 p-5">

        <ChatMessage
          message={currentNode.message}
          sender="bot"
        />

        {/* Alternativas */}
        {!isAnswer && (
          <ChatOptions
            options={currentNode.options}
            onSelect={onSelectOption}
          />
        )}

        {/* Respuesta final */}
        {isAnswer && (
          <div className="ml-12 rounded-xl border border-border bg-white p-4">
            <p className="text-sm font-semibold text-primary">
              Fuentes oficiales
            </p>

            {currentNode.sources?.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {currentNode.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-info underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-text-muted">
                Las fuentes oficiales se incorporarán al validar este contenido.
              </p>
            )}
          </div>
        )}

        {/* Navegación */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <button
            type="button"
            onClick={onGoBack}
            disabled={history.length === 0}
            className="flex items-center gap-2 text-sm font-medium text-text-muted transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={17} />
            Volver
          </button>

          {isAnswer && (
            <button
              type="button"
              onClick={onReset}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Nueva consulta
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
