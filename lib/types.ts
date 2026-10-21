export type ClientStatus = "prospecto" | "activo" | "inactivo";

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: ClientStatus;
  /** yyyy-mm-dd o vacío */
  lastContact: string;
  /** yyyy-mm-dd o vacío */
  nextFollowUp: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUSES: { value: ClientStatus; label: string }[] = [
  { value: "prospecto", label: "Prospecto" },
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
];
