"use client";

import { EventoCeleste } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

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
  rara: "border-red-500/30 hover:border-red-500/50",
  mayor: "border-gold-400/30 hover:border-gold-400/50",
  moderada: "border-blue-500/20 hover:border-blue-500/40",
  menor: "border-cosmic-navy hover:border-cosmic-muted/30",
};

export function EventCard({ evento }: { evento: EventoCeleste }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div
      className={`glow-card p-4 cursor-pointer transition-all ${
        COLORES_IMPORTANCIA[evento.importancia]
      }`}
      onClick={() => setExpandido(!expandido)}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{ICONOS_TIPO[evento.tipo] || "✦"}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium">{evento.titulo}</h3>
            <span className="text-xs px-1.5 py-0.5 rounded bg-cosmic-navy text-cosmic-muted">
              {evento.importancia}
            </span>
          </div>
          <p className="text-sm text-cosmic-muted mt-1">
            {format(evento.fecha, "EEEE d 'de' MMMM yyyy, HH:mm", { locale: es })}
          </p>

          {expandido && (
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="text-xs text-gold-400/70 font-medium mb-1 uppercase">
                  Descripcion astronomica
                </h4>
                <p className="text-sm text-cosmic-muted leading-relaxed">{evento.descripcion}</p>
              </div>
              <div>
                <h4 className="text-xs text-blue-400/70 font-medium mb-1 uppercase">
                  Significado astrologico
                </h4>
                <p className="text-sm text-cosmic-muted leading-relaxed">
                  {evento.significadoAstrologico}
                </p>
              </div>
              <div>
                <h4 className="text-xs text-purple-400/70 font-medium mb-1 uppercase">
                  Perspectiva cabalistica
                </h4>
                <p className="text-sm text-cosmic-muted leading-relaxed">
                  {evento.significadoCabalistico}
                </p>
              </div>
              {evento.sefirotRelacionadas.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-cosmic-muted">Sefirot:</span>
                  {evento.sefirotRelacionadas.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-cosmic-muted/50 mt-2">
            {expandido ? "Click para contraer" : "Click para ver detalles"}
          </p>
        </div>
      </div>
    </div>
  );
}
