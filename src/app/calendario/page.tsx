import { MonthCalendar } from "@/components/calendar/MonthCalendar";

export default function CalendarioPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-mystical font-bold text-gradient-gold mb-3">
          Calendario Celestial
        </h1>
        <p className="text-cosmic-muted">
          Calendario con fases lunares, eventos astronomicos, fechas hebreas y
          festividades. Haz click en un dia para ver su informacion.
        </p>
      </div>

      <MonthCalendar />
    </div>
  );
}
