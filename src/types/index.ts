export interface PlanetData {
  id: string;
  nombre: string;
  simbolo: string;
  sefirah: string | null;
  color: string;
  significadoCabalistico: string;
}

export interface PlanetPosition {
  planetId: string;
  nombre: string;
  simbolo: string;
  longitudEcliptica: number;
  signoZodiacal: SignoZodiacal;
  gradoEnSigno: number;
  esRetrogrado: boolean;
  distanciaUA: number;
}

export type SignoZodiacal =
  | "Aries" | "Tauro" | "Geminis" | "Cancer"
  | "Leo" | "Virgo" | "Libra" | "Escorpio"
  | "Sagitario" | "Capricornio" | "Acuario" | "Piscis";

export interface SignoData {
  nombre: SignoZodiacal;
  simbolo: string;
  elemento: "Fuego" | "Tierra" | "Aire" | "Agua";
  modalidad: "Cardinal" | "Fijo" | "Mutable";
  planetaRegente: string;
  gradoInicio: number;
  gradoFin: number;
  letraHebrea: string;
  nombreLetra: string;
  color: string;
}

export interface SefirahData {
  nombre: string;
  nombreHebreo: string;
  traduccion: string;
  planeta: string | null;
  planetaId: string | null;
  color: string;
  arcangel: string;
  nombreDivino: string;
  cualidades: string[];
  descripcion: string;
  posX: number;
  posY: number;
}

export interface CaminoArbol {
  desde: string;
  hasta: string;
  letraHebrea: string;
  nombreLetra: string;
}

export type TipoEvento =
  | "eclipse_lunar" | "eclipse_solar"
  | "luna_nueva" | "luna_llena" | "cuarto_creciente" | "cuarto_menguante"
  | "conjuncion" | "oposicion"
  | "retrogrado_inicio" | "retrogrado_fin"
  | "lluvia_meteoros"
  | "equinoccio_primavera" | "solsticio_verano" | "equinoccio_otono" | "solsticio_invierno";

export interface EventoCeleste {
  id: string;
  tipo: TipoEvento;
  titulo: string;
  fecha: Date;
  fechaFin?: Date;
  descripcion: string;
  significadoAstrologico: string;
  significadoCabalistico: string;
  sefirotRelacionadas: string[];
  importancia: "menor" | "moderada" | "mayor" | "rara";
  cuerposInvolucrados: string[];
}

export interface FaseLunar {
  fase: number;
  nombreFase: string;
  iluminacion: number;
  emoji: string;
  proximaLunaLlena: Date;
  proximaLunaNueva: Date;
}

export interface FechaHebrea {
  fechaHebrea: string;
  mes: string;
  anio: number;
  festividad: string | null;
}

export interface LluviaMeteoros {
  nombre: string;
  pico: string;
  actividadInicio: string;
  actividadFin: string;
  tasaMaxima: number;
  radiante: string;
  descripcion: string;
}
