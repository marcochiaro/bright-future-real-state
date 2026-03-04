"use client";

import { SefirahData, PlanetPosition } from "@/types";
import { GlowCard } from "@/components/ui/GlowCard";

interface SefirahDetailProps {
  sefirah: SefirahData;
  posicionPlaneta: PlanetPosition | null;
  onClose: () => void;
}

export function SefirahDetail({ sefirah, posicionPlaneta, onClose }: SefirahDetailProps) {
  const displayColor = sefirah.color === "#2a2a3e" ? "#6a6a8e" : sefirah.color;

  return (
    <GlowCard glowColor={displayColor} className="w-full lg:max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: displayColor + "30",
              border: `2px solid ${displayColor}`,
              color: sefirah.color === "#ffffff" || sefirah.color === "#ffd700" ? "#050514" : "#e8e6f0",
            }}
          >
            {sefirah.nombreHebreo.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-mystical font-bold">{sefirah.nombre}</h3>
            <span className="text-sm text-cosmic-muted">
              {sefirah.nombreHebreo} — {sefirah.traduccion}
            </span>
          </div>
        </div>
        <button onClick={onClose} className="text-cosmic-muted hover:text-cosmic-white text-xl">
          ×
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-cosmic-muted leading-relaxed">{sefirah.descripcion}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Planeta</div>
            <div className="text-sm font-medium">{sefirah.planeta || "Trascendente"}</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Arcangel</div>
            <div className="text-sm font-medium">{sefirah.arcangel}</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Nombre Divino</div>
            <div className="text-sm font-medium">{sefirah.nombreDivino}</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-xs text-cosmic-muted">Color</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: displayColor }} />
              <span className="text-sm">{displayColor}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-gold-400/70 font-medium mb-2 uppercase">Cualidades</div>
          <div className="flex flex-wrap gap-2">
            {sefirah.cualidades.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-1 rounded-full bg-gold-400/10 text-gold-400"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {posicionPlaneta && (
          <div className="p-3 rounded-lg border border-gold-400/20 bg-cosmic-black/30">
            <div className="text-xs text-gold-400/70 font-medium mb-2 uppercase">
              Posicion actual de {sefirah.planeta}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-cosmic-muted">Signo: </span>
                {posicionPlaneta.signoZodiacal}
              </div>
              <div>
                <span className="text-cosmic-muted">Grado: </span>
                {posicionPlaneta.gradoEnSigno.toFixed(1)}°
              </div>
              <div>
                <span className="text-cosmic-muted">Estado: </span>
                {posicionPlaneta.esRetrogrado ? (
                  <span className="text-red-400">Retrogrado ℞</span>
                ) : (
                  <span className="text-green-400">Directo</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
