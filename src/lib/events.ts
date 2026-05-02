import { EventoCeleste, TipoEvento } from "@/types";
import {
  getProximasFasesLunares,
  getProximosEclipses,
  getEstaciones,
  getConjunciones,
  getPosicionesPlanetas,
} from "./astronomy";
import { getInterpretacionRetrogrado } from "./astrology";
import { getInterpretacionCabalistica, getSefirahParaPlaneta } from "./kabbalah";
import { LLUVIAS_METEOROS } from "@/data/meteor-showers";

let eventIdCounter = 0;
function genId(): string {
  return `evt-${++eventIdCounter}-${Date.now()}`;
}

function tipoFaseLunar(nombre: string): TipoEvento {
  if (nombre.includes("Nueva")) return "luna_nueva";
  if (nombre.includes("Llena")) return "luna_llena";
  if (nombre.includes("Creciente")) return "cuarto_creciente";
  return "cuarto_menguante";
}

function importanciaFase(tipo: TipoEvento): "menor" | "moderada" | "mayor" | "rara" {
  if (tipo === "luna_llena" || tipo === "luna_nueva") return "mayor";
  return "moderada";
}

export function getEventosProximos(
  date: Date = new Date(),
  dias: number = 365
): EventoCeleste[] {
  const eventos: EventoCeleste[] = [];

  // 1. Fases lunares
  const fases = getProximasFasesLunares(date, 20);
  for (const fase of fases) {
    const tipo = tipoFaseLunar(fase.tipo);
    eventos.push({
      id: genId(),
      tipo,
      titulo: fase.tipo,
      fecha: fase.fecha,
      descripcion: `${fase.emoji} ${fase.tipo} — La Luna entra en su fase de ${fase.tipo.toLowerCase()}.`,
      significadoAstrologico: getSignificadoAstrologicoFase(tipo),
      significadoCabalistico: getInterpretacionCabalistica(tipo, ["Luna"]),
      sefirotRelacionadas: ["Yesod"],
      importancia: importanciaFase(tipo),
      cuerposInvolucrados: ["Luna"],
    });
  }

  // 2. Eclipses
  const eclipses = getProximosEclipses(date, 4);
  for (const ecl of eclipses) {
    const tipo: TipoEvento = ecl.tipo === "lunar" ? "eclipse_lunar" : "eclipse_solar";
    const sefirot = ecl.tipo === "lunar" ? ["Yesod"] : ["Tiferet"];
    eventos.push({
      id: genId(),
      tipo,
      titulo: ecl.descripcion,
      fecha: ecl.fecha,
      descripcion: `${ecl.descripcion}. Un evento astronomico extraordinario visible desde partes del planeta.`,
      significadoAstrologico:
        ecl.tipo === "lunar"
          ? "Los eclipses lunares marcan finales y revelaciones. Emociones profundas salen a la superficie, cerrando ciclos karmicos."
          : "Los eclipses solares inician nuevos capitulos poderosos. Cambios significativos en la identidad y el proposito de vida.",
      significadoCabalistico: getInterpretacionCabalistica(tipo, [ecl.tipo === "lunar" ? "Luna" : "Sol"]),
      sefirotRelacionadas: sefirot,
      importancia: "rara",
      cuerposInvolucrados: ["Sol", "Luna"],
    });
  }

  // 3. Estaciones
  const year = date.getFullYear();
  const estaciones = [...getEstaciones(year), ...getEstaciones(year + 1)];
  for (const est of estaciones) {
    if (est.fecha.getTime() > date.getTime() && est.fecha.getTime() < date.getTime() + dias * 86400000) {
      eventos.push({
        id: genId(),
        tipo: est.tipo,
        titulo: est.nombre,
        fecha: est.fecha,
        descripcion: `${est.nombre} — Momento de equilibrio o extremo en el ciclo solar anual.`,
        significadoAstrologico: getSignificadoEstacion(est.tipo),
        significadoCabalistico: getInterpretacionCabalistica(est.tipo, ["Sol"]),
        sefirotRelacionadas: ["Tiferet"],
        importancia: "mayor",
        cuerposInvolucrados: ["Sol"],
      });
    }
  }

  // 4. Conjunciones
  try {
    const conjunciones = getConjunciones(date, dias);
    for (const conj of conjunciones) {
      eventos.push({
        id: genId(),
        tipo: "conjuncion",
        titulo: `Conjuncion ${conj.cuerpo1}-${conj.cuerpo2}`,
        fecha: conj.fecha,
        descripcion: `Conjuncion entre ${conj.cuerpo1} y ${conj.cuerpo2} (separacion: ${conj.separacion.toFixed(1)}°).`,
        significadoAstrologico: `La conjuncion de ${conj.cuerpo1} y ${conj.cuerpo2} fusiona las energias de ambos planetas, creando un punto de inicio poderoso.`,
        significadoCabalistico: getInterpretacionCabalistica("conjuncion", [conj.cuerpo1, conj.cuerpo2]),
        sefirotRelacionadas: getSefirotParaCuerpos([conj.cuerpo1, conj.cuerpo2]),
        importancia: "mayor",
        cuerposInvolucrados: [conj.cuerpo1, conj.cuerpo2],
      });
    }
  } catch {
    // Ignorar errores de conjunciones
  }

  // 5. Retrogrados
  const posiciones = getPosicionesPlanetas(date);
  for (const pos of posiciones) {
    if (pos.esRetrogrado && pos.planetId !== "sun" && pos.planetId !== "moon") {
      eventos.push({
        id: genId(),
        tipo: "retrogrado_inicio",
        titulo: `${pos.nombre} Retrogrado`,
        fecha: date,
        descripcion: `${pos.nombre} esta actualmente retrogrado en ${pos.signoZodiacal}. Su movimiento aparente se invierte.`,
        significadoAstrologico: getInterpretacionRetrogrado(pos.nombre),
        significadoCabalistico: getInterpretacionCabalistica("retrogrado_inicio", [pos.nombre]),
        sefirotRelacionadas: getSefirotParaCuerpos([pos.nombre]),
        importancia: "moderada",
        cuerposInvolucrados: [pos.nombre],
      });
    }
  }

  // 6. Lluvias de meteoros
  for (const lluvia of LLUVIAS_METEOROS) {
    const picoDate = parseMeteorDate(lluvia.pico, year);
    if (picoDate.getTime() > date.getTime() && picoDate.getTime() < date.getTime() + dias * 86400000) {
      eventos.push({
        id: genId(),
        tipo: "lluvia_meteoros",
        titulo: `Lluvia ${lluvia.nombre}`,
        fecha: picoDate,
        descripcion: `${lluvia.nombre} — Tasa maxima: ${lluvia.tasaMaxima} meteoros/hora. Radiante: ${lluvia.radiante}. ${lluvia.descripcion}`,
        significadoAstrologico: `Las ${lluvia.nombre} traen energia de renovacion y deseos. Cada meteoro simboliza una intencion que cruza el cielo.`,
        significadoCabalistico: getInterpretacionCabalistica("lluvia_meteoros", []),
        sefirotRelacionadas: ["Chokmah"],
        importancia: lluvia.tasaMaxima > 50 ? "mayor" : "moderada",
        cuerposInvolucrados: [],
      });
    }
    // Tambien para el proximo ano
    const picoNextYear = parseMeteorDate(lluvia.pico, year + 1);
    if (picoNextYear.getTime() > date.getTime() && picoNextYear.getTime() < date.getTime() + dias * 86400000) {
      eventos.push({
        id: genId(),
        tipo: "lluvia_meteoros",
        titulo: `Lluvia ${lluvia.nombre}`,
        fecha: picoNextYear,
        descripcion: `${lluvia.nombre} — Tasa maxima: ${lluvia.tasaMaxima} meteoros/hora. Radiante: ${lluvia.radiante}. ${lluvia.descripcion}`,
        significadoAstrologico: `Las ${lluvia.nombre} traen energia de renovacion y deseos.`,
        significadoCabalistico: getInterpretacionCabalistica("lluvia_meteoros", []),
        sefirotRelacionadas: ["Chokmah"],
        importancia: lluvia.tasaMaxima > 50 ? "mayor" : "moderada",
        cuerposInvolucrados: [],
      });
    }
  }

  // Ordenar por fecha y eliminar duplicados
  return eventos
    .filter((e) => e.fecha.getTime() >= date.getTime())
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
}

function parseMeteorDate(mmdd: string, year: number): Date {
  const [month, day] = mmdd.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getSefirotParaCuerpos(nombres: string[]): string[] {
  const sefirot: string[] = [];
  const nombreAId: Record<string, string> = {
    Sol: "sun", Luna: "moon", Mercurio: "mercury",
    Venus: "venus", Marte: "mars", Jupiter: "jupiter", Saturno: "saturn",
  };
  for (const nombre of nombres) {
    const id = nombreAId[nombre];
    if (id) {
      const sef = getSefirahParaPlaneta(id);
      if (sef) sefirot.push(sef.nombre);
    }
  }
  return sefirot;
}

function getSignificadoAstrologicoFase(tipo: TipoEvento): string {
  const significados: Record<string, string> = {
    luna_nueva: "Momento de nuevos comienzos e intenciones. La energia es introspectiva y fértil para plantar semillas de proyectos futuros.",
    luna_llena: "Culminacion y revelacion. Lo que se inicio en la luna nueva alcanza su plenitud. Emociones intensas e iluminacion.",
    cuarto_creciente: "Momento de accion y decision. La energia crece y es ideal para superar obstaculos y avanzar con determinacion.",
    cuarto_menguante: "Tiempo de soltar y perdonar. La energia decrece naturalmente, facilitando la liberacion de lo que ya no sirve.",
  };
  return significados[tipo] || "";
}

function getSignificadoEstacion(tipo: string): string {
  const significados: Record<string, string> = {
    equinoccio_primavera: "El Sol cruza el ecuador celeste hacia el norte. Dia y noche se igualan. Renacimiento, renovacion y equilibrio perfecto.",
    solsticio_verano: "El dia mas largo del ano. El Sol alcanza su maxima declinacion norte. Plenitud, abundancia y maxima vitalidad.",
    equinoccio_otono: "Dia y noche se equilibran nuevamente. Cosecha, gratitud y preparacion para la introspeccion invernal.",
    solsticio_invierno: "La noche mas larga del ano. El punto de retorno de la luz. Renacimiento en la oscuridad, esperanza renovada.",
  };
  return significados[tipo] || "";
}
