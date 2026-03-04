"use client";

import { useState, useEffect } from "react";
import { EventoCeleste } from "@/types";
import { getEventosProximos } from "@/lib/events";
import { EventCard } from "./EventCard";
import { EventFilter, filtrarEventos } from "./EventFilter";

export function EventTimeline() {
  const [eventos, setEventos] = useState<EventoCeleste[]>([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const todos = getEventosProximos(new Date(), 365);
    setEventos(todos);
  }, []);

  const eventosFiltrados = filtrarEventos(eventos, filtro) as EventoCeleste[];

  return (
    <div>
      <div className="mb-6">
        <EventFilter filtroActivo={filtro} onFiltroChange={setFiltro} />
      </div>

      <div className="relative">
        {/* Linea vertical del timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gold-400/20" />

        <div className="space-y-4 pl-10">
          {eventosFiltrados.length === 0 ? (
            <p className="text-cosmic-muted text-center py-8">
              No hay eventos para el filtro seleccionado.
            </p>
          ) : (
            eventosFiltrados.map((evento, i) => (
              <div key={evento.id} className="relative">
                {/* Punto en el timeline */}
                <div
                  className="absolute -left-10 top-4 w-3 h-3 rounded-full border-2 border-gold-400/50 bg-cosmic-black"
                  style={{
                    boxShadow:
                      evento.importancia === "rara"
                        ? "0 0 8px rgba(220, 20, 60, 0.5)"
                        : evento.importancia === "mayor"
                        ? "0 0 8px rgba(212, 175, 55, 0.5)"
                        : "none",
                  }}
                />
                <EventCard evento={evento} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
