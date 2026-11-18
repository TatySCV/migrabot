import {
  MessageCircleQuestion,
  Mail,
  ShieldCheck,
} from 'lucide-react'

import Container from '../../../components/ui/Container'
import Card from '../../../components/ui/Card'

function HelpSection() {
  return (
    <section id='ayuda' className="bg-background py-16 md:py-20">
      <Container>
        <Card
          variant="outlined"
          padding="lg"
          className="overflow-hidden border-primary/10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">

            {/* Información */}
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary-dark">
                <MessageCircleQuestion size={26} />
              </div>

              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                ¿No encuentras la respuesta que necesitas?
              </h2>

              <p className="mt-4 leading-relaxed text-text-muted">
                Si tu consulta no está contemplada entre las opciones
                disponibles, podrás enviar una solicitud con tus datos
                y antecedentes para recibir orientación.
              </p>
            </div>

            {/* Consulta adicional */}
            <div className="rounded-xl bg-primary p-6 text-white">
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-secondary" />

                <h3 className="text-lg font-semibold">
                  Consulta adicional
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Próximamente podrás completar un formulario para
                enviar tu consulta y recibir una respuesta por correo
                electrónico.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
                <ShieldCheck size={18} className="text-secondary" />
                Atención mediante canales institucionales.
              </div>
            </div>

          </div>
        </Card>
      </Container>
    </section>
  )
}

export default HelpSection