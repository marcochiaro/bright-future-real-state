"use client";

import { useAstronomy } from "@/hooks/useAstronomy";
import { GlowCard } from "@/components/ui/GlowCard";
import { PLANETAS } from "@/data/planets";

export function CurrentSkyOverview() {
  const { posiciones, ultimaActualizacion } = useAstronomy();

  if (posiciones.length === 0) {
    return (
      <GlowCard className="col-span-full">
        <p className="text-cosmic-muted text-center">Calculando posiciones planetarias...</p>
      </GlowCard>
    );
  }

  return (
    <GlowCard className="col-span-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-mystical text-gradient-gold">Cielo Actual</h2>
        <span className="text-xs text-cosmic-muted">
          {ultimaActualizacion.toLocaleTimeString("es")}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {posiciones.map((pos) => {
          const planeta = PLANETAS.find((p) => p.id === pos.planetId);
          return (
            <div
              key={pos.planetId}
              className="text-center p-3 rounded-lg bg-cosmic-black/50 border border-cosmic-navy hover:border-gold-400/30 transition-colors"
            >
              <div className="text-2xl mb-1" style={{ color: planeta?.color }}>
                {pos.simbolo}
              </div>
              <div className="text-sm font-medium">{pos.nombre}</div>
              <div className="text-xs text-cosmic-muted mt-1">{pos.signoZodiacal}</div>
              <div className="text-xs text-cosmic-muted">{pos.gradoEnSigno.toFixed(1)}°</div>
              {pos.esRetrogrado && (
                <span className="inline-block mt-1 text-xs px-1.5 py-0.5 rounded bg-red-900/30 text-red-400">
                  Rx
                </span>
              )}
              {planeta?.sefirah && (
                <div className="text-xs text-gold-400/70 mt-1">{planeta.sefirah}</div>
              )}
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}
