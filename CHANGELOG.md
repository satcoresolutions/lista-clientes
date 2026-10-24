# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato sigue una estructura basada en versiones y categorías de cambios.

---

## [Unreleased]

### Added

-

### Changed

-

### Fixed

-

### Removed

-

### Security

- ***

## [1.2.0] - 2026-10-23

### Added

- Incorporación del componente `ClientManager` para centralizar la gestión de clientes y separar la lógica de la página principal.
- Organización de la página principal (`app/page.tsx`) para mantener una estructura limpia, enfocada en la presentación y composición de componentes.

### Changed

- Actualización de los estilos de la interfaz para utilizar las clases y los tokens compartidos definidos en `ui.ts`.
- Unificación de los estilos de botones, campos de formulario, filtros, notificaciones y estados visuales con el sistema de diseño de SatCore Solutions.
- Actualización de la configuración SEO para identificar correctamente la aplicación como Lista de clientes.
- Revisión de las descripciones y palabras clave SEO para orientarlas a la gestión de clientes y los seguimientos comerciales.
- Mantenimiento de la identidad visual de SatCore Solutions y del color principal de marca.

### Fixed

- Corrección de la URL predeterminada del sitio en la configuración SEO, sustituyendo la cadena con formato Markdown por una URL válida.
- Corrección de referencias de estilos heredados para adaptarlas a los tokens compartidos de la interfaz.

### Removed

- Eliminación de la lógica de gestión de clientes de `app/page.tsx` tras su traslado a `ClientManager`.
- Eliminación de referencias a las clases de interfaz antiguas que fueron reemplazadas por las utilidades compartidas.

### Security

- Sin cambios de seguridad específicos en esta versión.

---

## [1.1.0] - 2026-10-20

### Added

- Lanzamiento inicial de Lista de clientes, una microaplicación CRM desarrollada por SatCore Solutions.
- Interfaz en modo oscuro con identidad visual y colores de marca de SatCore Solutions.
- Implementación de la interfaz con Next.js, React, TypeScript y Tailwind CSS v4.
- Funcionalidad para agregar, editar y eliminar clientes.
- Registro de información de clientes: nombre, empresa, teléfono, correo electrónico, estado comercial, último contacto, próximo seguimiento y notas.
- Clasificación de clientes en tres estados: Prospecto, Activo e Inactivo.
- Gestión visual de seguimientos vencidos, programados para hoy y próximos.
- Filtro para consultar seguimientos pendientes.
- Función «Contacté hoy» para registrar la fecha del último contacto y actualizar el seguimiento cuando corresponda.
- Acciones de contacto rápido mediante WhatsApp, llamadas telefónicas y correo electrónico.
- Compatibilidad con números móviles colombianos de diez dígitos para generar enlaces de WhatsApp con el prefijo internacional 57.
- Búsqueda de clientes por nombre, empresa, teléfono, correo electrónico y notas, sin distinción entre mayúsculas, minúsculas o tildes.
- Ordenamiento de clientes por fecha de seguimiento, contactos recientes y nombre.
- Exportación de registros de clientes a archivos CSV compatibles con herramientas de hojas de cálculo.
- Persistencia local de los registros mediante `localStorage`.
- Organización del código en componentes reutilizables y módulos de lógica para tipos, fechas, formato, almacenamiento, contacto y exportación.
- Documentación inicial del proyecto mediante README.md.
- Documentación de cambios mediante CHANGELOG.md.
- Incorporación de lineamientos de seguridad, privacidad, atribución y contribución conforme a la licencia del proyecto.

### Changed

-

### Fixed

-

### Removed

-

### Security

- Documentación de las limitaciones de seguridad y privacidad asociadas al almacenamiento local.
- Advertencia sobre la ausencia de autenticación, backend y base de datos remota.
- Recomendación de exportar copias de respaldo y evitar almacenar información confidencial en el navegador.

---
