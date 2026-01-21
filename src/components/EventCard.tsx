import { SportEvent } from '@/types';
import { isEventToday, getSportIcon } from '@/lib/api';

interface EventCardProps {
  event: SportEvent;
}

export function EventCard({ event }: EventCardProps) {
  const icon = getSportIcon(event.sport);
  const isToday = isEventToday(event.date);
  const timeStr = event.date.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {isToday && (
          <span className="bg-red-500/20 text-red-200 text-xs font-semibold px-2 py-1 rounded">
            HOY
          </span>
        )}
        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
          {event.status === 'scheduled' ? 'Por Jugar' : event.status === 'live' ? 'EN VIVO' : 'Finalizado'}
        </span>
      </div>

      <h3 className="font-bold text-slate-100 mb-1">{event.league}</h3>

      <div className="space-y-1 mb-3">
        <p className="text-slate-300 font-semibold">{event.homeTeam}</p>
        <p className="text-slate-400 text-sm flex items-center gap-2">
          <span>vs</span>
          <span className="text-slate-300 font-semibold">{event.awayTeam}</span>
        </p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-blue-400 font-semibold">{timeStr}</span>
        <span className="text-slate-500 text-xs">
          {event.date.toLocaleDateString('es-CO', { timeZone: 'America/Bogota' })}
        </span>
      </div>
    </div>
  );
}
