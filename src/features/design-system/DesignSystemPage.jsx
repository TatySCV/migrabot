
import { useState } from 'react'

import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Textarea from '../../components/ui/Textarea'
import Badge from '../../components/ui/Badge'
import Alert from '../../components/ui/Alert'
import Spinner from '../../components/ui/Spinner'
import Modal from '../../components/ui/Modal'
import Container from '../../components/ui/Container'
import Image from '../../components/ui/Image'
import Avatar from '../../components/ui/Avatar'

function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  return (
    <div className="min-h-screen bg-background py-10">
      <Container size="lg">

        <header className="mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-light">
            Migrabot
          </span>

          <h1 className="mt-2 text-3xl font-bold text-primary">
            Design System
          </h1>

          <p className="mt-2 text-text-muted">
            Biblioteca de componentes institucionales.
          </p>
        </header>

        {/* BOTONES */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            1. Buttons
          </h2>

          <Card>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Guardando</Button>
              <Button disabled>Deshabilitado</Button>
            </div>
          </Card>
        </section>

        {/* TARJETAS */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            2. Cards
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="font-bold text-primary">Default</h3>
              <p className="mt-2 text-sm text-text-muted">
                Tarjeta estándar.
              </p>
            </Card>

            <Card variant="outlined">
              <h3 className="font-bold text-primary">Outlined</h3>
              <p className="mt-2 text-sm text-text-muted">
                Tarjeta con borde institucional.
              </p>
            </Card>

            <Card variant="elevated">
              <h3 className="font-bold text-primary">Elevated</h3>
              <p className="mt-2 text-sm text-text-muted">
                Tarjeta con sombra.
              </p>
            </Card>

            <Card variant="muted">
              <h3 className="font-bold text-primary">Muted</h3>
              <p className="mt-2 text-sm text-text-muted">
                Tarjeta secundaria.
              </p>
            </Card>
          </div>
        </section>

        {/* FORMULARIOS */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            3. Form Components
          </h2>

          <Card>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Nombre completo"
                name="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <Input
                label="Correo electrónico"
                type="email"
                placeholder="usuario@correo.cl"
                helperText="Ingresa un correo válido."
              />

              <Input
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
              />

              <Input
                label="RUN"
                placeholder="12.345.678-9"
                error="Ejemplo de mensaje de error."
              />

              <Select
                label="Rol del funcionario"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                options={[
                  { value: 'editor', label: 'Editor' },
                  { value: 'support', label: 'Soporte' },
                  { value: 'super_admin', label: 'Superadministrador' },
                ]}
              />

              <Select
                label="Estado"
                placeholder="Selecciona un estado"
                options={[
                  { value: 'active', label: 'Activo' },
                  { value: 'inactive', label: 'Inactivo' },
                ]}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Descripción"
                  placeholder="Escribe una descripción..."
                  rows={4}
                  helperText="Campo de ejemplo para consultas."
                />
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={() => window.alert(`Nombre: ${name || 'Sin ingresar'} | Rol: ${role || 'Sin seleccionar'}`)}>
                Probar formulario
              </Button>
            </div>
          </Card>
        </section>

        {/* BADGES */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            4. Badges
          </h2>

          <Card>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Primario</Badge>
              <Badge variant="secondary">Secundario</Badge>
              <Badge variant="success" dot>Publicado</Badge>
              <Badge variant="warning" dot>Pendiente</Badge>
              <Badge variant="danger" dot>Rechazado</Badge>
              <Badge variant="info">En revisión</Badge>
              <Badge variant="neutral">Archivado</Badge>
            </div>
          </Card>
        </section>

        {/* ALERTAS */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            5. Alerts
          </h2>

          <div className="space-y-3">
            <Alert variant="success" title="Operación exitosa">
              Los cambios se guardaron correctamente.
            </Alert>

            <Alert variant="warning" title="Advertencia">
              Revisa los datos antes de continuar.
            </Alert>

            <Alert variant="danger" title="Error">
              No fue posible completar la operación.
            </Alert>

            <Alert variant="info" title="Información">
              Esta es una notificación informativa.
            </Alert>
          </div>
        </section>

        {/* SPINNER */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            6. Spinners
          </h2>

          <Card>
            <div className="flex flex-wrap items-center gap-8">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner showLabel label="Cargando información..." />
            </div>
          </Card>
        </section>

        {/* AVATARS */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            7. Avatars
          </h2>

          <Card>
            <div className="flex flex-wrap items-center gap-5">
              <Avatar name="María González" size="xs" />
              <Avatar name="María González" size="sm" />
              <Avatar name="María González" size="md" />
              <Avatar name="María González" size="lg" />
              <Avatar name="María González" size="xl" />
              <Avatar name="Juan Pérez" color="secondary" />
              <Avatar name="Ana López" shape="square" />
            </div>
          </Card>
        </section>

        {/* IMAGES */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            8. Images
          </h2>

          <Card>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Image aspect="square" alt="Imagen cuadrada" />
              <Image aspect="video" alt="Imagen horizontal" />
              <Image aspect="portrait" alt="Imagen vertical" />
              <Image aspect="square" rounded="full" alt="Imagen circular" />
            </div>
          </Card>
        </section>

        {/* MODAL */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            9. Modal
          </h2>

          <Card>
            <p className="mb-4 text-sm text-text-muted">
              Prueba la ventana emergente institucional.
            </p>

            <Button onClick={() => setModalOpen(true)}>
              Abrir modal de prueba
            </Button>
          </Card>

          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal de prueba"
            description="Ejemplo de ventana emergente de Migrabot."
            footer={
              <>
                <Button
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>

                <Button onClick={() => setModalOpen(false)}>
                  Aceptar
                </Button>
              </>
            }
          >
            <p className="text-sm text-text">
              Este es el contenido de nuestro modal reutilizable.
            </p>
          </Modal>
        </section>

        {/* COLORES */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-primary">
            10. Colores institucionales
          </h2>

          <Card>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ['Primary', 'bg-primary'],
                ['Primary Light', 'bg-primary-light'],
                ['Secondary', 'bg-secondary'],
                ['Background', 'bg-background border'],
                ['Success', 'bg-success'],
                ['Warning', 'bg-warning'],
                ['Danger', 'bg-danger'],
                ['Info', 'bg-info'],
              ].map(([name, color]) => (
                <div key={name}>
                  <div className={`h-16 rounded-lg ${color}`} />
                  <p className="mt-2 text-sm font-medium text-text">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

      </Container>
    </div>
  )
}

export default DesignSystemPage
