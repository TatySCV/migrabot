import {
  Plane,
  FileText,
  UserRound,
  ClipboardList,
} from 'lucide-react'

import ServiceCard from './ServiceCard'

const services = [
  {
    id: 1,
    icon: FileText,
    title: 'Documentación migratoria',
    description:
      'Conoce información sobre documentos migratorios y procedimientos relacionados con la PDI.',
  },
  {
    id: 2,
    icon: Plane,
    title: 'Viajes y salidas del país',
    description:
      'Infórmate sobre requisitos y procedimientos de control migratorio para viajar.',
  },
  {
    id: 3,
    icon: UserRound,
    title: 'Viajes con menores de edad',
    description:
      'Consulta información sobre los procedimientos migratorios cuando viajas con niños, niñas y adolescentes.',
  },
  {
    id: 4,
    icon: ClipboardList,
    title: 'Consultas sobre trámites',
    description:
      'Encuentra orientación sobre trámites y actuaciones que corresponden a la PDI.',
  },
]

function ServiceSection() {
  const handleServiceClick = (service) => {
    // Próximamente conectaremos cada tarjeta con su flujo de orientación.
    console.log('Servicio seleccionado:', service.title)
  }

  return (
<section id="servicios" className="bg-white py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mb-10 max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary-dark">
          ¿Qué necesitas?
        </span>

        <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
          Encuentra la orientación que buscas
        </h2>

        <p className="mt-4 leading-relaxed text-text-muted">
          Selecciona el tema de tu consulta y sigue las alternativas
          disponibles para encontrar información sobre tu procedimiento.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            onClick={() => handleServiceClick(service)}
          />
        ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection