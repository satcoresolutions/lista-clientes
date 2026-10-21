import type { FollowUp } from "./defaults";

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const plural = (n: number) => `${n} ${n === 1 ? "día" : "días"}`;

export function followUpLabel(f: FollowUp): string {
  switch (f.kind) {
    case "vencido":
      return `Vencido hace ${plural(Math.abs(f.days))}`;
    case "hoy":
      return "Seguimiento hoy";
    case "proximo":
      return f.days === 1 ? "Seguimiento mañana" : `Seguimiento en ${plural(f.days)}`;
    default:
      return "";
  }
}
