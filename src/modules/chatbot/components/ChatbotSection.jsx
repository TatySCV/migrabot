
import Container from '../../../components/ui/Container'
import Chatbot from './Chatbot'

function ChatbotSection() {
  return (
    <section
      id="probar-chatbot"
      className="bg-background py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary-dark">
            Asistente virtual
          </span>

          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
            Prueba tu orientación migratoria
          </h2>

          <p className="mt-5 leading-relaxed text-text-muted">
            Selecciona el tema de tu consulta y sigue las alternativas
            disponibles para encontrar información relacionada con
            procedimientos migratorios.
          </p>
        </div>

        <Chatbot />
      </Container>
    </section>
  )
}

export default ChatbotSection
