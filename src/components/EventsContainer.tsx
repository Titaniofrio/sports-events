'use client';

import { useState, useEffect } from 'react';
import { SportEvent } from '@/types';
import { EventsList } from './EventsList';
import { isEventToday, isEventInNext7Days } from '@/lib/api';

type FilterType = 'all' | 'football' | 'tennis' | 'formula1';
type ViewType = 'today' | 'next7days';

const FILTERS: { label: string; value: FilterType; icon: string }[] = [
  { label: 'Todos', value: 'all', icon: '🏆' },
  { label: 'Fútbol', value: 'football', icon: '⚽' },
  { label: 'Tenis', value: 'tennis', icon: '🎾' },
  { label: 'F1', value: 'formula1', icon: '🏎️' },
];

const VIEWS: { label: string; value: ViewType }[] = [
  { label: 'Hoy', value: 'today' },
  { label: 'Próximos 7 Días', value: 'next7days' },
];

export function EventsContainer() {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [view, setView] = useState<ViewType>('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const parsedEvents = data.data.map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }));
        setEvents(parsedEvents);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesFilter = filter === 'all' || event.sport === filter;
    const matchesView =
      view === 'today'
        ? isEventToday(event.date)
        : isEventInNext7Days(event.date);
    return matchesFilter && matchesView;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin h-12 w-12 border-4 border-slate-700 border-t-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
        <p>Error al cargar eventos: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.value}
            onClick={() => setView(v.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              view === v.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-400">No hay eventos para esta categoría y período</p>
        </div>
      ) : (
        <EventsList
          events={filteredEvents}
          title={view === 'today' ? 'Eventos de Hoy' : 'Próximos 7 Días'}
        />
      )}

      <div className="text-sm text-slate-400 border-t border-slate-700 pt-4">
        <p>Total de eventos: {filteredEvents.length}</p>
      </div>
    </div>
  );
}
