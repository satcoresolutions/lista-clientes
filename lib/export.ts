import { STATUSES } from "./types";
import type { Client } from "./types";

/**
 * Evita que Excel interprete una celda como fórmula (=, @, y +/- que no sean
 * un número o teléfono), anteponiendo un apóstrofo.
 */
function safeCell(value: string): string {
  const v = value.replace(/\r?\n/g, " ");
  const risky =
    /^[=@\t\r]/.test(v) || (/^[+-]/.test(v) && !/^[+-]?[\d\s()-]+$/.test(v));
  const text = risky ? `'${v}` : v;
  return `"${text.replace(/"/g, '""')}"`;
}

export function clientsToCSV(clients: Client[]): string {
  const header = [
    "Nombre",
    "Empresa",
    "Celular",
    "Correo",
    "Estado",
    "Último contacto",
    "Próximo seguimiento",
    "Notas",
  ];

  const rows = clients.map((c) => [
    c.name,
    c.company,
    c.phone,
    c.email,
    STATUSES.find((s) => s.value === c.status)?.label ?? c.status,
    c.lastContact,
    c.nextFollowUp,
    c.notes,
  ]);

  const lines = [header, ...rows].map((r) => r.map(safeCell).join(","));
  // BOM para que Excel abra bien las tildes
  return `﻿${lines.join("\r\n")}`;
}

export function downloadCSV(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
