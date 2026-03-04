"use client";

import { useState, useEffect } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { EventoCeleste } from "@/types";
import { getEventosProximos } from "@/lib/events";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function UpcomingEventsCard() {
  const [proximoEvento, setProximoEvento] = useState<EventoCeleste | null>(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const eventos = getEventosProximos(new Date(), 60);
    // Encontrar el proximo evento que aun no ha pasado
    const futuro = eventos.find((e) => e.fecha.getTime() > Date.now());
    if (futuro) setProximoEvento(futuro);
  }, []);

  useEffect(() => {
    if (!proximoEvento) return;
    function actualizarCountdown() {
      if (!proximoEvento) return;
      const diff = proximoEvento.fecha.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown("Ahora");
        return;
      }
      const dias = Math.floor(diff / 86400000);
      const horas = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      if (dias > 0) {
        setCountdown(`${dias}d ${horas}h ${mins}m`);
      } else {
        setCountdown(`${horas}h ${mins}m`);
      }
    }
    actualizarCountdown();
    const interval = setInterval(actualizarCountdown, 60000);
    return () => clearInterval(interval);
  }, [proximoEvento]);

  if (!proximoEvento) {
    return (
      <GlowCard>
        <p className="text-cosmic-muted text-center">Cargando...</p>
      </GlowCard>
    );
  }

  return (
    <GlowCard glowColor="#d4af37">
      <h2 className="text-lg font-mystical text-gradient-gold mb-4">Proximo Evento</h2>

      <div className="text-center">
        <div className="text-3xl font-bold text-gold-400 font-mono mb-2">{countdown}</div>
        <div className="text-lg font-medium">{proximoEvento.titulo}</div>
        <div className="text-sm text-cosmic-muted mt-1">
          {formatDistanceToNow(proximoEvento.fecha, { locale: es, addSuffix: true })}
        </div>

        {proximoEvento.sefirotRelacionadas.length > 0 && (
          <div className="mt-3 text-xs text-gold-400/60">
            Sefirot activas: {proximoEvento.sefirotRelacionadas.join(", ")}
          </div>
        )}

        <div className="mt-4 p-3 rounded-lg bg-cosmic-black/50 text-left">
          <div className="text-xs text-gold-400/70 mb-1">Significado cabalistico</div>
          <p className="text-xs text-cosmic-muted leading-relaxed">
            {proximoEvento.significadoCabalistico.slice(0, 200)}...
          </p>
        </div>
      </div>
    </GlowCard>
  );
}
