
import {
  ShieldCheck,
  MessageCircle,
  BookOpen,
} from 'lucide-react'

import Container from '../../../components/ui/Container'

const features = [
  {
    icon: MessageCircle,
    title: 'Orientación guiada',
    description:
      'Accede a información mediante alternativas claras y sencillas, según el tipo de consulta que necesitas realizar.',
  },
  {
    icon: BookOpen,
    title: 'Información oficial',
    description:
      'Consulta orientación basada en fuentes institucionales y normativa migratoria vigente.',
  },
  {
    icon: ShieldCheck,
    title: 'Servicio informativo',
    description:
      'Obtén información sobre procedimientos relacionados con las competencias de la Policía de Investigaciones de Chile.',
  },
]

function AboutSection() {
  return (
    <section
      id="que-es-migrabot"
      className="bg-white py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary-dark">
            Conoce Migrabot
          </span>

          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
            ¿Qué es Migrabot?
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
            Migrabot es una plataforma de orientación migratoria
            que facilita el acceso a información sobre trámites
            y procedimientos relacionados con la Policía de
            Investigaciones de Chile.
          </p>

          <p className="mt-4 leading-relaxed text-text-muted">
            A través de un sistema de consultas guiadas, podrás
            identificar el tema de tu interés y encontrar
            información correspondiente a tu situación.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-primary">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default AboutSection
