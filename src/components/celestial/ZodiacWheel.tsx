"use client";

import { useAstronomy } from "@/hooks/useAstronomy";
import { SIGNOS_ZODIACALES, COLORES_ELEMENTO } from "@/data/zodiac";
import { PLANETAS } from "@/data/planets";
import { PlanetPosition } from "@/types";
import { useState } from "react";
import { PlanetCard } from "./PlanetCard";

const SIZE = 600;
const CENTER = SIZE / 2;
const OUTER_R = 270;
const INNER_R = 200;
const PLANET_R = 150;

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + Math.cos(rad) * radius,
    y: CENTER + Math.sin(rad) * radius,
  };
}

function describeArc(startAngle: number, endAngle: number, outerR: number, innerR: number) {
  const start1 = polarToXY(startAngle, outerR);
  const end1 = polarToXY(endAngle, outerR);
  const start2 = polarToXY(endAngle, innerR);
  const end2 = polarToXY(startAngle, innerR);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${start1.x} ${start1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${end1.x} ${end1.y}`,
    `L ${start2.x} ${start2.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${end2.x} ${end2.y}`,
    `Z`,
  ].join(" ");
}

export function ZodiacWheel() {
  const { posiciones } = useAstronomy();
  const [seleccionado, setSeleccionado] = useState<PlanetPosition | null>(null);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
      <div className="w-full max-w-[600px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full">
          {/* Fondo */}
          <circle cx={CENTER} cy={CENTER} r={OUTER_R + 5} fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
          <circle cx={CENTER} cy={CENTER} r={INNER_R} fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1" />

          {/* Segmentos zodiacales */}
          {SIGNOS_ZODIACALES.map((signo, i) => {
            const startAngle = i * 30;
            const endAngle = (i + 1) * 30;
            const midAngle = startAngle + 15;
            const labelPos = polarToXY(midAngle, (OUTER_R + INNER_R) / 2);
            const symbolPos = polarToXY(midAngle, OUTER_R + 15);

            return (
              <g key={signo.nombre}>
                <path
                  d={describeArc(startAngle, endAngle, OUTER_R, INNER_R)}
                  fill={COLORES_ELEMENTO[signo.elemento] + "15"}
                  stroke={COLORES_ELEMENTO[signo.elemento] + "40"}
                  strokeWidth="0.5"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={COLORES_ELEMENTO[signo.elemento]}
                  fontSize="14"
                  opacity="0.8"
                >
                  {signo.simbolo}
                </text>
                <text
                  x={symbolPos.x}
                  y={symbolPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(232,230,240,0.4)"
                  fontSize="8"
                >
                  {signo.nombre}
                </text>
              </g>
            );
          })}

          {/* Marcas de grado cada 10 */}
          {Array.from({ length: 36 }, (_, i) => {
            const angle = i * 10;
            const inner = polarToXY(angle, INNER_R);
            const outer = polarToXY(angle, INNER_R + 5);
            return (
              <line
                key={`tick-${i}`}
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="rgba(212,175,55,0.2)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Planetas */}
          {posiciones.map((pos) => {
            const planeta = PLANETAS.find((p) => p.id === pos.planetId);
            const planetPos = polarToXY(pos.longitudEcliptica, PLANET_R);
            const isSelected = seleccionado?.planetId === pos.planetId;

            return (
              <g
                key={pos.planetId}
                className="cursor-pointer"
                onClick={() => setSeleccionado(isSelected ? null : pos)}
              >
                {/* Linea al borde */}
                <line
                  x1={planetPos.x} y1={planetPos.y}
                  x2={polarToXY(pos.longitudEcliptica, INNER_R).x}
                  y2={polarToXY(pos.longitudEcliptica, INNER_R).y}
                  stroke={planeta?.color + "40" || "rgba(255,255,255,0.2)"}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {/* Circulo del planeta */}
                <circle
                  cx={planetPos.x}
                  cy={planetPos.y}
                  r={isSelected ? 18 : 14}
                  fill={`${planeta?.color || "#fff"}20`}
                  stroke={planeta?.color || "#fff"}
                  strokeWidth={isSelected ? 2 : 1}
                />
                {/* Simbolo */}
                <text
                  x={planetPos.x}
                  y={planetPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={planeta?.color || "#fff"}
                  fontSize={isSelected ? "14" : "12"}
                >
                  {pos.simbolo}
                </text>
                {/* Retrogrado */}
                {pos.esRetrogrado && (
                  <text
                    x={planetPos.x + 16}
                    y={planetPos.y - 12}
                    fill="#dc143c"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    Rx
                  </text>
                )}
              </g>
            );
          })}

          {/* Centro */}
          <circle cx={CENTER} cy={CENTER} r={30} fill="rgba(5,5,20,0.8)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          <text x={CENTER} y={CENTER} textAnchor="middle" dominantBaseline="central" fill="#d4af37" fontSize="20">
            ✡
          </text>
        </svg>
      </div>

      {/* Panel de detalle del planeta seleccionado */}
      {seleccionado && <PlanetCard posicion={seleccionado} onClose={() => setSeleccionado(null)} />}
    </div>
  );
}
