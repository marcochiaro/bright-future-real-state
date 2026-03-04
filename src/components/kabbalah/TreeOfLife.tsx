"use client";

import { useState } from "react";
import { useAstronomy } from "@/hooks/useAstronomy";
import { SEFIROT, CAMINOS_ARBOL } from "@/data/sefirot";
import { PLANETAS } from "@/data/planets";
import { SefirahDetail } from "./SefirahDetail";

const WIDTH = 500;
const HEIGHT = 700;

function getSefirahCoords(posX: number, posY: number) {
  return {
    x: (posX / 100) * WIDTH,
    y: (posY / 100) * HEIGHT + 20,
  };
}

export function TreeOfLife() {
  const { posiciones } = useAstronomy();
  const [seleccionada, setSeleccionada] = useState<string | null>(null);

  const sefirahSeleccionada = seleccionada
    ? SEFIROT.find((s) => s.nombre === seleccionada)
    : null;

  // Determinar intensidad de cada sefirah basada en los planetas
  function getIntensidad(sefirah: typeof SEFIROT[0]) {
    if (!sefirah.planetaId) return 0.4;
    const pos = posiciones.find((p) => p.planetId === sefirah.planetaId);
    if (!pos) return 0.4;
    if (pos.esRetrogrado) return 0.3;
    // Verificar domicilio
    const planeta = PLANETAS.find((p) => p.id === pos.planetId);
    if (planeta) {
      const domicilios: Record<string, string[]> = {
        sun: ["Leo"], moon: ["Cancer"], mercury: ["Geminis", "Virgo"],
        venus: ["Tauro", "Libra"], mars: ["Aries", "Escorpio"],
        jupiter: ["Sagitario", "Piscis"], saturn: ["Capricornio", "Acuario"],
      };
      if (domicilios[pos.planetId]?.includes(pos.signoZodiacal)) return 1;
    }
    return 0.6;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
      <div className="w-full max-w-[500px]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT + 40}`} className="w-full">
          {/* Caminos (paths) */}
          {CAMINOS_ARBOL.map((camino) => {
            const desde = SEFIROT.find((s) => s.nombre === camino.desde);
            const hasta = SEFIROT.find((s) => s.nombre === camino.hasta);
            if (!desde || !hasta) return null;
            const c1 = getSefirahCoords(desde.posX, desde.posY);
            const c2 = getSefirahCoords(hasta.posX, hasta.posY);
            const midX = (c1.x + c2.x) / 2;
            const midY = (c1.y + c2.y) / 2;

            return (
              <g key={`${camino.desde}-${camino.hasta}`}>
                <line
                  x1={c1.x} y1={c1.y}
                  x2={c2.x} y2={c2.y}
                  stroke="rgba(212,175,55,0.15)"
                  strokeWidth="1.5"
                />
                <text
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(212,175,55,0.3)"
                  fontSize="10"
                >
                  {camino.letraHebrea}
                </text>
              </g>
            );
          })}

          {/* Sefirot (nodos) */}
          {SEFIROT.map((sefirah) => {
            const coords = getSefirahCoords(sefirah.posX, sefirah.posY);
            const intensidad = getIntensidad(sefirah);
            const isSelected = seleccionada === sefirah.nombre;
            const displayColor = sefirah.color === "#2a2a3e" ? "#6a6a8e" : sefirah.color;
            const planetaData = posiciones.find((p) => p.planetId === sefirah.planetaId);

            return (
              <g
                key={sefirah.nombre}
                className="cursor-pointer"
                onClick={() => setSeleccionada(isSelected ? null : sefirah.nombre)}
              >
                {/* Glow effect */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? 35 : 28}
                  fill="none"
                  stroke={displayColor}
                  strokeWidth="1"
                  opacity={intensidad * 0.3}
                  style={{
                    filter: intensidad > 0.7 ? `drop-shadow(0 0 8px ${displayColor})` : undefined,
                  }}
                />
                {/* Circulo principal */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? 30 : 24}
                  fill={`${displayColor}${Math.round(intensidad * 40).toString(16).padStart(2, "0")}`}
                  stroke={displayColor}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  opacity={intensidad}
                />
                {/* Nombre hebreo */}
                <text
                  x={coords.x}
                  y={coords.y - 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={sefirah.color === "#ffffff" || sefirah.color === "#ffd700" ? "#050514" : "#e8e6f0"}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {sefirah.nombreHebreo}
                </text>
                {/* Simbolo del planeta */}
                {planetaData && (
                  <text
                    x={coords.x}
                    y={coords.y + 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={sefirah.color === "#ffffff" || sefirah.color === "#ffd700" ? "#050514" : "#e8e6f0"}
                    fontSize="9"
                    opacity="0.8"
                  >
                    {planetaData.simbolo}
                  </text>
                )}
                {/* Nombre en espanol debajo */}
                <text
                  x={coords.x}
                  y={coords.y + (isSelected ? 42 : 36)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(232,230,240,0.6)"
                  fontSize="9"
                >
                  {sefirah.traduccion}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Panel de detalle */}
      {sefirahSeleccionada && (
        <SefirahDetail
          sefirah={sefirahSeleccionada}
          posicionPlaneta={posiciones.find((p) => p.planetId === sefirahSeleccionada.planetaId) || null}
          onClose={() => setSeleccionada(null)}
        />
      )}
    </div>
  );
}
