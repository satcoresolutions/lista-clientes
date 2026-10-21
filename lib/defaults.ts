import type { Client } from "./types";

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function todayISO(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function createClient(): Client {
  const now = new Date().toISOString();
  return {
    id: uid(),
    name: "",
    company: "",
    phone: "",
    email: "",
    status: "prospecto",
    lastContact: "",
    nextFollowUp: "",
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
}

/** Devuelve un mensaje de error o null si el cliente es válido. */
export function validateClient(c: Client): string | null {
  if (!c.name.trim()) return "Escribe el nombre del cliente.";
  const email = c.email.trim();
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return "El correo no parece válido.";
  return null;
}

export type FollowUpKind = "none" | "vencido" | "hoy" | "proximo";

export interface FollowUp {
  kind: FollowUpKind;
  /** Días hasta el seguimiento (negativo = vencido) */
  days: number;
}

function parseLocalDate(iso: string): Date | null {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function followUpOf(c: Pick<Client, "nextFollowUp">): FollowUp {
  if (!c.nextFollowUp) return { kind: "none", days: 0 };
  const target = parseLocalDate(c.nextFollowUp);
  if (!target) return { kind: "none", days: 0 };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return { kind: "vencido", days };
  if (days === 0) return { kind: "hoy", days };
  return { kind: "proximo", days };
}

export function isPending(c: Client): boolean {
  const k = followUpOf(c).kind;
  return k === "vencido" || k === "hoy";
}
