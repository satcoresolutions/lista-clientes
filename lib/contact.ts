import type { Client } from "./types";

/** Celular listo para wa.me (Colombia: 10 dígitos → prefijo 57). null si no sirve. */
export function whatsappDigits(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `57${digits}`;
  if (digits.length >= 11) return digits;
  return null;
}

export function whatsappUrl(c: Client): string | null {
  const digits = whatsappDigits(c.phone);
  if (!digits) return null;
  const first = c.name.trim().split(/\s+/)[0] ?? "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hola ${first}, `)}`;
}

export function telUrl(c: Client): string | null {
  const digits = c.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export function mailUrl(c: Client): string | null {
  const email = c.email.trim();
  return email ? `mailto:${email}` : null;
}
