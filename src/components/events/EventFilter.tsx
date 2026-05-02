"use client";

const FILTROS = [
  { id: "todos", label: "Todos", icon: "✦" },
  { id: "lunar", label: "Fases Lunares", icon: "🌕" },
  { id: "eclipse", label: "Eclipses", icon: "🌑" },
  { id: "conjuncion", label: "Conjunciones", icon: "☌" },
  { id: "retrogrado", label: "Retrogrados", icon: "℞" },
  { id: "estacion", label: "Estaciones", icon: "🌸" },
  { id: "meteoros", label: "Meteoros", icon: "☄" },
];

interface EventFilterProps {
  filtroActivo: string;
  onFiltroChange: (filtro: string) => void;
}

export function EventFilter({ filtroActivo, onFiltroChange }: EventFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTROS.map((filtro) => (
        <button
          key={filtro.id}
          onClick={() => onFiltroChange(filtro.id)}
          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
            filtroActivo === filtro.id
              ? "bg-gold-400/20 text-gold-400 shadow-glow-gold"
              : "bg-cosmic-navy/50 text-cosmic-muted hover:bg-cosmic-navy hover:text-cosmic-white"
          }`}
        >
          <span className="mr-1">{filtro.icon}</span>
          {filtro.label}
        </button>
      ))}
    </div>
  );
}

export function filtrarEventos(
  eventos: { tipo: string }[],
  filtro: string
) {
  if (filtro === "todos") return eventos;
  const mapa: Record<string, string[]> = {
    lunar: ["luna_nueva", "luna_llena", "cuarto_creciente", "cuarto_menguante"],
    eclipse: ["eclipse_lunar", "eclipse_solar"],
    conjuncion: ["conjuncion", "oposicion"],
    retrogrado: ["retrogrado_inicio", "retrogrado_fin"],
    estacion: ["equinoccio_primavera", "solsticio_verano", "equinoccio_otono", "solsticio_invierno"],
    meteoros: ["lluvia_meteoros"],
  };
  const tipos = mapa[filtro] || [];
  return eventos.filter((e) => tipos.includes(e.tipo));
}
