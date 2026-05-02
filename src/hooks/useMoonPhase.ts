"use client";

import { useState, useEffect } from "react";
import { FaseLunar } from "@/types";
import { getFaseLunar } from "@/lib/astronomy";

export function useMoonPhase() {
  const [fase, setFase] = useState<FaseLunar | null>(null);

  useEffect(() => {
    function actualizar() {
      setFase(getFaseLunar(new Date()));
    }
    actualizar();
    const interval = setInterval(actualizar, 900000); // cada 15 min
    return () => clearInterval(interval);
  }, []);

  return fase;
}
