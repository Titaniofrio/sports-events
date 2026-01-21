'use client';

import { useState, useEffect } from 'react';
import { SportEvent } from '@/types';
import { EventsList } from './EventsList';

type FilterType = 'all' | 'football' | 'tennis' | 'formula1';

const FILTERS: { label: string; value: FilterType; icon: string }[] = [
  { label: 'Todos', value: 'all', icon: '🏆' },
  { label: 'Fútbol', value: 'football', icon: '⚽' },
  { label: 'Tenis', value: 'tennis', icon: '🎾' },
  { label: 'F1', value: 'formula1', icon: '🏎️' },
];

export function EventsContainer() {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
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
        setEvents(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Error al cargar los eventos. Intenta más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === f.value
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <span>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      {events.length > 0 ? (
        <EventsList events={events} filter={filter} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No hay eventos disponibles en los próximos 7 días
          </p>
        </div>
      )}

      {/* Cache Info */}
      <div className="text-xs text-gray-500 text-center pt-4 border-t border-slate-700">
        <p>Datos actualizados cada 24 horas • Última actualización: {new Date().toLocaleTimeString('es-CO')}</p>
      </div>
    </div>
  );
}
