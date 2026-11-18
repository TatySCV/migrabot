
export const flows = [
  {
    id: 'documentacion-migratoria',
    title: 'Documentación migratoria',
    description: 'Orientación sobre documentos y trámites migratorios.',
    initialMessage:
      '¿Sobre qué documento o situación necesitas orientación?',

    nodes: {
      start: {
        id: 'start',
        type: 'question',
        message:
          'Selecciona el tema sobre el que necesitas información.',
        options: [
          {
            id: 'cedula',
            label: 'Cédula de identidad para extranjeros',
            nextNode: 'cedula',
          },
          {
            id: 'tarjeta-migratoria',
            label: 'Tarjeta migratoria',
            nextNode: 'tarjeta-migratoria',
          },
          {
            id: 'pasaporte',
            label: 'Pasaporte y documentos de viaje',
            nextNode: 'pasaporte',
          },
        ],
      },

      cedula: {
        id: 'cedula',
        type: 'answer',
        message:
          'Aquí se incorporará información oficial sobre la cédula de identidad para extranjeros y los procedimientos relacionados con la PDI.',
        sources: [],
      },

      'tarjeta-migratoria': {
        id: 'tarjeta-migratoria',
        type: 'answer',
        message:
          'Aquí se incorporará información oficial sobre la tarjeta migratoria, incluyendo los procedimientos correspondientes ante la PDI.',
        sources: [],
      },

      pasaporte: {
        id: 'pasaporte',
        type: 'answer',
        message:
          'Aquí se incorporará información oficial sobre pasaportes y documentos de viaje, dentro de las competencias de la PDI.',
        sources: [],
      },
    },
  },
]
