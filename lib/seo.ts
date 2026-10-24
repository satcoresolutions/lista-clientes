/** Configuración central de SEO. Define NEXT_PUBLIC_SITE_URL en producción. */
export const SITE = {
  name: "Lista de clientes",
  brand: "SatCore Solutions",

  description:
    "Gestiona tus clientes, organiza su información de contacto y programa seguimientos comerciales desde una aplicación sencilla.",

  shortDescription:
    "Gestión sencilla de clientes y seguimientos comerciales.",

  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, ""),

  locale: "es_CO",
  language: "es-CO",

  themeColor: "#132a8e",

  keywords: [
    "lista de clientes",
    "gestión de clientes",
    "registro de clientes",
    "seguimiento de clientes",
    "seguimientos comerciales",
    "CRM sencillo",
    "CRM para pequeños negocios",
    "gestión de contactos",
    "clientes para negocios",
    "SatCore Solutions",
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
