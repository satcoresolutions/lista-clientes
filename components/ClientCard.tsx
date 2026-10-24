"use client";

import { followUpOf } from "@/lib/defaults";
import type { FollowUpKind } from "@/lib/defaults";
import { followUpLabel, formatDate } from "@/lib/format";
import { mailUrl, telUrl, whatsappUrl } from "@/lib/contact";
import { STATUSES } from "@/lib/types";
import type { Client, ClientStatus } from "@/lib/types";
import { ui } from "../lib/ui";

interface Props {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onContacted: (client: Client) => void;
}

const quickBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface";

const STATUS_STYLE: Record<ClientStatus, string> = {
  prospecto: "border-warning/40 bg-warning/10 text-warning",
  activo: "border-success/40 bg-success/10 text-success",
  inactivo: "border-border-strong text-text-muted",
};

const FOLLOW_STYLE: Record<FollowUpKind, string> = {
  none: "",
  vencido: "border-danger/50 bg-danger/10 text-danger",
  hoy: "border-warning/50 bg-warning/10 text-warning",
  proximo: "border-border text-text-muted",
};

export default function ClientCard({
  client,
  onEdit,
  onDelete,
  onContacted,
}: Props) {
  const follow = followUpOf(client);
  const wa = whatsappUrl(client);
  const tel = telUrl(client);
  const mail = mailUrl(client);

  const statusLabel =
    STATUSES.find((s) => s.value === client.status)?.label ?? client.status;

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {client.name}
          </h3>

          {client.company && (
            <p className="truncate text-xs text-text-muted">
              {client.company}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[client.status]}`}
        >
          {statusLabel}
        </span>
      </div>

      {(wa || tel || mail) && (
        <div className="flex flex-wrap gap-2">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={quickBtn}
            >
              WhatsApp
            </a>
          )}

          {tel && (
            <a href={tel} className={quickBtn}>
              Llamar
            </a>
          )}

          {mail && (
            <a href={mail} className={quickBtn}>
              Correo
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {follow.kind !== "none" && (
          <span
            className={`rounded-full border px-2.5 py-0.5 font-medium ${FOLLOW_STYLE[follow.kind]}`}
          >
            {followUpLabel(follow)} · {formatDate(client.nextFollowUp)}
          </span>
        )}

        <span className="text-text-muted">
          {client.lastContact
            ? `Último contacto: ${formatDate(client.lastContact)}`
            : "Sin contacto registrado"}
        </span>
      </div>

      {client.notes.trim() && (
        <p className="line-clamp-2 whitespace-pre-line text-sm text-text-muted">
          {client.notes}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-3">
        <button
          type="button"
          className={ui.btnGhost}
          onClick={() => onContacted(client)}
        >
          Contacté hoy
        </button>

        <button
          type="button"
          className={ui.btnGhost}
          onClick={() => onEdit(client)}
        >
          Editar
        </button>

        <button
          type="button"
          className={`${ui.btnGhost} text-danger`}
          onClick={() => onDelete(client)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}