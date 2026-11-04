# Requerimientos Funcionales – Migrabot

## 1. Objetivo

Definir las funcionalidades que deberá implementar Migrabot y establecer los comportamientos esperados para cada módulo.

## 2. Usuarios del sistema

### RF-001: Acceso público
El sistema deberá permitir que cualquier persona acceda al chatbot sin necesidad de crear una cuenta.

### RF-002: Acceso administrativo
El sistema deberá permitir el acceso al panel administrativo únicamente a funcionarios autorizados.

### RF-003: Roles
El sistema deberá permitir diferentes niveles de permisos para los funcionarios.

## 3. Chatbot público

### RF-004: Menú principal
El chatbot deberá presentar categorías de consultas mediante opciones predeterminadas.

### RF-005: Navegación
El usuario deberá poder seleccionar alternativas para avanzar por los flujos.

### RF-006: Preguntas dinámicas
Las preguntas deberán obtenerse desde los flujos publicados almacenados en Supabase.

### RF-007: Respuestas predeterminadas
El sistema deberá mostrar las respuestas asociadas a cada selección.

### RF-008: Navegación anterior
El usuario deberá poder regresar a preguntas anteriores y al menú principal.

### RF-009: Finalización
Los flujos podrán finalizar indicando que la orientación ha concluido.

### RF-010: Derivación
El sistema deberá ofrecer atención personalizada cuando no exista una respuesta adecuada.

## 4. Gestión de categorías

### RF-011: Crear categorías
Los administradores autorizados podrán crear categorías.

### RF-012: Editar categorías
Se podrán modificar nombres, descripciones, iconos y orden.

### RF-013: Activar y desactivar
Se podrá controlar la disponibilidad de categorías.

## 5. Editor de flujos

### RF-014: Crear flujos
Los administradores podrán crear nuevos árboles de conversación.

### RF-015: Crear nodos
Se podrán incorporar preguntas, opciones, respuestas, condiciones y nodos de finalización.

### RF-016: Conectar nodos
Los nodos podrán relacionarse mediante conexiones visuales.

### RF-017: Editar nodos
Se podrán modificar sus propiedades y contenidos.

### RF-018: Guardar borradores
Los cambios podrán almacenarse sin afectar la versión pública.

### RF-019: Publicar flujos
Solo las versiones aprobadas podrán publicarse.

### RF-020: Historial de versiones
El sistema deberá conservar versiones anteriores y permitir su recuperación controlada.

### RF-021: Vista previa
El administrador podrá probar un flujo antes de publicarlo.

## 6. Conversaciones

### RF-022: Registrar conversaciones
El sistema deberá registrar las sesiones públicas según las políticas de privacidad y retención.

### RF-023: Registrar interacciones
Se deberán almacenar las selecciones y respuestas necesarias para mantener el historial.

### RF-024: Consultar historial
Los funcionarios autorizados podrán revisar conversaciones.

## 7. Solicitudes de atención

### RF-025: Crear solicitud
El usuario podrá solicitar atención personalizada mediante un formulario.

### RF-026: Datos de contacto
El formulario solicitará los datos estrictamente necesarios para responder.

### RF-027: Registrar solicitud
Las solicitudes se almacenarán en Supabase.

### RF-028: Notificación
El sistema notificará la recepción de una solicitud a los funcionarios responsables.

### RF-029: Gestión
Los funcionarios podrán revisar y gestionar las solicitudes.

### RF-030: Responder
Los funcionarios podrán redactar y enviar respuestas por correo electrónico.

### RF-031: Estados
Las solicitudes podrán clasificarse como pendientes, en revisión, respondidas o cerradas.

### RF-032: Historial
Se conservará un registro de las respuestas y acciones relevantes.

## 8. Dashboard

### RF-033: Indicadores
El panel mostrará estadísticas de conversaciones y solicitudes.

### RF-034: Consultas frecuentes
Se identificarán las categorías más utilizadas.

### RF-035: Solicitudes pendientes
Se visualizará la cantidad de solicitudes que requieren atención.

## 9. Administración

### RF-036: Gestión de funcionarios
El administrador autorizado podrá gestionar las cuentas y permisos de los funcionarios.

### RF-037: Control de permisos
Las acciones estarán restringidas según el rol asignado.

### RF-038: Auditoría
Se registrarán acciones administrativas relevantes.

## 10. Internacionalización

### RF-039: Idioma inicial
La aplicación estará disponible inicialmente en español.

### RF-040: Idiomas adicionales
La arquitectura permitirá incorporar otros idiomas.

## 11. Reglas generales

- El chatbot utilizará exclusivamente alternativas predeterminadas.
- No se incorporará un campo de texto libre en la conversación pública.
- Las solicitudes de atención sí permitirán describir la consulta mediante un formulario.
- Las respuestas deberán sustentarse en fuentes oficiales y normativa vigente.
- Los contenidos deberán contar con validación antes de publicarse.
- Las consultas ajenas a las competencias de la PDI deberán ser identificadas y derivadas.
- El chatbot no podrá determinar automáticamente la vigencia de medidas o resolver situaciones particulares que requieran revisión oficial.

## 12. Estado

Los requerimientos definidos en este documento constituyen la línea base funcional inicial y podrán ampliarse durante el análisis y desarrollo.