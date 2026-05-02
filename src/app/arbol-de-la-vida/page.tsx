import { TreeOfLife } from "@/components/kabbalah/TreeOfLife";

export default function ArbolDeLaVidaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-mystical font-bold text-gradient-gold mb-3">
          Arbol de la Vida
        </h1>
        <p className="text-cosmic-muted max-w-2xl mx-auto">
          Las 10 Sefirot y sus correspondencias planetarias segun la tradicion
          cabalistica clasica. Haz click en cada Sefirah para explorar su
          significado y ver la posicion actual de su planeta.
        </p>
      </div>

      <TreeOfLife />

      <div className="mt-8 max-w-2xl mx-auto">
        <div className="glow-card p-4">
          <h3 className="text-sm font-mystical text-gold-400 mb-2">Tradicion Clasica</h3>
          <p className="text-xs text-cosmic-muted leading-relaxed">
            Siguiendo el Sefer Yetzirah y la Cabala clasica, solo los 7 planetas
            visibles a simple vista se asignan a las Sefirot: Saturno (Binah),
            Jupiter (Chesed), Marte (Gevurah), Sol (Tiferet), Venus (Netzach),
            Mercurio (Hod) y Luna (Yesod). Keter y Chokmah trascienden la
            asignacion planetaria, representando el Ein Sof y las estrellas fijas
            respectivamente.
          </p>
        </div>
      </div>
    </div>
  );
}
