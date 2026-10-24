"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ClientCard from "@/components/ClientCard";
import ClientModal from "@/components/ClientModal";
import { createClient, isPending, todayISO } from "@/lib/defaults";
import { clientsToCSV, downloadCSV } from "@/lib/export";
import { loadClients, persistClients } from "@/lib/storage";
import type { Client, ClientStatus } from "@/lib/types";

import { ui } from "../lib/ui";

type Filter = "todos" | "pendientes" | ClientStatus;
type Sort = "seguimiento" | "recientes" | "nombre";
type Toast = { kind: "ok" | "error"; text: string } | null;

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");
  const [sort, setSort] = useState<Sort>("seguimiento");

  const [editing, setEditing] = useState<{
    client: Client;
    isNew: boolean;
  } | null>(null);

  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carga inicial solo en el navegador.
  useEffect(() => {
    setClients(loadClients());
    setLoaded(true);
  }, []);

  const notify = useCallback((kind: "ok" | "error", text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);

    setToast({ kind, text });

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  const counts = useMemo(
    () => ({
      todos: clients.length,
      pendientes: clients.filter(isPending).length,
      prospecto: clients.filter((c) => c.status === "prospecto").length,
      activo: clients.filter((c) => c.status === "activo").length,
      inactivo: clients.filter((c) => c.status === "inactivo").length,
    }),
    [clients],
  );

  const visible = useMemo(() => {
    const q = norm(query.trim());

    const list = clients.filter((c) => {
      if (filter === "pendientes" && !isPending(c)) {
        return false;
      }

      if (
        filter !== "todos" &&
        filter !== "pendientes" &&
        c.status !== filter
      ) {
        return false;
      }

      if (!q) {
        return true;
      }

      return norm(
        [c.name, c.company, c.phone, c.email, c.notes].join(" "),
      ).includes(q);
    });

    return list.sort((a, b) => {
      if (sort === "nombre") {
        return a.name.localeCompare(b.name, "es");
      }

      if (sort === "recientes") {
        return b.updatedAt.localeCompare(a.updatedAt);
      }

      // seguimiento: primero los que tienen fecha,
      // la más próxima arriba.
      if (a.nextFollowUp && b.nextFollowUp) {
        return a.nextFollowUp.localeCompare(b.nextFollowUp);
      }

      if (a.nextFollowUp) {
        return -1;
      }

      if (b.nextFollowUp) {
        return 1;
      }

      return a.name.localeCompare(b.name, "es");
    });
  }, [clients, query, filter, sort]);

  const commit = (next: Client[]) => {
    setClients(next);
    persistClients(next);
  };

  const handleSave = (client: Client) => {
    const exists = clients.some((c) => c.id === client.id);

    commit(
      exists
        ? clients.map((c) => (c.id === client.id ? client : c))
        : [client, ...clients],
    );

    setEditing(null);

    notify("ok", exists ? "Cambios guardados." : "Cliente agregado.");
  };

  const handleDelete = (client: Client) => {
    if (
      !window.confirm(
        `¿Eliminar a ${client.name}? Esta acción no se puede deshacer.`,
      )
    ) {
      return;
    }

    commit(clients.filter((c) => c.id !== client.id));
    notify("ok", "Cliente eliminado.");
  };

  const handleContacted = (client: Client) => {
    const wasPending = isPending(client);

    const updated: Client = {
      ...client,
      lastContact: todayISO(),

      // Si el seguimiento ya había llegado, se da por hecho.
      nextFollowUp: wasPending ? "" : client.nextFollowUp,

      updatedAt: new Date().toISOString(),
    };

    commit(clients.map((c) => (c.id === client.id ? updated : c)));

    notify(
      "ok",
      wasPending
        ? "Contacto registrado. Seguimiento marcado como hecho."
        : "Contacto registrado hoy.",
    );
  };

  const handleExport = () => {
    if (clients.length === 0) {
      notify("error", "Aún no hay clientes para exportar.");
      return;
    }

    downloadCSV(`clientes-${todayISO()}.csv`, clientsToCSV(clients));
    notify("ok", "Archivo CSV descargado.");
  };

  const chips: {
    value: Filter;
    label: string;
    count: number;
  }[] = [
    { value: "todos", label: "Todos", count: counts.todos },
    {
      value: "pendientes",
      label: "Seguimientos",
      count: counts.pendientes,
    },
    {
      value: "prospecto",
      label: "Prospectos",
      count: counts.prospecto,
    },
    {
      value: "activo",
      label: "Activos",
      count: counts.activo,
    },
    {
      value: "inactivo",
      label: "Inactivos",
      count: counts.inactivo,
    },
  ];

  return (
    <div className="w-full">
      {/* Acciones */}
      <div className="mb-6 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className={ui.btnGhost}
          onClick={handleExport}
        >
          Exportar CSV
        </button>

        <button
          type="button"
          className={ui.btnPrimary}
          onClick={() =>
            setEditing({
              client: createClient(),
              isNew: true,
            })
          }
        >
          + Nuevo cliente
        </button>
      </div>

      {!loaded ? (
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
          <p className="text-base font-semibold text-foreground">
            Todavía no tienes clientes
          </p>

          <p className="mx-auto mt-1 max-w-sm text-sm text-text-muted">
            Agrega tu primer cliente con su contacto y una fecha de
            seguimiento. Todo se guarda en este navegador.
          </p>

          <button
            type="button"
            className={`${ui.btnPrimary} mt-5`}
            onClick={() =>
              setEditing({
                client: createClient(),
                isNew: true,
              })
            }
          >
            + Agregar primer cliente
          </button>
        </div>
      ) : (
        <>
          {/* Barra de búsqueda */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className={ui.input}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, empresa, teléfono, correo o notas…"
              aria-label="Buscar clientes"
            />

            <select
              className={`${ui.input} sm:w-56`}
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Ordenar por"
            >
              <option value="seguimiento">Orden: seguimiento</option>
              <option value="recientes">Orden: recientes</option>
              <option value="nombre">Orden: nombre A-Z</option>
            </select>
          </div>

          {/* Filtros */}
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar"
          >
            {chips.map((chip) => {
              const active = filter === chip.value;
              const alert =
                chip.value === "pendientes" && chip.count > 0;

              return (
                <button
                  key={chip.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(chip.value)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-white"
                      : alert
                        ? "border-warning/50 text-warning hover:bg-surface"
                        : "border-border text-text-muted hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {chip.label}{" "}
                  <span className="font-mono text-xs opacity-80">
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lista */}
          {visible.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-muted">
              No hay clientes con ese filtro o búsqueda.
            </div>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {visible.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onEdit={(c) =>
                    setEditing({
                      client: c,
                      isNew: false,
                    })
                  }
                  onDelete={handleDelete}
                  onContacted={handleContacted}
                />
              ))}
            </ul>
          )}
        </>
      )}

      {/* Modal */}
      {editing && (
        <ClientModal
          key={editing.client.id}
          client={editing.client}
          isNew={editing.isNew}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Aviso */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-xl ${
            toast.kind === "ok"
              ? "border-success/40 bg-surface text-success"
              : "border-danger/40 bg-surface text-danger"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}