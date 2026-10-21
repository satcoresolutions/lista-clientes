"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { validateClient } from "@/lib/defaults";
import { STATUSES } from "@/lib/types";
import type { Client, ClientStatus } from "@/lib/types";
import { btnGhost, btnPrimary, inputCls } from "./ui";

interface Props {
  client: Client;
  isNew: boolean;
  onSave: (client: Client) => void;
  onClose: () => void;
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function ClientModal({ client, isNew, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Client>(client);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const set = <K extends keyof Client>(key: K, value: Client[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    if (error) setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const clean: Client = {
      ...draft,
      name: draft.name.trim(),
      company: draft.company.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      notes: draft.notes.trim(),
      updatedAt: new Date().toISOString(),
    };
    const problem = validateClient(clean);
    if (problem) {
      setError(problem);
      nameRef.current?.focus();
      return;
    }
    onSave(clean);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-modal-title"
        onSubmit={submit}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-line bg-surface p-5 shadow-2xl sm:rounded-2xl"
      >
        <h2 id="client-modal-title" className="text-lg font-bold text-white">
          {isNew ? "Nuevo cliente" : "Editar cliente"}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Nombre *" className="sm:col-span-2">
            <input
              ref={nameRef}
              className={inputCls}
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Nombre del cliente"
              autoComplete="off"
            />
          </Field>
          <Field label="Empresa o negocio">
            <input
              className={inputCls}
              value={draft.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </Field>
          <Field label="Estado">
            <select
              className={inputCls}
              value={draft.status}
              onChange={(e) => set("status", e.target.value as ClientStatus)}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Celular">
            <input
              className={inputCls}
              value={draft.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="300 000 0000"
              inputMode="tel"
            />
          </Field>
          <Field label="Correo">
            <input
              className={inputCls}
              type="email"
              value={draft.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </Field>
          <Field label="Próximo seguimiento">
            <input
              className={inputCls}
              type="date"
              value={draft.nextFollowUp}
              onChange={(e) => set("nextFollowUp", e.target.value)}
            />
          </Field>
          <Field label="Último contacto">
            <input
              className={inputCls}
              type="date"
              value={draft.lastContact}
              onChange={(e) => set("lastContact", e.target.value)}
            />
          </Field>
          <Field label="Notas" className="sm:col-span-2">
            <textarea
              className={`${inputCls} min-h-24 resize-y`}
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Qué necesita, qué se habló, precios acordados…"
            />
          </Field>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-danger-ui">
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className={btnGhost} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={btnPrimary}>
            {isNew ? "Agregar cliente" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
