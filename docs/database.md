# Diseño de Base de Datos – Migrabot

## 1. Objetivo

Definir el modelo conceptual de datos de Migrabot, sus principales entidades, relaciones y responsabilidades.

La base de datos utilizará PostgreSQL mediante Supabase.

Este documento representa un diseño preliminar. La estructura física, los tipos de datos, las restricciones y las políticas de seguridad se definirán y validarán antes de crear las migraciones SQL.

## 2. Entidades principales

### 2.1 admin_profiles

Almacena los perfiles de los funcionarios autorizados.

Campos conceptuales:
- id
- user_id
- full_name
- role
- active
- created_at
- updated_at

La autenticación se gestionará mediante Supabase Auth.

Roles previstos:
- super_admin
- editor
- support

### 2.2 categories

Almacena las categorías de orientación.

Campos conceptuales:
- id
- name
- description
- icon
- active
- order_index
- created_at
- updated_at

### 2.3 flows

Representa los árboles de conversación.

Campos conceptuales:
- id
- category_id
- name
- description
- status
- version
- created_at
- updated_at

Estados previstos:
- draft
- published
- archived

### 2.4 flow_nodes

Almacena los nodos que componen cada flujo.

Campos conceptuales:
- id
- flow_id
- node_type
- title
- content
- position_x
- position_y
- config
- created_at
- updated_at

Los nodos podrán representar:
- Inicio.
- Pregunta.
- Opciones.
- Respuesta.
- Condición.
- Derivación.
- Finalización.

La configuración adicional podrá almacenarse mediante JSONB.

### 2.5 flow_edges

Representa las conexiones entre nodos.

Campos conceptuales:
- id
- flow_id
- source_node_id
- target_node_id
- label
- condition
- created_at

### 2.6 flow_versions

Almacena versiones publicadas de los flujos.

Campos conceptuales:
- id
- flow_id
- version_number
- snapshot
- published_by
- published_at

Permitirá recuperar versiones anteriores.

### 2.7 conversations

Registra las sesiones de conversación pública.

Campos conceptuales:
- id
- session_token
- started_at
- finished_at
- status

No deberá almacenar información personal innecesaria.

### 2.8 conversation_messages

Registra las interacciones relevantes de cada conversación.

Campos conceptuales:
- id
- conversation_id
- node_id
- message_type
- content
- created_at

### 2.9 support_requests

Almacena las solicitudes de atención personalizada.

Campos conceptuales:
- id
- conversation_id
- ticket_number
- name
- email
- subject
- description
- status
- assigned_to
- created_at
- answered_at
- closed_at

Estados previstos:
- pending
- in_review
- answered
- closed

### 2.10 support_responses

Almacena las respuestas enviadas por los funcionarios.

Campos conceptuales:
- id
- request_id
- admin_id
- response_content
- email_status
- sent_at
- created_at

## 3. Relaciones conceptuales

- Una categoría puede contener varios flujos.
- Un flujo pertenece a una categoría.
- Un flujo contiene múltiples nodos.
- Un flujo contiene múltiples conexiones.
- Un flujo puede tener múltiples versiones.
- Una conversación contiene múltiples interacciones.
- Una conversación puede generar solicitudes de atención.
- Una solicitud puede tener múltiples respuestas.
- Un funcionario puede gestionar múltiples solicitudes.

## 4. Seguridad

Se implementarán políticas Row Level Security (RLS).

Principios:
- Los usuarios públicos no podrán consultar datos privados.
- Los flujos publicados podrán consultarse públicamente mediante permisos específicos.
- Los borradores serán accesibles únicamente a administradores autorizados.
- Las solicitudes y respuestas estarán protegidas.
- Los funcionarios accederán según sus roles.
- Las operaciones privilegiadas se ejecutarán desde el backend.
- La clave service_role nunca se expondrá en el frontend.

## 5. Integridad y consistencia

Se deberán implementar:
- Claves primarias.
- Claves foráneas.
- Restricciones de integridad.
- Índices para consultas frecuentes.
- Validación de relaciones entre nodos.
- Control de versiones.
- Restricciones para impedir conexiones inválidas.

## 6. Privacidad y retención

Se establecerán políticas para:
- Minimizar la información personal almacenada.
- Limitar el acceso a los antecedentes.
- Definir plazos de conservación.
- Gestionar la eliminación de información cuando corresponda.
- Registrar accesos y acciones administrativas relevantes.

## 7. Migraciones

La estructura física de la base de datos se implementará mediante migraciones SQL versionadas en:

supabase/migrations/

No se realizarán modificaciones estructurales directamente en producción sin registrarlas mediante una migración.

## 8. Estado del diseño

Modelo conceptual inicial.

Pendiente:
- Diagrama entidad-relación definitivo.
- Definición de tipos de datos.
- Restricciones.
- Índices.
- Políticas RLS.
- Funciones y triggers.
- Estrategia de publicación de flujos.
- Validación de seguridad.