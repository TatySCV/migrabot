
import { Bot, User } from 'lucide-react'

function ChatMessage({ message, sender = 'bot' }) {
  const isBot = sender === 'bot'

  return (
    <div
      className={`flex items-start gap-3 ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {isBot && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Bot size={19} />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isBot
            ? 'rounded-tl-none bg-white text-text shadow-sm'
            : 'rounded-tr-none bg-primary text-white'
        }`}
      >
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {message}
        </p>
      </div>

      {!isBot && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
          <User size={19} />
        </div>
      )}
    </div>
  )
}

export default ChatMessage
