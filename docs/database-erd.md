# Diagrama Entidad-Relación – Migrabot

## 1. Introducción

Este documento representa las relaciones entre las entidades principales de la base de datos de Migrabot.

El modelo está diseñado para PostgreSQL mediante Supabase.

Su objetivo es proporcionar una representación visual de las relaciones entre administración, flujos de conversación, fuentes oficiales, conversaciones públicas y solicitudes de atención.

## 2. Diagrama general

```mermaid
erDiagram

    ADMIN_PROFILES ||--o{ ADMIN_INVITATIONS : creates
    ADMIN_PROFILES ||--o{ AUDIT_LOGS : generates
    ADMIN_PROFILES ||--o{ FLOW_VERSIONS : creates
    ADMIN_PROFILES ||--o{ FLOW_VERSIONS : publishes
    ADMIN_PROFILES ||--o{ SUPPORT_REQUESTS : assigned
    ADMIN_PROFILES ||--o{ SUPPORT_RESPONSES : writes

    CATEGORIES ||--o{ FLOWS : contains
    FLOWS ||--o{ FLOW_VERSIONS : has
    FLOW_VERSIONS ||--o{ FLOW_NODES : contains
    FLOW_VERSIONS ||--o{ FLOW_EDGES : contains

    FLOW_NODES ||--o{ NODE_SOURCES : references
    OFFICIAL_SOURCES ||--o{ NODE_SOURCES : supports

    FLOW_VERSIONS ||--o{ CONVERSATIONS : used_by
    CONVERSATIONS ||--o{ CONVERSATION_EVENTS : contains
    CONVERSATIONS ||--o{ SUPPORT_REQUESTS : generates

    SUPPORT_REQUESTS ||--o{ SUPPORT_RESPONSES : receives
    SUPPORT_REQUESTS ||--o{ EMAIL_LOGS : generates
    SUPPORT_RESPONSES ||--o{ EMAIL_LOGS : generates
```

## 3. Diagrama del motor de conversaciones

```mermaid
erDiagram

    CATEGORIES {
        uuid id PK
        string name
        string description
        string icon
        integer order_index
        boolean active
    }

    FLOWS {
        uuid id PK
        uuid category_id FK
        string name
        string description
        string status
        uuid published_version_id FK
    }

    FLOW_VERSIONS {
        uuid id PK
        uuid flow_id FK
        integer version_number
        string status
        uuid created_by FK
        uuid published_by FK
        timestamp published_at
    }

    FLOW_NODES {
        uuid id PK
        uuid version_id FK
        string node_type
        string title
        jsonb content
        jsonb config
        numeric position_x
        numeric position_y
    }

    FLOW_EDGES {
        uuid id PK
        uuid version_id FK
        uuid source_node_id FK
        uuid target_node_id FK
        string label
        jsonb condition
    }

    CATEGORIES ||--o{ FLOWS : contains
    FLOWS ||--o{ FLOW_VERSIONS : has
    FLOW_VERSIONS ||--o{ FLOW_NODES : contains
    FLOW_VERSIONS ||--o{ FLOW_EDGES : connects
    FLOW_NODES ||--o{ FLOW_EDGES : source_or_target
```

## 4. Diagrama de fuentes oficiales

```mermaid
erDiagram

    FLOW_NODES {
        uuid id PK
        uuid version_id FK
        string node_type
        string title
        jsonb content
    }

    OFFICIAL_SOURCES {
        uuid id PK
        string title
        string source_type
        string institution
        string url
        string legal_reference
        timestamp reviewed_at
        timestamp next_review_at
        boolean active
    }

    NODE_SOURCES {
        uuid id PK
        uuid node_id FK
        uuid source_id FK
    }

    FLOW_NODES ||--o{ NODE_SOURCES : references
    OFFICIAL_SOURCES ||--o{ NODE_SOURCES : supports
```

## 5. Diagrama de administración

```mermaid
erDiagram

    ADMIN_PROFILES {
        uuid id PK
        uuid user_id FK
        string full_name
        string role
        boolean active
    }

    ADMIN_INVITATIONS {
        uuid id PK
        string email
        string role
        uuid invited_by FK
        string status
        timestamp expires_at
        timestamp accepted_at
    }

    AUDIT_LOGS {
        uuid id PK
        uuid admin_id FK
        string action
        string entity_type
        uuid entity_id
        jsonb details
        timestamp created_at
    }

    ADMIN_PROFILES ||--o{ ADMIN_INVITATIONS : creates
    ADMIN_PROFILES ||--o{ AUDIT_LOGS : generates
```

## 6. Diagrama de conversaciones y atención

```mermaid
erDiagram

    CONVERSATIONS {
        uuid id PK
        string session_token_hash
        uuid flow_version_id FK
        string status
        timestamp started_at
        timestamp finished_at
    }

    CONVERSATION_EVENTS {
        uuid id PK
        uuid conversation_id FK
        uuid node_id FK
        string event_type
        string selected_option
        jsonb event_data
        timestamp created_at
    }

    SUPPORT_REQUESTS {
        uuid id PK
        uuid conversation_id FK
        string ticket_number
        string name
        string email
        string subject
        string description
        string status
        uuid assigned_to FK
        timestamp created_at
    }

    SUPPORT_RESPONSES {
        uuid id PK
        uuid request_id FK
        uuid admin_id FK
        string response_content
        string email_status
        timestamp sent_at
    }

    EMAIL_LOGS {
        uuid id PK
        uuid request_id FK
        uuid response_id FK
        string recipient
        string email_type
        string provider_message_id
        string status
        integer attempt_count
        timestamp sent_at
    }

    CONVERSATIONS ||--o{ CONVERSATION_EVENTS : records
    CONVERSATIONS ||--o{ SUPPORT_REQUESTS : generates
    SUPPORT_REQUESTS ||--o{ SUPPORT_RESPONSES : receives
    SUPPORT_REQUESTS ||--o{ EMAIL_LOGS : generates
    SUPPORT_RESPONSES ||--o{ EMAIL_LOGS : generates
```

## 7. Reglas de relaciones

### Administración

- Un funcionario puede crear múltiples invitaciones.
- Un funcionario puede generar múltiples registros de auditoría.
- Un funcionario puede crear o publicar múltiples versiones de flujos.
- Un funcionario puede tener asignadas múltiples solicitudes.
- Un funcionario puede redactar múltiples respuestas.

### Motor de conversaciones

- Una categoría puede contener varios flujos.
- Un flujo puede tener varias versiones.
- Una versión contiene múltiples nodos.
- Una versión contiene múltiples conexiones.
- Cada conexión relaciona un nodo de origen con un nodo de destino de la misma versión.

### Fuentes oficiales

- Un nodo puede tener múltiples fuentes.
- Una fuente puede respaldar múltiples nodos.

### Conversaciones

- Una conversación puede contener múltiples eventos.
- Una conversación puede generar una solicitud de atención.
- Una conversación estará asociada a la versión exacta del flujo utilizado.

### Atención personalizada

- Una solicitud tendrá un funcionario responsable.
- Una solicitud puede tener múltiples respuestas.
- Una solicitud puede generar múltiples registros de correo.
- Cada respuesta estará asociada al funcionario que la elaboró.

## 8. Consideraciones técnicas

- Todas las relaciones deberán utilizar claves foráneas.
- Se utilizarán identificadores UUID.
- Las relaciones deberán tener reglas de eliminación controladas.
- Las versiones publicadas serán inmutables.
- Los nodos y conexiones pertenecerán a una versión específica.
- Las políticas RLS deberán respetar las relaciones entre funcionarios y solicitudes.
- Las operaciones públicas deberán ejecutarse mediante funciones controladas.
- Se deberán evitar ciclos inválidos en los flujos.
- Se implementarán índices en las columnas utilizadas frecuentemente.

## 9. Estado del modelo

Modelo entidad-relación conceptual inicial.

Pendiente:

- Validación del modelo físico.
- Definición de cardinalidades y restricciones definitivas.
- Tipos de datos PostgreSQL.
- Claves foráneas.
- Índices.
- Políticas RLS.
- Migraciones SQL.
- Pruebas de integridad.