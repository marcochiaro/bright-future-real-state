"use client";

import { useState, useEffect } from "react";
import { FechaHebrea } from "@/types";
import { getFechaHebrea } from "@/lib/hebrew-calendar";

export function useHebrewDate() {
  const [fecha, setFecha] = useState<FechaHebrea | null>(null);

  useEffect(() => {
    setFecha(getFechaHebrea(new Date()));
    const interval = setInterval(() => {
      setFecha(getFechaHebrea(new Date()));
    }, 3600000); // cada hora
    return () => clearInterval(interval);
  }, []);

  return fecha;
}
