# Diseño de Base de Datos – Migrabot

## 1. Introducción

Este documento establece el diseño conceptual de la base de datos del sistema Migrabot.

La solución utilizará PostgreSQL mediante Supabase como plataforma de backend.

El modelo de datos estará diseñado para soportar:

- Gestión de funcionarios y permisos.
- Administración de categorías.
- Creación y edición de flujos conversacionales.
- Versionamiento y publicación de flujos.
- Almacenamiento de fuentes oficiales.
- Registro de conversaciones públicas.
- Gestión de solicitudes de atención.
- Envío y seguimiento de correos electrónicos.
- Auditoría de acciones administrativas.

El diseño prioriza la integridad de los datos, seguridad, modularidad y escalabilidad.

## 2. Arquitectura de datos

Las entidades se organizan en cinco áreas funcionales.

### A. Administración y seguridad

- admin_profiles
- admin_invitations
- audit_logs

### B. Motor de conversaciones

- categories
- flows
- flow_versions
- flow_nodes
- flow_edges

### C. Información oficial

- official_sources
- node_sources

### D. Conversaciones públicas

- conversations
- conversation_events

### E. Atención personalizada

- support_requests
- support_responses
- email_logs

Total: 15 tablas iniciales.

---

# 3. Definición de entidades

## 3.1 admin_profiles

Almacena los perfiles de los funcionarios autorizados para acceder al panel administrativo.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador del perfil |
| user_id | UUID | Referencia a Supabase Auth |
| full_name | TEXT | Nombre completo |
| role | TEXT | Rol asignado |
| active | BOOLEAN | Estado de la cuenta |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Última modificación |

Roles permitidos:

- super_admin
- editor
- support

Reglas:
- Cada usuario autenticado tendrá un único perfil.
- Los usuarios no podrán modificar su propio rol.
- La desactivación del perfil impedirá el acceso administrativo.
- La autenticación será gestionada por Supabase Auth.

## 3.2 admin_invitations

Registra las invitaciones enviadas a nuevos funcionarios.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| email | TEXT | Correo invitado |
| role | TEXT | Rol asignado |
| invited_by | UUID | Administrador que invita |
| status | TEXT | Estado de la invitación |
| expires_at | TIMESTAMPTZ | Fecha de expiración |
| accepted_at | TIMESTAMPTZ | Fecha de aceptación |
| created_at | TIMESTAMPTZ | Fecha de creación |

Estados:
- pending
- accepted
- expired
- revoked

Reglas:
- No existirán invitaciones pendientes duplicadas para un mismo correo.
- Solo administradores autorizados podrán generar invitaciones.
- Las invitaciones deberán tener fecha de expiración.
- Los tokens de invitación no se almacenarán en texto plano.

## 3.3 audit_logs

Registra las acciones administrativas relevantes.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| admin_id | UUID | Funcionario responsable |
| action | TEXT | Acción realizada |
| entity_type | TEXT | Tipo de entidad |
| entity_id | UUID | Identificador afectado |
| details | JSONB | Información complementaria |
| created_at | TIMESTAMPTZ | Fecha del evento |

Ejemplos:
- Invitación de funcionarios.
- Modificación de permisos.
- Creación de categorías.
- Modificación de flujos.
- Publicación de versiones.
- Asignación de solicitudes.
- Envío de respuestas.

Los registros de auditoría no podrán ser modificados por usuarios administrativos comunes.

## 3.4 categories

Almacena las categorías principales de orientación migratoria.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| name | TEXT | Nombre |
| description | TEXT | Descripción |
| icon | TEXT | Identificador del icono |
| order_index | INTEGER | Orden de visualización |
| active | BOOLEAN | Disponibilidad |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Última modificación |

Ejemplos:
- Ingreso y salida de Chile.
- Documentos de identidad y viaje.
- Viajes con menores.
- Personas extranjeras.
- Tarjetas migratorias y registros.
- Control fronterizo.
- Situaciones especiales.
- Medidas y restricciones.
- Otras consultas.

## 3.5 flows

Representa los árboles de conversación asociados a las categorías.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| category_id | UUID | Categoría asociada |
| name | TEXT | Nombre del flujo |
| description | TEXT | Descripción |
| status | TEXT | Estado |
| published_version_id | UUID | Versión publicada |
| created_by | UUID | Creador |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Última modificación |

Estados previstos:
- draft
- published
- archived

Reglas:
- Un flujo pertenece a una categoría.
- Una categoría puede contener varios flujos.
- La versión pública será identificada mediante published_version_id.
- Los flujos no publicados no estarán disponibles para los usuarios públicos.

## 3.6 flow_versions

Almacena las diferentes versiones de cada flujo.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| flow_id | UUID | Flujo asociado |
| version_number | INTEGER | Número de versión |
| status | TEXT | Estado |
| created_by | UUID | Creador |
| published_by | UUID | Responsable de publicación |
| published_at | TIMESTAMPTZ | Fecha de publicación |
| created_at | TIMESTAMPTZ | Fecha de creación |

Estados:
- draft
- published
- archived

Reglas:
- Cada flujo podrá tener múltiples versiones.
- No se permitirá modificar una versión publicada.
- Solo el superadministrador podrá publicar.
- La publicación generará una nueva versión.
- Se conservarán las versiones anteriores.
- Una publicación deberá ejecutarse mediante una operación transaccional.

## 3.7 flow_nodes

Representa los elementos que componen visualmente los árboles de conversación.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| version_id | UUID | Versión asociada |
| node_type | TEXT | Tipo de nodo |
| title | TEXT | Título |
| content | JSONB | Contenido del nodo |
| config | JSONB | Configuración |
| position_x | NUMERIC | Posición horizontal |
| position_y | NUMERIC | Posición vertical |
| created_at | TIMESTAMPTZ | Fecha de creación |

Tipos de nodos iniciales:
- start
- question
- answer
- condition
- derivation
- end

El contenido y configuración podrán almacenarse mediante JSONB para permitir diferentes estructuras según el tipo de nodo.

## 3.8 flow_edges

Representa las conexiones entre los nodos.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| version_id | UUID | Versión asociada |
| source_node_id | UUID | Nodo de origen |
| target_node_id | UUID | Nodo de destino |
| label | TEXT | Texto de la conexión |
| condition | JSONB | Condición opcional |
| created_at | TIMESTAMPTZ | Fecha de creación |

Reglas:
- Ambos nodos deberán pertenecer a la misma versión.
- No se permitirán referencias a nodos inexistentes.
- Las conexiones deberán validarse antes de publicar.
- No se permitirán ciclos que generen recorridos infinitos.
- Las condiciones deberán utilizar operadores permitidos.

## 3.9 official_sources

Almacena las fuentes oficiales que respaldan las orientaciones.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| title | TEXT | Título de la fuente |
| source_type | TEXT | Tipo de fuente |
| institution | TEXT | Institución emisora |
| url | TEXT | Enlace oficial |
| legal_reference | TEXT | Referencia normativa |
| reviewed_at | TIMESTAMPTZ | Última revisión |
| next_review_at | TIMESTAMPTZ | Próxima revisión |
| active | BOOLEAN | Vigencia de uso |
| created_at | TIMESTAMPTZ | Fecha de creación |

Tipos de fuentes:
- law
- regulation
- official_procedure
- official_website
- institutional_document

Las fuentes deberán ser verificables y proceder de organismos oficiales.

## 3.10 node_sources

Relaciona los nodos de orientación con sus fuentes oficiales.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| node_id | UUID | Nodo asociado |
| source_id | UUID | Fuente asociada |
| created_at | TIMESTAMPTZ | Fecha de creación |

Reglas:
- Un nodo podrá tener varias fuentes.
- Una fuente podrá respaldar distintos nodos.
- Las respuestas que entreguen orientación deberán tener fuentes asociadas.
- Las fuentes deberán estar activas y revisadas antes de publicar.

## 3.11 conversations

Registra las sesiones de interacción del chatbot público.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| session_token_hash | TEXT | Identificador de sesión protegido |
| flow_version_id | UUID | Versión utilizada |
| status | TEXT | Estado de conversación |
| started_at | TIMESTAMPTZ | Inicio |
| finished_at | TIMESTAMPTZ | Finalización |

Reglas:
- El acceso público será anónimo.
- No será necesario crear una cuenta.
- Se utilizará un identificador aleatorio de sesión.
- No se almacenará información personal innecesaria.
- Se conservará la versión exacta del flujo utilizado.

## 3.12 conversation_events

Registra las interacciones relevantes realizadas durante una conversación.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| conversation_id | UUID | Conversación asociada |
| node_id | UUID | Nodo relacionado |
| event_type | TEXT | Tipo de evento |
| selected_option | TEXT | Alternativa seleccionada |
| event_data | JSONB | Información complementaria |
| created_at | TIMESTAMPTZ | Fecha del evento |

Ejemplos:
- Inicio de conversación.
- Selección de categoría.
- Selección de alternativa.
- Visualización de respuesta.
- Solicitud de atención.
- Finalización del flujo.

## 3.13 support_requests

Registra las consultas que requieren atención de un funcionario.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| conversation_id | UUID | Conversación relacionada |
| ticket_number | TEXT | Número de solicitud |
| name | TEXT | Nombre del solicitante |
| email | TEXT | Correo de contacto |
| subject | TEXT | Asunto |
| description | TEXT | Descripción |
| status | TEXT | Estado |
| priority | TEXT | Prioridad |
| assigned_to | UUID | Funcionario responsable |
| created_at | TIMESTAMPTZ | Fecha de creación |
| answered_at | TIMESTAMPTZ | Fecha de respuesta |
| closed_at | TIMESTAMPTZ | Fecha de cierre |

Estados:
- pending
- in_review
- answered
- closed

Reglas:
- Cada solicitud tendrá un funcionario responsable.
- La asignación será realizada por un administrador autorizado.
- Los funcionarios de soporte accederán a sus solicitudes asignadas.
- Se conservará la relación con la conversación original.
- Los datos personales estarán protegidos.

## 3.14 support_responses

Almacena las respuestas elaboradas por los funcionarios.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| request_id | UUID | Solicitud relacionada |
| admin_id | UUID | Funcionario responsable |
| response_content | TEXT | Contenido de la respuesta |
| email_status | TEXT | Estado del envío |
| sent_at | TIMESTAMPTZ | Fecha de envío |
| created_at | TIMESTAMPTZ | Fecha de creación |

Reglas:
- Una solicitud podrá tener múltiples respuestas.
- Las respuestas conservarán el funcionario que las elaboró.
- El contenido enviado no podrá modificarse silenciosamente.
- Se mantendrá un historial de atención.

## 3.15 email_logs

Registra los intentos de envío de correos electrónicos.

| Campo | Tipo conceptual | Descripción |
|---|---|---|
| id | UUID | Identificador |
| request_id | UUID | Solicitud relacionada |
| response_id | UUID | Respuesta relacionada |
| recipient | TEXT | Destinatario |
| email_type | TEXT | Tipo de correo |
| provider_message_id | TEXT | Identificador del proveedor |
| status | TEXT | Estado del envío |
| attempt_count | INTEGER | Cantidad de intentos |
| sent_at | TIMESTAMPTZ | Fecha de envío |
| created_at | TIMESTAMPTZ | Fecha de creación |

Estados previstos:
- pending
- sent
- failed

Se implementará un mecanismo de reintento para los envíos fallidos.

---

# 4. Relaciones entre entidades

- Un perfil de funcionario puede realizar múltiples acciones administrativas.
- Un administrador puede generar múltiples invitaciones.
- Una categoría puede contener múltiples flujos.
- Un flujo puede tener múltiples versiones.
- Una versión contiene múltiples nodos.
- Una versión contiene múltiples conexiones.
- Un nodo puede estar asociado a múltiples fuentes oficiales.
- Una fuente oficial puede respaldar múltiples nodos.
- Una conversación contiene múltiples eventos.
- Una conversación puede generar solicitudes de atención.
- Una solicitud tiene un funcionario responsable.
- Una solicitud puede contener múltiples respuestas.
- Una solicitud puede generar múltiples registros de correo.

# 5. Reglas de integridad

Se implementarán las siguientes restricciones:

- Identificadores UUID como claves primarias.
- Claves foráneas para mantener relaciones.
- Unicidad del perfil asociado a cada usuario.
- Unicidad de versiones dentro de cada flujo.
- Unicidad del número de solicitud.
- Unicidad de invitaciones pendientes por correo.
- Validación de estados permitidos.
- Validación de tipos de nodos.
- Validación de conexiones entre nodos de una misma versión.
- Protección de versiones publicadas.
- Restricción de eliminación de entidades con dependencias relevantes.

Se utilizarán índices para optimizar consultas frecuentes.

# 6. Seguridad y permisos

Se utilizará Row Level Security (RLS).

### Acceso público

- Consultar categorías activas.
- Consultar flujos publicados.
- Registrar conversaciones mediante operaciones controladas.
- Solicitar atención mediante operaciones controladas.

No podrá:
- Consultar borradores.
- Leer conversaciones ajenas.
- Consultar solicitudes de atención.
- Leer respuestas internas.
- Acceder a perfiles administrativos.

### Superadministrador

- Administración completa.
- Invitación de funcionarios.
- Gestión de roles.
- Publicación de flujos.
- Administración de categorías.
- Consulta de solicitudes.
- Asignación de responsables.
- Consulta de auditoría.

### Editor

- Crear y modificar flujos.
- Administrar categorías según permisos.
- Guardar borradores.
- Consultar fuentes oficiales.
- No podrá publicar.

### Soporte

- Consultar solicitudes asignadas.
- Revisar antecedentes.
- Elaborar respuestas.
- Enviar correos.
- Consultar el historial de atención asignado.

La autorización deberá verificarse en el backend y mediante políticas RLS. La interfaz no será considerada un mecanismo de seguridad.

# 7. Versionamiento y publicación

Los flujos tendrán versiones independientes.

Proceso de publicación:

1. El editor modifica un borrador.
2. Se validan los nodos y conexiones.
3. Se comprueba la existencia de las fuentes requeridas.
4. El superadministrador revisa el flujo.
5. El superadministrador autoriza su publicación.
6. Se crea una nueva versión inmutable.
7. Se actualiza la referencia de versión publicada.
8. El chatbot utiliza la nueva versión.

La operación deberá ejecutarse de manera transaccional.

# 8. Privacidad y conservación de datos

Se aplicarán los principios de:

- Minimización de datos.
- Acceso restringido.
- Protección de información personal.
- Retención limitada.
- Trazabilidad de acciones.
- Eliminación o anonimización cuando corresponda.

Se establecerán plazos de conservación y procedimientos de eliminación de acuerdo con las políticas institucionales y normativa aplicable.

# 9. Migraciones SQL

La estructura física se implementará mediante migraciones SQL versionadas en:

supabase/migrations/

Cada modificación de la base de datos deberá quedar registrada mediante una migración.

No se realizarán cambios estructurales directamente en producción sin su correspondiente registro.

# 10. Estado del diseño

Este documento representa el modelo conceptual inicial de Migrabot.

Pendiente de definición técnica:

- Tipos de datos PostgreSQL definitivos.
- Restricciones SQL.
- Claves foráneas.
- Índices.
- Políticas RLS.
- Funciones SQL.
- Triggers.
- Operaciones transaccionales.
- Estrategia de publicación.
- Validación de seguridad.
- Políticas de retención.

La implementación deberá realizarse después de validar el modelo físico y los permisos.