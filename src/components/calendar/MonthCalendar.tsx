"use client";

import { useState, useEffect, useMemo } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { getFechaHebrea } from "@/lib/hebrew-calendar";
import { getFaseLunar } from "@/lib/astronomy";
import { getEventosProximos } from "@/lib/events";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { EventoCeleste } from "@/types";

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

function getMoonEmoji(date: Date): string {
  const fase = getFaseLunar(date);
  return fase.emoji;
}

export function MonthCalendar() {
  const [mesActual, setMesActual] = useState(new Date());
  const [eventos, setEventos] = useState<EventoCeleste[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);

  const inicio = startOfMonth(mesActual);
  const fin = endOfMonth(mesActual);
  const dias = eachDayOfInterval({ start: inicio, end: fin });
  const primerDiaSemana = getDay(inicio);

  useEffect(() => {
    const evts = getEventosProximos(inicio, 35);
    setEventos(evts.filter((e) => e.fecha >= inicio && e.fecha <= fin));
  }, [mesActual]);

  const eventosDelDia = useMemo(() => {
    if (!diaSeleccionado) return [];
    const diaStr = format(diaSeleccionado, "yyyy-MM-dd");
    return eventos.filter((e) => format(e.fecha, "yyyy-MM-dd") === diaStr);
  }, [diaSeleccionado, eventos]);

  return (
    <div>
      {/* Navegacion */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMesActual(subMonths(mesActual, 1))}
          className="px-3 py-1.5 rounded bg-cosmic-navy text-cosmic-muted hover:text-cosmic-white transition-colors"
        >
          ← Anterior
        </button>
        <h2 className="text-xl font-mystical text-gradient-gold capitalize">
          {format(mesActual, "MMMM yyyy", { locale: es })}
        </h2>
        <button
          onClick={() => setMesActual(addMonths(mesActual, 1))}
          className="px-3 py-1.5 rounded bg-cosmic-navy text-cosmic-muted hover:text-cosmic-white transition-colors"
        >
          Siguiente →
        </button>
      </div>

      {/* Encabezados de dias */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DIAS_SEMANA.map((dia) => (
          <div key={dia} className="text-center text-xs text-cosmic-muted py-2">
            {dia}
          </div>
        ))}
      </div>

      {/* Grid del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {/* Espacios vacios antes del primer dia */}
        {Array.from({ length: primerDiaSemana }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Dias del mes */}
        {dias.map((dia) => {
          const diaStr = format(dia, "yyyy-MM-dd");
          const hoy = format(new Date(), "yyyy-MM-dd") === diaStr;
          const tieneEventos = eventos.some((e) => format(e.fecha, "yyyy-MM-dd") === diaStr);
          const esSabado = getDay(dia) === 6;
          const isSelected = diaSeleccionado && format(diaSeleccionado, "yyyy-MM-dd") === diaStr;
          let fechaHeb;
          try {
            fechaHeb = getFechaHebrea(dia);
          } catch {
            fechaHeb = null;
          }

          return (
            <div
              key={diaStr}
              onClick={() => setDiaSeleccionado(dia)}
              className={`aspect-square p-1 rounded-lg cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                hoy
                  ? "bg-gold-400/20 border border-gold-400/50"
                  : isSelected
                  ? "bg-cosmic-navy border border-gold-400/30"
                  : "bg-cosmic-black/30 border border-transparent hover:border-cosmic-navy"
              } ${esSabado ? "bg-purple-900/10" : ""}`}
            >
              <span className={`text-sm ${hoy ? "text-gold-400 font-bold" : ""}`}>
                {format(dia, "d")}
              </span>
              <span className="text-[10px] leading-none">{getMoonEmoji(dia)}</span>
              {fechaHeb && (
                <span className="text-[8px] text-cosmic-muted/50 leading-none">
                  {fechaHeb.fechaHebrea.split(" ")[0]}
                </span>
              )}
              {tieneEventos && (
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              )}
              {fechaHeb?.festividad && (
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              )}
            </div>
          );
        })}
      </div>

      {/* Detalle del dia seleccionado */}
      {diaSeleccionado && (
        <GlowCard className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mystical text-gold-400">
              {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
            </h3>
            <button
              onClick={() => setDiaSeleccionado(null)}
              className="text-cosmic-muted hover:text-cosmic-white"
            >
              ×
            </button>
          </div>

          {(() => {
            let fh;
            try { fh = getFechaHebrea(diaSeleccionado); } catch { fh = null; }
            return fh ? (
              <div className="text-sm text-cosmic-muted mb-3">
                <span className="text-gold-400/70">Fecha hebrea: </span>
                {fh.fechaHebrea}
                {fh.festividad && (
                  <span className="ml-2 text-purple-400">— {fh.festividad}</span>
                )}
              </div>
            ) : null;
          })()}

          <div className="text-sm text-cosmic-muted mb-3">
            <span className="text-gold-400/70">Fase lunar: </span>
            {getMoonEmoji(diaSeleccionado)} {getFaseLunar(diaSeleccionado).nombreFase}
          </div>

          {eventosDelDia.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs text-gold-400/70 uppercase">Eventos del dia</div>
              {eventosDelDia.map((evt) => (
                <div key={evt.id} className="p-2 rounded bg-cosmic-black/50 text-sm">
                  <div className="font-medium">{evt.titulo}</div>
                  <div className="text-xs text-cosmic-muted mt-1">{evt.descripcion}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-cosmic-muted/50">No hay eventos astronomicos este dia.</p>
          )}
        </GlowCard>
      )}

      {/* Leyenda */}
      <div className="flex items-center gap-4 mt-4 text-xs text-cosmic-muted">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gold-400" /> Evento astronomico
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-400" /> Festividad hebrea
        </div>
      </div>
    </div>
  );
}
