
import { useChatbot } from '../hooks/useChatbot'

import ChatWindow from './ChatWindow'
import ChatMessage from './ChatMessage'
import ChatOptions from './ChatOption'

function Chatbot() {
  const {
    flows,
    activeFlow,
    currentNode,
    history,
    startFlow,
    selectOption,
    goBack,
    resetChat,
  } = useChatbot()

  // Selección inicial de categoría
  if (!activeFlow) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-background p-6 shadow-lg">
        <ChatMessage
          message="¡Hola! Soy Migrabot. Selecciona el tema sobre el que necesitas orientación."
          sender="bot"
        />

        <div className="mt-5 space-y-3">
          {flows.map((flow) => (
            <button
              key={flow.id}
              type="button"
              onClick={() => startFlow(flow.id)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-white p-4 text-left transition hover:border-primary hover:bg-primary/5"
            >
              <div>
                <h3 className="font-semibold text-primary">
                  {flow.title}
                </h3>

                <p className="mt-1 text-sm text-text-muted">
                  {flow.description}
                </p>
              </div>

              <span className="text-primary">›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <ChatWindow
      currentNode={currentNode}
      history={history}
      onSelectOption={selectOption}
      onGoBack={goBack}
      onReset={resetChat}
    />
  )
}

export default Chatbot
