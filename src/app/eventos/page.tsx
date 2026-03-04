import { EventTimeline } from "@/components/events/EventTimeline";

export default function EventosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-mystical font-bold text-gradient-gold mb-3">
          Eventos Celestiales
        </h1>
        <p className="text-cosmic-muted">
          Timeline de los proximos eventos astronomicos con su significado
          astrologico y cabalistico.
        </p>
      </div>

      <EventTimeline />
    </div>
  );
}
