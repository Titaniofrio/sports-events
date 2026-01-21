import { SportEvent } from '@/types';
import { EventCard } from './EventCard';

interface EventsListProps {
  events: SportEvent[];
  title: string;
}

export function EventsList({ events, title }: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">No hay eventos disponibles en esta categoría</p>
      </div>
    );
  }

  const groupedByDate = events.reduce((acc, event) => {
    const dateKey = event.date.toLocaleDateString('es-CO', { timeZone: 'America/Bogota' });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, SportEvent[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
      {Object.entries(groupedByDate).map(([dateStr, dateEvents]) => (
        <div key={dateStr} className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-400 border-b border-slate-700 pb-2">
            {dateStr}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dateEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
