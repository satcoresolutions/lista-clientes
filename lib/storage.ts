import type { Client } from "./types";

const KEY = "satcore.clientes.v1";

export function loadClients(): Client[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const data: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? (data as Client[]) : [];
  } catch {
    return [];
  }
}

export function persistClients(clients: Client[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(clients));
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}
