import { CurrentSkyOverview } from "@/components/dashboard/CurrentSkyOverview";
import { MoonPhaseWidget } from "@/components/dashboard/MoonPhaseWidget";
import { ActiveEventsCard } from "@/components/dashboard/ActiveEventsCard";
import { UpcomingEventsCard } from "@/components/dashboard/UpcomingEventsCard";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-mystical font-bold text-gradient-gold mb-3">
          Observatorio Celestial
        </h1>
        <p className="text-cosmic-muted max-w-2xl mx-auto">
          Eventos astronomicos y astrologicos en tiempo real, con la sabiduria
          del Arbol de la Vida y la tradicion cabalistica clasica.
        </p>
      </div>

      <div className="space-y-6">
        <CurrentSkyOverview />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MoonPhaseWidget />
          <UpcomingEventsCard />
          <ActiveEventsCard />
        </div>
      </div>
    </div>
  );
}
