"use client";

import { useMoonPhase } from "@/hooks/useMoonPhase";
import { useHebrewDate } from "@/hooks/useHebrewDate";
import { GlowCard } from "@/components/ui/GlowCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function MoonPhaseWidget() {
  const fase = useMoonPhase();
  const fechaHebrea = useHebrewDate();

  if (!fase) {
    return (
      <GlowCard>
        <p className="text-cosmic-muted text-center">Calculando fase lunar...</p>
      </GlowCard>
    );
  }

  return (
    <GlowCard glowColor="#9370db">
      <h2 className="text-lg font-mystical text-gradient-gold mb-4">Fase Lunar</h2>

      <div className="text-center">
        <div className="text-6xl mb-3">{fase.emoji}</div>
        <div className="text-xl font-medium" style={{ color: "#9370db" }}>
          {fase.nombreFase}
        </div>
        <div className="text-sm text-cosmic-muted mt-1">
          Iluminacion: {(fase.iluminacion * 100).toFixed(0)}%
        </div>

        {fechaHebrea && (
          <div className="mt-4 p-3 rounded-lg bg-cosmic-black/50 border border-cosmic-navy">
            <div className="text-xs text-gold-400/70 mb-1">Fecha Hebrea</div>
            <div className="text-sm">{fechaHebrea.fechaHebrea}</div>
            {fechaHebrea.festividad && (
              <div className="text-xs text-gold-400 mt-1">{fechaHebrea.festividad}</div>
            )}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-cosmic-muted">Proxima Luna Llena</div>
            <div>{format(fase.proximaLunaLlena, "d MMM", { locale: es })}</div>
          </div>
          <div className="p-2 rounded bg-cosmic-black/50">
            <div className="text-cosmic-muted">Proxima Luna Nueva</div>
            <div>{format(fase.proximaLunaNueva, "d MMM", { locale: es })}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-cosmic-muted text-center">
        Yesod (יסוד) — Fundamento
      </div>
    </GlowCard>
  );
}
