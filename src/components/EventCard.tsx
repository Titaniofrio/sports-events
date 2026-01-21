'use client';

import { SportEvent } from '@/types';
import { isEventToday } from '@/lib/api';

export function EventCard({ event }: { event: SportEvent }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'football':
        return '⚽';
      case 'tennis':
        return '🎾';
      case 'formula1':
        return '🏎️';
      default:
        return '🏆';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full animate-pulse">
            EN VIVO
          </span>
        );
      case 'finished':
        return (
          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
            FINALIZADO
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            PRÓXIMO
          </span>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4 hover:border-slate-600 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getSportIcon(event.sport)}</span>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              {event.tournament || event.league}
            </p>
            <p className="text-sm font-semibold text-white">{event.league}</p>
          </div>
        </div>
        {getStatusBadge(event.status)}
      </div>

      <div className="space-y-2 mb-3">
        {event.homeTeam && event.awayTeam ? (
          <>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{event.homeTeam}</p>
            </div>
            <div className="text-center text-lg font-bold text-yellow-400">VS</div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{event.awayTeam}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-white font-medium text-center">
            {event.tournament}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-300 pt-3 border-t border-slate-700">
        <span>{formatDate(event.date)}</span>
        <span className="text-sm font-semibold text-blue-400">{event.time}</span>
      </div>

      {isEventToday(event.date) && (
        <div className="mt-2 text-xs text-center text-amber-400 font-semibold">
          🔥 HOY
        </div>
      )}
    </div>
  );
}
