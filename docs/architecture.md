# Arquitectura del Software – Migrabot

## 1. Introducción

Este documento establece los lineamientos arquitectónicos del sistema Migrabot.

La aplicación utilizará una arquitectura modular, con separación de responsabilidades entre frontend, backend, servicios, componentes y funcionalidades.

El objetivo es facilitar el mantenimiento, la escalabilidad y la incorporación de nuevas funcionalidades.

## 2. Arquitectura general

La solución estará compuesta por las siguientes capas:

### Frontend
Responsable de la interfaz de usuario y la interacción con el sistema.

Tecnologías:
- React.
- JavaScript.
- Vite.
- Tailwind CSS.
- React Router.

### Backend y base de datos
Responsable del almacenamiento, autenticación, autorización y procesamiento de operaciones.

Tecnologías:
- Supabase.
- PostgreSQL.
- Supabase Auth.
- Supabase Edge Functions.

### Servicios externos
Responsables de las integraciones complementarias.

- Resend: envío de correos electrónicos.

## 3. Separación de aplicaciones

El sistema tendrá dos áreas principales:

### Aplicación pública

Ruta principal: `/`

Funcionalidades:
- Acceso sin autenticación.
- Navegación por categorías.
- Ejecución de flujos de conversación.
- Visualización de respuestas.
- Registro de conversaciones.
- Solicitud de atención personalizada.

### Panel administrativo

Ruta principal: `/admin`

Funcionalidades:
- Inicio de sesión.
- Dashboard.
- Administración de categorías.
- Editor visual de flujos.
- Gestión de solicitudes.
- Historial de conversaciones.
- Administración de funcionarios y permisos.

El acceso al panel estará restringido a usuarios autorizados.

## 4. Arquitectura modular

La aplicación se organizará mediante módulos funcionales.

### app
Configuración general de la aplicación, proveedores y rutas.

### components
Componentes visuales reutilizables.

### features

Contendrá las funcionalidades principales:

- chatbot: interacción pública.
- flows: creación y administración de flujos.
- categories: gestión de categorías.
- support: atención de solicitudes.
- conversations: historial de conversaciones.
- dashboard: indicadores y estadísticas.

### modules

Contendrá integraciones y servicios compartidos:

- auth: autenticación y autorización.
- supabase: conexión con la base de datos.
- email: integración relacionada con notificaciones.

### hooks
Hooks personalizados reutilizables.

### context
Estados globales compartidos.

### constants
Constantes y configuraciones estáticas.

### utils
Funciones auxiliares.

### locales
Recursos de traducción e internacionalización.

### styles
Estilos globales y variables visuales.

## 5. Backend

Supabase será responsable de:

- Almacenamiento de información.
- Administración de usuarios.
- Autenticación de funcionarios.
- Persistencia de conversaciones.
- Almacenamiento de solicitudes.
- Control de permisos mediante RLS.

Las Edge Functions permitirán ejecutar operaciones sensibles, como el envío de correos y determinadas operaciones administrativas.

## 6. Editor visual de flujos

Se utilizará React Flow (@xyflow/react).

Permitirá:
- Crear nodos.
- Configurar preguntas.
- Configurar respuestas.
- Crear alternativas.
- Conectar nodos.
- Establecer condiciones.
- Visualizar el árbol de conversación.
- Guardar borradores.
- Publicar versiones.

Los flujos publicados serán independientes de los borradores.

## 7. Principios arquitectónicos

- Separación de responsabilidades.
- Modularidad.
- Reutilización de componentes.
- Bajo acoplamiento.
- Alta cohesión.
- Seguridad por diseño.
- Escalabilidad.
- Mantenibilidad.
- Documentación continua.

## 8. Reglas de desarrollo

- Los componentes visuales no contendrán consultas directas complejas a la base de datos.
- Las operaciones de acceso a datos se centralizarán en servicios.
- La lógica reutilizable se implementará mediante hooks y utilidades.
- Las validaciones estarán separadas de la presentación.
- Las operaciones privilegiadas se ejecutarán en el backend.
- Los módulos deberán mantener responsabilidades independientes.

## 9. Seguridad

Se implementarán:
- Row Level Security.
- Control de acceso basado en roles.
- Validación de sesiones.
- Protección de variables de entorno.
- Validación de entradas.
- Protección contra solicitudes automatizadas abusivas.
- Auditoría de acciones administrativas relevantes.

## 10. Internacionalización

El sistema comenzará en español.

La arquitectura deberá permitir incorporar otros idiomas sin modificar la lógica principal de los módulos.

Se utilizará i18next para gestionar traducciones.

## 11. Escalabilidad

La arquitectura deberá permitir incorporar nuevas categorías, flujos, tipos de nodos, idiomas y funcionalidades sin requerir modificaciones estructurales importantes.

Las decisiones definitivas de implementación se documentarán durante las etapas de diseño técnico.