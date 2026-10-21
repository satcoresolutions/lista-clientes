 <div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="220" />

# Lista de clientes

**CRM ligero para la gestión y el seguimiento de clientes.**

Organiza contactos, administra estados, programa seguimientos y comunícate rápidamente con tus clientes desde una interfaz sencilla, moderna y adaptable.

---

### SOFTWARE AND TECHNOLOGY CORE SOLUTIONS

**SATCORE SOLUTIONS**

_Soluciones digitales seguras, accesibles y funcionales para todos._

[![License](https://img.shields.io/badge/License-SCSAL%201.0-000000.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)

</div>

---

# Sobre el proyecto

**Lista de clientes** es una microaplicación de gestión de relaciones con clientes (CRM), desarrollada originalmente por **SatCore Solutions**, dentro del ecosistema de soluciones tecnológicas de **SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**.

Su propósito es ofrecer a profesionales independientes, emprendedores y pequeños negocios una herramienta práctica para organizar sus contactos comerciales, registrar interacciones y mantener un control sencillo de los seguimientos pendientes, sin depender de una plataforma empresarial compleja.

El proyecto ha sido desarrollado con el propósito de:

> Facilitar la administración de clientes y oportunidades comerciales mediante una herramienta accesible, ligera y funcional, que centralice la información básica de contacto y ayude a mantener una comunicación oportuna.

Esta aplicación funciona directamente en el navegador y almacena la información localmente, sin requerir un servidor propio ni una base de datos.

Este repositorio forma parte de los proyectos tecnológicos propios de **SatCore Solutions** y puede ser utilizado, estudiado, modificado y redistribuido de acuerdo con los términos establecidos en la **SatCore Solutions Attribution License — SCSAL 1.0**.

---

# SatCore Solutions

### SOFTWARE AND TECHNOLOGY CORE SOLUTIONS

**Nombre comercial:** SatCore Solutions

**Eslogan:**

> Soluciones digitales seguras, accesibles y funcionales para todos.

SatCore Solutions desarrolla soluciones digitales orientadas al software, la automatización, la inteligencia artificial, la ciberseguridad, la formación tecnológica y las herramientas digitales.

El ecosistema se estructura alrededor de cinco áreas principales:

### Desarrollo

Creación de sitios web, aplicaciones, herramientas digitales, plataformas y soluciones de software.

### Automatizador

Automatización de procesos, agentes inteligentes, integración de APIs y sistemas capaces de ejecutar tareas de manera automatizada.

### Seguridad

Ciberseguridad, auditoría, análisis de vulnerabilidades, hardening, monitoreo y protección de sistemas.

### Estudio

Formación, documentación, recursos educativos, tutoriales y proyectos orientados al aprendizaje tecnológico.

### Marketing

Diseño de marca, presencia digital, contenido tecnológico, analítica y herramientas digitales para comunicación y posicionamiento.

---

# Características

- **Gestión de clientes:** agregar, consultar, editar y eliminar registros.
- **Información organizada:** nombre, empresa, teléfono, correo electrónico, estado, último contacto, próximo seguimiento y notas.
- **Estados comerciales:** clasificación de clientes como Prospecto, Activo o Inactivo.
- **Seguimiento de clientes:** identificación de seguimientos vencidos, programados para hoy o próximos.
- **Filtro de seguimientos:** consulta de contactos pendientes, incluidos los vencidos y los programados para el día actual.
- **Registro de contacto:** marcar un cliente como contactado hoy y actualizar su fecha de último contacto.
- **Contacto rápido:** acceso a WhatsApp, llamadas telefónicas y correo electrónico.
- **Compatibilidad con números colombianos:** apertura de conversaciones de WhatsApp con el prefijo internacional 57 para números móviles colombianos de diez dígitos.
- **Búsqueda flexible:** búsqueda por nombre, empresa, teléfono, correo electrónico o notas, sin distinguir entre mayúsculas, minúsculas o tildes.
- **Ordenamiento:** organización por fecha de seguimiento, contactos recientes o nombre.
- **Exportación a CSV:** descarga de los registros para consultarlos o procesarlos en herramientas compatibles, como Microsoft Excel.
- **Persistencia local:** conservación de los datos en `localStorage` del navegador.
- **Interfaz adaptable:** diseño preparado para diferentes tamaños de pantalla.
- **Identidad visual SatCore:** interfaz en modo oscuro con los elementos visuales y tokens de marca del proyecto.

---

# Tecnologías

Este proyecto utiliza las siguientes tecnologías:

### Tecnologías principales

- **Next.js:** framework de React para la estructura y ejecución de la aplicación.
- **React:** construcción de la interfaz mediante componentes.
- **TypeScript:** tipado estático para mejorar la consistencia del código.
- **Tailwind CSS v4:** estilos, diseño adaptable y utilidades visuales.
- **JavaScript:** lógica de interacción y procesamiento de datos.
- **HTML5:** estructura semántica de la interfaz.
- **CSS:** estilos globales y personalización de la identidad visual.
- **Web APIs:** almacenamiento local y mecanismos de interacción del navegador.
- **Git:** control de versiones.
- **GitHub:** alojamiento del repositorio y gestión del código fuente.
- **npm:** administración de dependencias y ejecución de scripts.

### Tecnologías de persistencia

- `localStorage`: almacenamiento de los registros de clientes en el navegador.
- CSV: formato de exportación de los datos para respaldo y consulta externa.

La aplicación no utiliza una base de datos remota ni requiere un backend propio para su funcionamiento actual.

---

# Requisitos

Antes de ejecutar el proyecto, asegúrate de contar con las siguientes herramientas:

- **Node.js:** versión compatible con la versión de Next.js instalada.
- **npm:** gestor de paquetes de Node.js.
- **Git:** para clonar el repositorio y gestionar versiones.
- **Navegador moderno:** compatible con las APIs web utilizadas por la aplicación.

Se recomienda consultar `package.json` para verificar las versiones de las dependencias y los scripts disponibles.

---

# Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/satcoresolutions/lista-de-clientes.git
```

### 2. Acceder al directorio

```bash
cd lista-de-clientes
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

### 5. Abrir la aplicación

Visita la siguiente dirección en tu navegador:

```text
http://localhost:3000
```

**Nota:** la URL del repositorio utilizada en los comandos corresponde al nombre propuesto `lista-de-clientes`. Si el repositorio tiene otro nombre, reemplaza la URL y el directorio por los valores reales.

---

# Configuración

La aplicación no requiere variables de entorno para su funcionamiento actual.

No obstante, si en futuras versiones se integran servicios externos, APIs, autenticación o una base de datos, será necesario documentar las variables de entorno correspondientes.

Si se incorporan variables de entorno locales, crea un archivo `.env.local` en la raíz del proyecto.

Ejemplo de estructura:

```text
.env.local
```

No agregues variables ficticias si no son necesarias para la implementación actual.

**Nunca publiques credenciales, tokens, claves privadas, contraseñas u otros secretos en el repositorio.**

---

# Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
```

El modo desarrollo permite probar los cambios en la interfaz, los componentes, la lógica de gestión de clientes y los mecanismos de almacenamiento local.

Los datos de prueba se guardan en el navegador utilizado para la ejecución y no se sincronizan automáticamente con otros dispositivos.

---

# Producción

### Generar la compilación

```bash
npm run build
```

### Iniciar la aplicación

```bash
npm start
```

El comando `npm start` debe ejecutarse después de generar una compilación de producción válida.

La aplicación puede desplegarse en plataformas compatibles con Next.js, como Vercel u otros proveedores de infraestructura compatibles.

El despliegue de la aplicación no convierte automáticamente `localStorage` en una base de datos compartida. Cada navegador conserva sus propios registros.

---

# Estructura del proyecto

La estructura principal del proyecto se organiza de la siguiente manera:

```text
lista-de-clientes/
│
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── ClientCard
│   ├── ClientModal
│   └── ui/
│
├── lib/
│   ├── types
│   ├── defaults
│   ├── format
│   ├── storage
│   ├── contact
│   └── export
│
├── public/
│   └── logo.png
│
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
└── ...
```

La estructura anterior representa la organización funcional descrita para el proyecto. Los nombres y extensiones exactos de los archivos deben coincidir con los existentes en el repositorio.

### Responsabilidades principales

- **`app/`:** página principal, layout y estilos globales.
- **`components/`:** componentes reutilizables de la interfaz.
- **`ClientCard`:** presentación de la información y acciones de cada cliente.
- **`ClientModal`:** formulario de creación y edición de registros.
- **`components/ui/`:** elementos visuales reutilizables.
- **`lib/types`:** tipos y estructuras de datos.
- **`lib/defaults`:** valores iniciales, fechas y lógica relacionada con los seguimientos.
- **`lib/format`:** funciones de formato de información.
- **`lib/storage`:** operaciones de persistencia local.
- **`lib/contact`:** utilidades para las acciones de contacto.
- **`lib/export`:** generación y exportación de archivos CSV.
- **`public/`:** recursos estáticos, incluido el logotipo de SatCore Solutions.

---

# Arquitectura

La aplicación sigue una arquitectura ligera basada en componentes de interfaz, lógica de aplicación y persistencia local.

```text
┌───────────────────────────────┐
│       Interfaz Next.js        │
│       React + Tailwind v4     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│      Componentes UI           │
│ ClientCard · ClientModal      │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│      Lógica de aplicación     │
│ Búsqueda · Estados · Fechas   │
│ Contacto · Ordenamiento       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Persistencia local      │
│          localStorage         │
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│        Exportación CSV        │
└───────────────────────────────┘
```

### Principios de arquitectura

- Separación de responsabilidades entre interfaz, lógica y almacenamiento.
- Reutilización de componentes.
- Tipado estático mediante TypeScript.
- Dependencia mínima de servicios externos.
- Funcionamiento local sin infraestructura de backend.
- Exportación de información para facilitar respaldos y análisis externos.

---

# Datos y privacidad

La aplicación almacena la información de los clientes mediante `localStorage`.

Los registros pueden incluir:

- Nombre del cliente.
- Empresa.
- Número de teléfono.
- Correo electrónico.
- Estado comercial.
- Fecha del último contacto.
- Fecha del próximo seguimiento.
- Notas.

### Consideraciones importantes

- Los datos permanecen asociados al navegador y al dispositivo donde se registran.
- La aplicación no sincroniza los datos automáticamente entre dispositivos.
- No existe una base de datos centralizada en la implementación actual.
- Los datos no se recuperan automáticamente al cambiar de navegador o dispositivo.
- Borrar los datos del sitio o del navegador puede ocasionar la pérdida de los registros.
- La exportación CSV permite generar una copia de los registros, pero el archivo descargado debe protegerse adecuadamente.

**Recomendación:** utiliza la opción de exportación CSV periódicamente y conserva las copias en un lugar seguro.

Debido a que la información puede incluir datos personales y comerciales, evita almacenar información sensible o confidencial que no sea necesaria para el seguimiento de clientes.

El responsable del tratamiento de los datos debe cumplir las obligaciones legales aplicables a su contexto de uso.

---

# Seguridad

La seguridad forma parte de los principios de desarrollo de SatCore Solutions.

En su implementación actual, la aplicación no dispone de autenticación, control de acceso por usuario ni sincronización remota.

Por ello, `localStorage` no debe considerarse un mecanismo de almacenamiento seguro para información confidencial. Los datos pueden ser accesibles desde el navegador y por otras personas que tengan acceso al mismo perfil del dispositivo.

Se recomienda:

- Mantener actualizado el navegador.
- Proteger el acceso al dispositivo y al perfil del navegador.
- Evitar almacenar contraseñas, credenciales o datos financieros sensibles.
- No utilizar equipos públicos para gestionar información privada de clientes.
- Mantener copias de respaldo protegidas.
- Revisar los cambios y las dependencias antes de publicar nuevas versiones.

### Reporte de vulnerabilidades

Si encuentras una vulnerabilidad de seguridad relacionada con este proyecto, evita publicar detalles técnicos sensibles de forma pública antes de que pueda ser evaluada.

**Email:** satcoresolutions@gmail.com

Incluye, cuando sea posible:

- Descripción del problema.
- Impacto potencial.
- Pasos generales para reproducirlo.
- Versión afectada.
- Información adicional relevante.

No incluyas credenciales reales ni información personal innecesaria.

---

# Desarrollo y contribuciones

Las contribuciones, correcciones, mejoras y adaptaciones son bienvenidas siempre que respeten la licencia del proyecto y las condiciones de uso de sus dependencias.

Antes de realizar cambios importantes, se recomienda:

1. Revisar la estructura y la documentación.
2. Mantener la separación de responsabilidades.
3. Conservar la consistencia de los tipos de TypeScript.
4. Verificar la compatibilidad con Tailwind CSS v4.
5. Probar las operaciones de creación, edición y eliminación.
6. Verificar la persistencia y la exportación CSV.
7. Ejecutar la compilación de producción antes de publicar cambios.

Las contribuciones no eliminan ni sustituyen la autoría original de SatCore Solutions.

---

# Proyectos derivados

Este proyecto puede utilizarse como base para desarrollar nuevas soluciones.

Se permite, de acuerdo con los términos de la SCSAL 1.0:

- Copiar.
- Estudiar.
- Modificar.
- Adaptar.
- Ampliar.
- Integrar.
- Redistribuir.
- Utilizar comercialmente.
- Crear proyectos derivados.

Los proyectos derivados deberán reconocer claramente a **SatCore Solutions** como fuente original cuando utilicen una parte sustancial del proyecto.

Ejemplo:

> Basado en Lista de clientes, desarrollado originalmente por SatCore Solutions.

Cuando sea posible, deberá incluirse también un enlace al repositorio original:

```text
https://github.com/satcoresolutions/lista-de-clientes
```

La atribución no deberá presentarse de manera que implique que SatCore Solutions respalda, patrocina, mantiene o garantiza un proyecto derivado cuando dicha relación no exista.

---

# Atribución

La atribución constituye una condición obligatoria de la licencia de este proyecto.

Cuando el código sea copiado, modificado, integrado o redistribuido de manera sustancial, deberá conservarse una referencia razonablemente visible a **SatCore Solutions** como desarrollador original.

Una atribución válida puede adoptar la siguiente forma:

> Este proyecto está basado en Lista de clientes, desarrollado originalmente por SatCore Solutions.

**Proyecto original:**

```text
https://github.com/satcoresolutions/lista-de-clientes
```

**SatCore Solutions:**

```text
https://github.com/satcoresolutions
```

La atribución no debe utilizarse para sugerir una relación comercial, respaldo oficial o mantenimiento por parte de SatCore Solutions si dicha relación no existe.

---

# Marca y propiedad intelectual

El código fuente de este proyecto está sujeto a la **SatCore Solutions Attribution License — SCSAL 1.0**.

La licencia del código no transfiere automáticamente derechos sobre:

- SatCore Solutions.
- SOFTWARE AND TECHNOLOGY CORE SOLUTIONS.
- Logotipos.
- Identidad visual.
- Nombres comerciales.
- Marcas.
- Dominios.
- Elementos gráficos.
- Otros signos distintivos asociados con SatCore Solutions.

El uso del código no constituye autorización para representar una relación oficial con SatCore Solutions.

La creación de un proyecto derivado tampoco otorga derechos para registrar o reclamar como propios los signos distintivos de SatCore Solutions.

---

# Dependencias de terceros

Este proyecto utiliza tecnologías y puede incorporar bibliotecas, frameworks, paquetes, iconos, fuentes, servicios, APIs u otros componentes desarrollados por terceros.

Cada componente de terceros permanece sujeto a su propia licencia.

La **SCSAL 1.0** no modifica ni reemplaza las licencias de terceros.

Los usuarios y distribuidores deberán respetar las condiciones correspondientes a las dependencias efectivamente utilizadas por el proyecto.

Para consultar las dependencias instaladas, revisa:

```text
package.json
package-lock.json
```

---

# Despliegue

El proyecto puede desplegarse en plataformas compatibles con Next.js.

Entre las opciones se encuentra Vercel, así como otros proveedores compatibles con la arquitectura utilizada.

### Proceso general

1. Crear o seleccionar el repositorio de GitHub.
2. Importar el repositorio en la plataforma de despliegue.
3. Configurar las opciones de compilación.
4. Instalar las dependencias.
5. Generar la compilación de producción.
6. Publicar la aplicación.
7. Verificar las operaciones principales en el entorno desplegado.

No se requieren variables de entorno para la funcionalidad descrita actualmente.

**Importante:** el despliegue publica la aplicación, pero no centraliza los datos de los clientes. Cada usuario continúa almacenando sus registros en el `localStorage` de su propio navegador.

La plataforma de despliegue y sus servicios permanecen sujetos a sus propios términos y condiciones.

---

# Limitaciones conocidas

- No dispone de backend ni base de datos remota.
- No incluye cuentas de usuario ni autenticación.
- No permite sincronización entre dispositivos.
- No ofrece colaboración multiusuario.
- No incluye envío automático de mensajes por WhatsApp.
- Las acciones de contacto abren los servicios correspondientes; no implican el envío automático de mensajes.
- Los respaldos deben generarse y conservarse manualmente mediante la exportación disponible.
- La eliminación de los datos del navegador puede provocar pérdida de información.
- No sustituye un CRM empresarial con permisos, auditoría y almacenamiento centralizado.

Estas limitaciones corresponden al alcance actual de la aplicación y pueden cambiar en versiones futuras.

---

# Estado del proyecto

**Estado:** En desarrollo

**Versión:** 1.0.0

**Última actualización:** 2026-10-20

---

# Roadmap

- [ ] Mejorar la validación de los datos de clientes.
- [ ] Incorporar importación de clientes desde CSV.
- [ ] Añadir filtros avanzados por estado y fechas.
- [ ] Mejorar los indicadores de seguimiento comercial.
- [ ] Incorporar opciones de respaldo y restauración.
- [ ] Evaluar una arquitectura opcional con backend y base de datos.
- [ ] Evaluar autenticación y sincronización multiusuario para una futura versión.
- [ ] Ampliar las opciones de personalización de la interfaz.
- [ ] Mejorar la documentación de uso y mantenimiento.

Los elementos del roadmap son objetivos propuestos y no representan funcionalidades disponibles hasta que se implementen.

---

# Licencia

Este proyecto se distribuye bajo:

## SatCore Solutions Attribution License — SCSAL 1.0

La licencia permite utilizar, estudiar, modificar, integrar y redistribuir el software, incluyendo su uso comercial, siempre que se respeten las condiciones de atribución y demás términos establecidos en la licencia.

Consulta el archivo:

```text
LICENSE
```

para conocer los términos completos.

---

# Autoría

## SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

_Soluciones digitales seguras, accesibles y funcionales para todos._

**GitHub:**

https://github.com/satcoresolutions

**Email:**

satcoresolutions@gmail.com

---

<div align="center">

**Desarrollado originalmente por SatCore Solutions.**

© SatCore Solutions — Todos los derechos reservados, excepto los derechos concedidos mediante SCSAL 1.0.

</div>
