"use client";

import { PlanetPosition } from "@/types";
import { PLANETAS } from "@/data/planets";
import { SEFIROT } from "@/data/sefirot";
import { GlowCard } from "@/components/ui/GlowCard";

interface PlanetCardProps {
  posicion: PlanetPosition;
  onClose: () => void;
}

export function PlanetCard({ posicion, onClose }: PlanetCardProps) {
  const planeta = PLANETAS.find((p) => p.id === posicion.planetId);
  const sefirah = planeta?.sefirah
    ? SEFIROT.find((s) => s.nombre === planeta.sefirah)
    : null;

  if (!planeta) return null;

  return (
    <GlowCard glowColor={planeta.color} className="w-full lg:max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl" style={{ color: planeta.color }}>
            {posicion.simbolo}
          </span>
          <h3 className="text-xl font-mystical font-bold">{planeta.nombre}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-cosmic-muted hover:text-cosmic-white text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Signo</div>
            <div className="text-sm font-medium">{posicion.signoZodiacal}</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Grado</div>
            <div className="text-sm font-medium">{posicion.gradoEnSigno.toFixed(2)}°</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Longitud</div>
            <div className="text-sm font-medium">{posicion.longitudEcliptica.toFixed(2)}°</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Estado</div>
            <div className="text-sm font-medium">
              {posicion.esRetrogrado ? (
                <span className="text-red-400">Retrogrado ℞</span>
              ) : (
                <span className="text-green-400">Directo</span>
              )}
            </div>
          </div>
        </div>

        {sefirah && (
          <div className="p-3 rounded-lg border border-gold-400/20 bg-cosmic-black/30">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: sefirah.color === "#2a2a3e" ? "#6a6a8e" : sefirah.color }}
              />
              <span className="text-sm font-medium text-gold-400">
                {sefirah.nombre} ({sefirah.traduccion})
              </span>
              <span className="text-xs text-cosmic-muted">{sefirah.nombreHebreo}</span>
            </div>
            <p className="text-xs text-cosmic-muted leading-relaxed">
              {planeta.significadoCabalistico}
            </p>
            <div className="mt-2 text-xs text-cosmic-muted/70">
              Arcangel: {sefirah.arcangel}
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
