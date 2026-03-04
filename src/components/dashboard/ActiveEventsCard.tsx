"use client";

import { useState, useEffect } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { EventoCeleste } from "@/types";
import { getEventosProximos } from "@/lib/events";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ICONOS_TIPO: Record<string, string> = {
  luna_nueva: "🌑",
  luna_llena: "🌕",
  cuarto_creciente: "🌓",
  cuarto_menguante: "🌗",
  eclipse_lunar: "🌒",
  eclipse_solar: "🌘",
  conjuncion: "☌",
  oposicion: "☍",
  retrogrado_inicio: "℞",
  retrogrado_fin: "℞",
  lluvia_meteoros: "☄",
  equinoccio_primavera: "🌸",
  solsticio_verano: "☀",
  equinoccio_otono: "🍂",
  solsticio_invierno: "❄",
};

const COLORES_IMPORTANCIA: Record<string, string> = {
  rara: "text-red-400 bg-red-900/20",
  mayor: "text-gold-400 bg-gold-400/10",
  moderada: "text-blue-400 bg-blue-900/20",
  menor: "text-cosmic-muted bg-cosmic-navy/30",
};

export function ActiveEventsCard() {
  const [eventos, setEventos] = useState<EventoCeleste[]>([]);

  useEffect(() => {
    const todos = getEventosProximos(new Date(), 90);
    setEventos(todos.slice(0, 8));
  }, []);

  return (
    <GlowCard className="col-span-full lg:col-span-2">
      <h2 className="text-lg font-mystical text-gradient-gold mb-4">Proximos Eventos</h2>

      {eventos.length === 0 ? (
        <p className="text-cosmic-muted text-center py-4">Calculando eventos...</p>
      ) : (
        <div className="space-y-3">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-cosmic-black/40 border border-cosmic-navy/50 hover:border-gold-400/20 transition-colors"
            >
              <span className="text-xl flex-shrink-0 mt-0.5">
                {ICONOS_TIPO[evento.tipo] || "✦"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{evento.titulo}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      COLORES_IMPORTANCIA[evento.importancia]
                    }`}
                  >
                    {evento.importancia}
                  </span>
                </div>
                <div className="text-xs text-cosmic-muted mt-1">
                  {format(evento.fecha, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                </div>
                {evento.sefirotRelacionadas.length > 0 && (
                  <div className="text-xs text-gold-400/60 mt-1">
                    Sefirot: {evento.sefirotRelacionadas.join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </GlowCard>
  );
}
