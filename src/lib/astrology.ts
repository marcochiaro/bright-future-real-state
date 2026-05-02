import { PlanetPosition } from "@/types";

export interface Aspecto {
  planeta1: string;
  planeta2: string;
  tipo: string;
  angulo: number;
  orbe: number;
  descripcion: string;
}

const ASPECTOS_DEFINIDOS = [
  { nombre: "Conjuncion", angulo: 0, orbe: 8, simbolo: "☌" },
  { nombre: "Sextil", angulo: 60, orbe: 6, simbolo: "⚹" },
  { nombre: "Cuadratura", angulo: 90, orbe: 8, simbolo: "□" },
  { nombre: "Trigono", angulo: 120, orbe: 8, simbolo: "△" },
  { nombre: "Oposicion", angulo: 180, orbe: 8, simbolo: "☍" },
];

export function calcularAspectos(posiciones: PlanetPosition[]): Aspecto[] {
  const aspectos: Aspecto[] = [];

  for (let i = 0; i < posiciones.length; i++) {
    for (let j = i + 1; j < posiciones.length; j++) {
      const p1 = posiciones[i];
      const p2 = posiciones[j];
      let diff = Math.abs(p1.longitudEcliptica - p2.longitudEcliptica);
      if (diff > 180) diff = 360 - diff;

      for (const aspDef of ASPECTOS_DEFINIDOS) {
        const orbe = Math.abs(diff - aspDef.angulo);
        if (orbe <= aspDef.orbe) {
          aspectos.push({
            planeta1: p1.nombre,
            planeta2: p2.nombre,
            tipo: aspDef.nombre,
            angulo: aspDef.angulo,
            orbe,
            descripcion: getDescripcionAspecto(p1.nombre, p2.nombre, aspDef.nombre),
          });
          break;
        }
      }
    }
  }

  return aspectos;
}

function getDescripcionAspecto(p1: string, p2: string, tipo: string): string {
  const descripciones: Record<string, string> = {
    Conjuncion: `${p1} y ${p2} se unen en conjuncion, fusionando sus energias en una sola fuerza potente.`,
    Sextil: `${p1} y ${p2} forman un sextil armonioso, creando oportunidades de crecimiento y colaboracion.`,
    Cuadratura: `${p1} y ${p2} estan en cuadratura, generando tension creativa que impulsa la transformacion.`,
    Trigono: `${p1} y ${p2} fluyen en trigono, facilitando la expresion natural y armoniosa de sus cualidades.`,
    Oposicion: `${p1} y ${p2} se oponen, invitando a encontrar equilibrio entre polaridades complementarias.`,
  };
  return descripciones[tipo] || "";
}

export function getInterpretacionRetrogrado(planeta: string): string {
  const interpretaciones: Record<string, string> = {
    Mercurio:
      "Mercurio retrogrado invita a la reflexion y revision. La comunicacion requiere mayor atencion. Es momento de revisar proyectos pendientes, no de iniciar nuevos.",
    Venus:
      "Venus retrogrado es tiempo de reevaluar relaciones y valores. Lo que valoramos se cuestiona para encontrar autenticidad en el amor y la belleza.",
    Marte:
      "Marte retrogrado pide cautela en la accion. La energia se dirige hacia adentro, invitando a revisar motivaciones y estrategias antes de avanzar.",
    Jupiter:
      "Jupiter retrogrado es momento de crecimiento interno. La expansion se vuelve hacia el interior, invitando a profundizar en la fe y la filosofia personal.",
    Saturno:
      "Saturno retrogrado revisa estructuras y responsabilidades. Es tiempo de reevaluar compromisos y fortalecer los cimientos internos.",
  };
  return interpretaciones[planeta] || `${planeta} retrogrado invita a la introspeccion en su area de influencia.`;
}
