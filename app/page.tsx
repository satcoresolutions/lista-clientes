"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ClientCard from "@/components/ClientCard";
import ClientModal from "@/components/ClientModal";
import { btnGhost, btnPrimary, inputCls } from "@/components/ui";
import { createClient, isPending, todayISO } from "@/lib/defaults";
import { clientsToCSV, downloadCSV } from "@/lib/export";
import { loadClients, persistClients } from "@/lib/storage";
import type { Client, ClientStatus } from "@/lib/types";

type Filter = "todos" | "pendientes" | ClientStatus;
type Sort = "seguimiento" | "recientes" | "nombre";
type Toast = { kind: "ok" | "error"; text: string } | null;

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");
  const [sort, setSort] = useState<Sort>("seguimiento");
  const [editing, setEditing] = useState<{ client: Client; isNew: boolean } | null>(
    null,
  );
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carga inicial solo en el navegador (evita desajustes de hidratación)
  useEffect(() => {
    setClients(loadClients());
    setLoaded(true);
  }, []);

  const notify = useCallback((kind: "ok" | "error", text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ kind, text });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
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
      if (filter === "pendientes" && !isPending(c)) return false;
      if (filter !== "todos" && filter !== "pendientes" && c.status !== filter) {
        return false;
      }
      if (!q) return true;
      return norm(
        [c.name, c.company, c.phone, c.email, c.notes].join(" "),
      ).includes(q);
    });

    return list.sort((a, b) => {
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      if (sort === "recientes") return b.updatedAt.localeCompare(a.updatedAt);
      // seguimiento: primero los que tienen fecha, la más próxima arriba
      if (a.nextFollowUp && b.nextFollowUp) {
        return a.nextFollowUp.localeCompare(b.nextFollowUp);
      }
      if (a.nextFollowUp) return -1;
      if (b.nextFollowUp) return 1;
      return a.name.localeCompare(b.name, "es");
    });
  }, [clients, query, filter, sort]);

  const commit = (next: Client[]) => {
    setClients(next);
    persistClients(next);
  };

  const handleSave = (client: Client) => {
    const exists = clients.some((c) => c.id === client.id);
    commit(exists ? clients.map((c) => (c.id === client.id ? client : c)) : [client, ...clients]);
    setEditing(null);
    notify("ok", exists ? "Cambios guardados." : "Cliente agregado.");
  };

  const handleDelete = (client: Client) => {
    if (!window.confirm(`¿Eliminar a ${client.name}? Esta acción no se puede deshacer.`)) {
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
      // Si el seguimiento ya había llegado, se da por hecho
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

  const chips: { value: Filter; label: string; count: number }[] = [
    { value: "todos", label: "Todos", count: counts.todos },
    { value: "pendientes", label: "Seguimientos", count: counts.pendientes },
    { value: "prospecto", label: "Prospectos", count: counts.prospecto },
    { value: "activo", label: "Activos", count: counts.activo },
    { value: "inactivo", label: "Inactivos", count: counts.inactivo },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      {/* Encabezado */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Logo y eslogan de SatCore Solutions */}
          <div className="flex shrink-0 flex-col items-center gap-1">
            <Image
              src="/logo.png"
              alt="SatCore Solutions"
              width={160}
              height={60}
              priority
              className="h-auto w-24 object-contain sm:w-32"
            />
            <p className="max-w-36 text-center text-[9px] leading-relaxed text-muted sm:max-w-44 sm:text-[10px]">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </p>
          </div>

          {/* Información de la aplicación */}
          <div className="border-l border-line-strong pl-4">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Lista de clientes
            </h1>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              CRM extremadamente sencillo · SatCore Solutions
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button type="button" className={btnGhost} onClick={handleExport}>
            Exportar CSV
          </button>
          <button
            type="button"
            className={btnPrimary}
            onClick={() => setEditing({ client: createClient(), isNew: true })}
          >
            + Nuevo cliente
          </button>
        </div>
      </header>

      {!loaded ? (
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
          <p className="text-base font-semibold text-white">
            Todavía no tienes clientes
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Agrega tu primer cliente con su contacto y una fecha de seguimiento.
            Todo se guarda en este navegador.
          </p>
          <button
            type="button"
            className={`${btnPrimary} mt-5`}
            onClick={() => setEditing({ client: createClient(), isNew: true })}
          >
            + Agregar primer cliente
          </button>
        </div>
      ) : (
        <>
          {/* Barra de búsqueda */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className={inputCls}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, empresa, teléfono, correo o notas…"
              aria-label="Buscar clientes"
            />
            <select
              className={`${inputCls} sm:w-56`}
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
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar">
            {chips.map((chip) => {
              const active = filter === chip.value;
              const alert = chip.value === "pendientes" && chip.count > 0;
              return (
                <button
                  key={chip.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(chip.value)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${active
                    ? "border-brand bg-brand text-white"
                    : alert
                      ? "border-warn-ui/50 text-warn-ui hover:bg-surface-2"
                      : "border-line text-muted hover:border-line-strong hover:text-white"
                    }`}
                >
                  {chip.label}{" "}
                  <span className="font-mono text-xs opacity-80">{chip.count}</span>
                </button>
              );
            })}
          </div>

          {/* Lista */}
          {visible.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-line bg-surface p-8 text-center text-sm text-muted">
              No hay clientes con ese filtro o búsqueda.
            </div>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {visible.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onEdit={(c) => setEditing({ client: c, isNew: false })}
                  onDelete={handleDelete}
                  onContacted={handleContacted}
                />
              ))}
            </ul>
          )}
        </>
      )}

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
          className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-xl ${toast.kind === "ok"
            ? "border-accent/40 bg-surface-2 text-accent"
            : "border-danger-ui/50 bg-surface-2 text-danger-ui"
            }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
