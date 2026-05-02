import * as Astronomy from "astronomy-engine";
import { PlanetPosition, FaseLunar, SignoZodiacal } from "@/types";
import { getSignoPorLongitud } from "@/data/zodiac";

const PLANET_BODIES: { id: string; nombre: string; simbolo: string; body: Astronomy.Body }[] = [
  { id: "sun", nombre: "Sol", simbolo: "☉", body: Astronomy.Body.Sun },
  { id: "moon", nombre: "Luna", simbolo: "☽", body: Astronomy.Body.Moon },
  { id: "mercury", nombre: "Mercurio", simbolo: "☿", body: Astronomy.Body.Mercury },
  { id: "venus", nombre: "Venus", simbolo: "♀", body: Astronomy.Body.Venus },
  { id: "mars", nombre: "Marte", simbolo: "♂", body: Astronomy.Body.Mars },
  { id: "jupiter", nombre: "Jupiter", simbolo: "♃", body: Astronomy.Body.Jupiter },
  { id: "saturn", nombre: "Saturno", simbolo: "♄", body: Astronomy.Body.Saturn },
];

function esRetrogrado(body: Astronomy.Body, date: Date): boolean {
  if (body === Astronomy.Body.Sun || body === Astronomy.Body.Moon) return false;
  const t1 = Astronomy.MakeTime(date);
  const futuro = new Date(date.getTime() + 86400000);
  const t2 = Astronomy.MakeTime(futuro);
  const lon1 = Astronomy.EclipticLongitude(body, t1);
  const lon2 = Astronomy.EclipticLongitude(body, t2);
  let diff = lon2 - lon1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

export function getPosicionesPlanetas(date: Date = new Date()): PlanetPosition[] {
  const time = Astronomy.MakeTime(date);
  return PLANET_BODIES.map(({ id, nombre, simbolo, body }) => {
    const lon = Astronomy.EclipticLongitude(body, time);
    const signo = getSignoPorLongitud(lon);
    const geo = Astronomy.GeoVector(body, time, true);
    const dist = Math.sqrt(geo.x * geo.x + geo.y * geo.y + geo.z * geo.z);
    return {
      planetId: id,
      nombre,
      simbolo,
      longitudEcliptica: lon,
      signoZodiacal: signo.nombre as SignoZodiacal,
      gradoEnSigno: lon % 30,
      esRetrogrado: esRetrogrado(body, date),
      distanciaUA: dist,
    };
  });
}

export function getFaseLunar(date: Date = new Date()): FaseLunar {
  const time = Astronomy.MakeTime(date);
  const fase = Astronomy.MoonPhase(time);
  const iluminacion = Astronomy.Illumination(Astronomy.Body.Moon, time);

  let nombreFase: string;
  let emoji: string;
  if (fase < 22.5) { nombreFase = "Luna Nueva"; emoji = "🌑"; }
  else if (fase < 67.5) { nombreFase = "Creciente"; emoji = "🌒"; }
  else if (fase < 112.5) { nombreFase = "Cuarto Creciente"; emoji = "🌓"; }
  else if (fase < 157.5) { nombreFase = "Gibosa Creciente"; emoji = "🌔"; }
  else if (fase < 202.5) { nombreFase = "Luna Llena"; emoji = "🌕"; }
  else if (fase < 247.5) { nombreFase = "Gibosa Menguante"; emoji = "🌖"; }
  else if (fase < 292.5) { nombreFase = "Cuarto Menguante"; emoji = "🌗"; }
  else if (fase < 337.5) { nombreFase = "Menguante"; emoji = "🌘"; }
  else { nombreFase = "Luna Nueva"; emoji = "🌑"; }

  // Buscar proximas lunas
  const proximaLlena = Astronomy.SearchMoonPhase(180, time, 30);
  const proximaNueva = Astronomy.SearchMoonPhase(0, time, 30);

  return {
    fase,
    nombreFase,
    iluminacion: iluminacion.phase_fraction,
    emoji,
    proximaLunaLlena: proximaLlena ? proximaLlena.date : new Date(),
    proximaLunaNueva: proximaNueva ? proximaNueva.date : new Date(),
  };
}

export function getProximasFasesLunares(date: Date = new Date(), count: number = 8) {
  const fases: { fecha: Date; tipo: string; emoji: string }[] = [];
  let tiempo = Astronomy.MakeTime(date);

  const tiposFase = [
    { angulo: 0, nombre: "Luna Nueva", emoji: "🌑" },
    { angulo: 90, nombre: "Cuarto Creciente", emoji: "🌓" },
    { angulo: 180, nombre: "Luna Llena", emoji: "🌕" },
    { angulo: 270, nombre: "Cuarto Menguante", emoji: "🌗" },
  ];

  // Buscar las proximas fases
  for (let i = 0; i < count; i++) {
    let closest: { fecha: Date; tipo: string; emoji: string } | null = null;
    for (const tf of tiposFase) {
      const resultado = Astronomy.SearchMoonPhase(tf.angulo, tiempo, 40);
      if (resultado) {
        if (!closest || resultado.date < closest.fecha) {
          closest = { fecha: resultado.date, tipo: tf.nombre, emoji: tf.emoji };
        }
      }
    }
    if (closest) {
      fases.push(closest);
      tiempo = Astronomy.MakeTime(new Date(closest.fecha.getTime() + 86400000));
    }
  }

  return fases;
}

export function getProximosEclipses(date: Date = new Date(), count: number = 4) {
  const eclipses: {
    tipo: "lunar" | "solar";
    subtipo: string;
    fecha: Date;
    descripcion: string;
  }[] = [];

  let tiempoLunar = Astronomy.MakeTime(date);
  let tiempoSolar = Astronomy.MakeTime(date);

  for (let i = 0; i < count; i++) {
    const lunarEcl = Astronomy.SearchLunarEclipse(tiempoLunar);
    if (lunarEcl && lunarEcl.kind !== "penumbral") {
      eclipses.push({
        tipo: "lunar",
        subtipo: lunarEcl.kind === "total" ? "total" : "parcial",
        fecha: lunarEcl.peak.date,
        descripcion: `Eclipse lunar ${lunarEcl.kind}`,
      });
      tiempoLunar = Astronomy.MakeTime(new Date(lunarEcl.peak.date.getTime() + 30 * 86400000));
    }

    const solarEcl = Astronomy.SearchGlobalSolarEclipse(tiempoSolar);
    if (solarEcl) {
      eclipses.push({
        tipo: "solar",
        subtipo: solarEcl.kind,
        fecha: solarEcl.peak.date,
        descripcion: `Eclipse solar ${solarEcl.kind}`,
      });
      tiempoSolar = Astronomy.MakeTime(new Date(solarEcl.peak.date.getTime() + 30 * 86400000));
    }
  }

  return eclipses.sort((a, b) => a.fecha.getTime() - b.fecha.getTime()).slice(0, count);
}

export function getEstaciones(year: number) {
  const seasons = Astronomy.Seasons(year);
  return [
    { tipo: "equinoccio_primavera" as const, nombre: "Equinoccio de Primavera", fecha: seasons.mar_equinox.date },
    { tipo: "solsticio_verano" as const, nombre: "Solsticio de Verano", fecha: seasons.jun_solstice.date },
    { tipo: "equinoccio_otono" as const, nombre: "Equinoccio de Otono", fecha: seasons.sep_equinox.date },
    { tipo: "solsticio_invierno" as const, nombre: "Solsticio de Invierno", fecha: seasons.dec_solstice.date },
  ];
}

export function getConjunciones(startDate: Date, days: number = 365) {
  const conjunciones: {
    cuerpo1: string;
    cuerpo2: string;
    fecha: Date;
    separacion: number;
  }[] = [];

  const pares = [
    { b1: Astronomy.Body.Venus, b2: Astronomy.Body.Jupiter, n1: "Venus", n2: "Jupiter" },
    { b1: Astronomy.Body.Venus, b2: Astronomy.Body.Mars, n1: "Venus", n2: "Marte" },
    { b1: Astronomy.Body.Mars, b2: Astronomy.Body.Jupiter, n1: "Marte", n2: "Jupiter" },
    { b1: Astronomy.Body.Jupiter, b2: Astronomy.Body.Saturn, n1: "Jupiter", n2: "Saturno" },
    { b1: Astronomy.Body.Venus, b2: Astronomy.Body.Saturn, n1: "Venus", n2: "Saturno" },
    { b1: Astronomy.Body.Mercury, b2: Astronomy.Body.Venus, n1: "Mercurio", n2: "Venus" },
  ];

  for (const par of pares) {
    try {
      const time = Astronomy.MakeTime(startDate);
      const conj = Astronomy.SearchRelativeLongitude(par.b1, 0, time);
      if (conj && conj.date.getTime() - startDate.getTime() < days * 86400000) {
        const t = Astronomy.MakeTime(conj.date);
        const lon1 = Astronomy.EclipticLongitude(par.b1, t);
        const lon2 = Astronomy.EclipticLongitude(par.b2, t);
        let sep = Math.abs(lon1 - lon2);
        if (sep > 180) sep = 360 - sep;
        if (sep < 10) {
          conjunciones.push({
            cuerpo1: par.n1,
            cuerpo2: par.n2,
            fecha: conj.date,
            separacion: sep,
          });
        }
      }
    } catch {
      // Algunas busquedas pueden fallar, ignorar
    }
  }

  return conjunciones.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
}
