"use client";

import { useState, useEffect } from "react";
import { PlanetPosition } from "@/types";
import { getPosicionesPlanetas } from "@/lib/astronomy";

export function useAstronomy(intervaloMs: number = 60000) {
  const [posiciones, setPosiciones] = useState<PlanetPosition[]>([]);
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());

  useEffect(() => {
    function actualizar() {
      const now = new Date();
      setPosiciones(getPosicionesPlanetas(now));
      setUltimaActualizacion(now);
    }

    actualizar();
    const interval = setInterval(actualizar, intervaloMs);
    return () => clearInterval(interval);
  }, [intervaloMs]);

  return { posiciones, ultimaActualizacion };
}
