'use client';

import { SportEvent } from '@/types';
import { EventCard } from './EventCard';

interface EventsListProps {
  events: SportEvent[];
  filter: 'all' | 'football' | 'tennis' | 'formula1';
}

export function EventsList({ events, filter }: EventsListProps) {
  const filtered =
    filter === 'all' ? events : events.filter((e) => e.sport === filter);

  const groupedByDate = filtered.reduce(
    (acc, event) => {
      const dateKey = new Date(event.date).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, SportEvent[]>
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No hay eventos disponibles para este filtro
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDate).map(([date, dayEvents]) => (
        <div key={date}>
          <h3 className="text-lg font-bold text-white mb-4 capitalize border-l-4 border-blue-500 pl-3">
            {date}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
