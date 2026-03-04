import { PlanetData } from "@/types";

export const PLANETAS: PlanetData[] = [
  {
    id: "sun",
    nombre: "Sol",
    simbolo: "☉",
    sefirah: "Tiferet",
    color: "#ffd700",
    significadoCabalistico:
      "El Sol es Tiferet, la Belleza y armonia del Arbol de la Vida. Representa el equilibrio perfecto entre misericordia y severidad, el corazon espiritual donde la luz divina se manifiesta con mayor claridad.",
  },
  {
    id: "moon",
    nombre: "Luna",
    simbolo: "☽",
    sefirah: "Yesod",
    color: "#9370db",
    significadoCabalistico:
      "La Luna es Yesod, el Fundamento. Sus ciclos reflejan el flujo constante de energia entre lo celestial y lo terrenal. Como canal entre Tiferet y Malkuth, la Luna gobierna el mundo de los suenos y el subconsciente.",
  },
  {
    id: "mercury",
    nombre: "Mercurio",
    simbolo: "☿",
    sefirah: "Hod",
    color: "#ff8c00",
    significadoCabalistico:
      "Mercurio es Hod, el Esplendor del intelecto. Como mensajero divino, facilita la comunicacion entre los mundos superiores e inferiores. Gobierna el pensamiento analitico y la articulacion de la sabiduria.",
  },
  {
    id: "venus",
    nombre: "Venus",
    simbolo: "♀",
    sefirah: "Netzach",
    color: "#228b22",
    significadoCabalistico:
      "Venus es Netzach, la Victoria y la eternidad del sentimiento. Representa la fuerza de atraccion divina, el deseo que impulsa toda la creacion. Es la contraparte emocional del intelecto de Hod.",
  },
  {
    id: "mars",
    nombre: "Marte",
    simbolo: "♂",
    sefirah: "Gevurah",
    color: "#dc143c",
    significadoCabalistico:
      "Marte es Gevurah, la Severidad y fuerza del juicio divino. Como el artista marcial que solo golpea en el momento preciso, Gevurah representa la disciplina y los limites necesarios para que la creacion tenga forma.",
  },
  {
    id: "jupiter",
    nombre: "Jupiter",
    simbolo: "♃",
    sefirah: "Chesed",
    color: "#4169e1",
    significadoCabalistico:
      "Jupiter es Chesed, la Misericordia y bondad expansiva. Es la fuerza que da sin limites, la generosidad del creador. Equilibra la restriccion de Gevurah con abundancia y benevolencia.",
  },
  {
    id: "saturn",
    nombre: "Saturno",
    simbolo: "♄",
    sefirah: "Binah",
    color: "#2a2a3e",
    significadoCabalistico:
      "Saturno es Binah, el Entendimiento profundo. Como el planeta del tiempo y la estructura, Binah da forma a la energia ilimitada de Chokmah. Representa la madre cosmica que recibe la semilla de sabiduria y la gestiona en formas definidas.",
  },
];

export function getPlanetaPorId(id: string): PlanetData | undefined {
  return PLANETAS.find((p) => p.id === id);
}
