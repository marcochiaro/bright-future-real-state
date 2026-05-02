import { PlanetPosition, TipoEvento } from "@/types";
import { SEFIROT } from "@/data/sefirot";
import { PLANETAS } from "@/data/planets";

export function getSefirahParaPlaneta(planetaId: string) {
  const planeta = PLANETAS.find((p) => p.id === planetaId);
  if (!planeta || !planeta.sefirah) return null;
  return SEFIROT.find((s) => s.nombre === planeta.sefirah) || null;
}

export function getEnergiasSefirotActivas(posiciones: PlanetPosition[]) {
  return posiciones.map((pos) => {
    const sefirah = getSefirahParaPlaneta(pos.planetId);
    if (!sefirah) return null;

    let intensidad = "normal";
    if (pos.esRetrogrado) intensidad = "retrogrado";
    // Planetas en signos de su domicilio tienen mas fuerza
    const planeta = PLANETAS.find((p) => p.id === pos.planetId);
    if (planeta) {
      const domicilios: Record<string, string[]> = {
        sun: ["Leo"],
        moon: ["Cancer"],
        mercury: ["Geminis", "Virgo"],
        venus: ["Tauro", "Libra"],
        mars: ["Aries", "Escorpio"],
        jupiter: ["Sagitario", "Piscis"],
        saturn: ["Capricornio", "Acuario"],
      };
      if (domicilios[pos.planetId]?.includes(pos.signoZodiacal)) {
        intensidad = "domicilio";
      }
    }

    return {
      sefirah,
      planeta: pos,
      intensidad,
      descripcion: getDescripcionEnergia(sefirah.nombre, pos, intensidad),
    };
  }).filter(Boolean);
}

function getDescripcionEnergia(
  sefirahNombre: string,
  pos: PlanetPosition,
  intensidad: string
): string {
  if (intensidad === "retrogrado") {
    return `${pos.nombre} retrogrado en ${pos.signoZodiacal}: La energia de ${sefirahNombre} se vuelve introspectiva. Es momento de revision interna en el ambito de ${sefirahNombre.toLowerCase()}.`;
  }
  if (intensidad === "domicilio") {
    return `${pos.nombre} en domicilio (${pos.signoZodiacal}): La energia de ${sefirahNombre} fluye con maxima potencia y claridad. Momento favorable para manifestar sus cualidades.`;
  }
  return `${pos.nombre} en ${pos.signoZodiacal}: ${sefirahNombre} expresa su energia a traves de las cualidades de ${pos.signoZodiacal}.`;
}

export function getInterpretacionCabalistica(tipo: TipoEvento, cuerpos: string[]): string {
  const interpretaciones: Record<string, string> = {
    luna_nueva:
      "Luna nueva: Yesod se renueva. Es un momento de siembra espiritual, cuando el canal entre lo celestial y lo terrenal se reinicia. Ideal para establecer nuevas intenciones y conectar con el mundo interior.",
    luna_llena:
      "Luna llena: Yesod brilla con maxima intensidad, iluminando el camino entre Tiferet y Malkuth. Las energias espirituales se manifiestan con claridad en el mundo fisico. Momento de cosecha y revelacion.",
    cuarto_creciente:
      "Cuarto creciente: Yesod crece en fuerza. La energia del fundamento se expande, impulsando proyectos y crecimiento. El canal se abre gradualmente.",
    cuarto_menguante:
      "Cuarto menguante: Yesod se recoge. Es tiempo de soltar, liberar y preparar el espacio para el nuevo ciclo. La sabiduria se encuentra en el silencio.",
    eclipse_lunar:
      "Eclipse lunar: Una interrupcion momentanea en el flujo de Yesod. El canal entre lo celestial y lo terrenal se oscurece brevemente, revelando verdades ocultas. Eventos karmicos se activan.",
    eclipse_solar:
      "Eclipse solar: Tiferet, el corazon del Arbol, se oculta momentaneamente. Un reinicio profundo de la armonia central. Transformaciones significativas se inician en el nivel mas profundo del ser.",
    conjuncion:
      `Conjuncion de ${cuerpos.join(" y ")}: Las Sefirot correspondientes fusionan sus energias, creando un punto de poder donde las fuerzas divinas se amplifican mutuamente.`,
    oposicion:
      `Oposicion de ${cuerpos.join(" y ")}: Las Sefirot correspondientes se polarizan, creando una tension que invita al equilibrio. Como los pilares del Arbol de la Vida, la armonia surge de la integracion de opuestos.`,
    retrogrado_inicio:
      `${cuerpos[0] || "Planeta"} inicia retrogrado: La Sefirah correspondiente invierte su flujo de energia. Es tiempo de revision interna, no de avance externo. La sabiduria se encuentra mirando hacia atras.`,
    retrogrado_fin:
      `${cuerpos[0] || "Planeta"} finaliza retrogrado: La Sefirah correspondiente reanuda su flujo directo. Las lecciones aprendidas durante la introspeccion ahora pueden aplicarse con claridad renovada.`,
    equinoccio_primavera:
      "Equinoccio de primavera: El equilibrio entre luz y oscuridad refleja Tiferet en su maxima armonia. Es Rosh Hashana de los arboles interiores. Nuevo comienzo espiritual.",
    solsticio_verano:
      "Solsticio de verano: Tiferet brilla con su mayor intensidad. La luz domina, y la energia de Chesed (misericordia) se expande. Momento de maxima manifestacion espiritual.",
    equinoccio_otono:
      "Equinoccio de otono: Nuevo equilibrio. Gevurah (severidad) y Chesed (misericordia) se equilibran. Tiempo de juicio interno y balance, resonando con las fiestas de Tishrei.",
    solsticio_invierno:
      "Solsticio de invierno: La oscuridad maxima precede el retorno de la luz. Binah (entendimiento) domina, invitando a la profunda contemplacion. La semilla de la luz se planta en la oscuridad mas profunda.",
    lluvia_meteoros:
      "Lluvia de meteoros: Chispas de luz divina descienden desde Chokmah hacia Malkuth, como las chispas de santidad (nitzotzot) que la Cabala describe cayendo para elevar el mundo material.",
  };

  return interpretaciones[tipo] || "Un evento celestial que resuena en el Arbol de la Vida.";
}
