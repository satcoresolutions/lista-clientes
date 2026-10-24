import type { ClientStatus } from "./types";

/** Metadatos de los estados de los clientes */
export const CLIENT_STATUS_META: Record<
  ClientStatus,
  { label: string; emoji: string }
> = {
  prospecto: { label: "Prospecto", emoji: "👤" },
  activo: { label: "Activo", emoji: "✅" },
  inactivo: { label: "Inactivo", emoji: "⏸️" },
};

/** Estados disponibles para filtros y selectores */
export const CLIENT_STATUSES = (
  Object.keys(CLIENT_STATUS_META) as ClientStatus[]
).map((value) => ({
  value,
  label: CLIENT_STATUS_META[value].label,
}));

/** Configuración del almacenamiento local */
export const STORAGE_KEYS = {
  clients: "satcore-lista-clientes:clientes",
} as const;

/** Clave para la preferencia de tema */
export const THEME_KEY = "satcore-lista-clientes-theme";

/** Clases reutilizables de la interfaz */
export { ui } from "./ui";