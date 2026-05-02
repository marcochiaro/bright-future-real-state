import { ZodiacWheel } from "@/components/celestial/ZodiacWheel";

export default function MapaCelestePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-mystical font-bold text-gradient-gold mb-3">
          Mapa Celeste
        </h1>
        <p className="text-cosmic-muted">
          Posiciones planetarias en tiempo real sobre la rueda zodiacal.
          Haz click en un planeta para ver su informacion detallada y correspondencia cabalistica.
        </p>
      </div>

      <ZodiacWheel />

      <div className="mt-8 text-center text-xs text-cosmic-muted/50">
        Las posiciones se actualizan automaticamente cada 60 segundos.
        Calculos realizados con astronomy-engine.
      </div>
    </div>
  );
}
