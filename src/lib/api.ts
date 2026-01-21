import { SportEvent } from '@/types';

const API_KEY = process.env.API_SPORTS_KEY;
const BASE_URL = 'https://api.api-sports.io';

// Colombia timezone offset: UTC-5
const COLOMBIA_OFFSET = -5 * 60; // -300 minutes

export function convertToColombiaTime(utcDate: Date): string {
  const localDate = new Date(utcDate.getTime() + COLOMBIA_OFFSET * 60 * 1000);
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function isEventToday(eventDate: Date): boolean {
  const today = new Date();
  return eventDate.toDateString() === today.toDateString();
}

export function isEventInNext7Days(eventDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const future = new Date(today);
  future.setDate(future.getDate() + 7);

  return eventDate >= today && eventDate <= future;
}

// Football API: Premier League (39), La Liga (140), Liga Argentina (128), 
// Champions League (2), Europa League (3), World Cup 2026 (1)
export async function fetchFootballEvents(): Promise<SportEvent[]> {
  const leagueIds = [39, 140, 128, 2, 3, 1];
  const events: SportEvent[] = [];

  try {
    for (const leagueId of leagueIds) {
      // Use season 2026 for World Cup, 2025 for others
      const season = leagueId === 1 ? 2026 : 2025;
      const response = await fetch(
        `${BASE_URL}/football/fixtures?league=${leagueId}&season=${season}&status=NS&timezone=America/Bogota`,
        {
          headers: {
            'x-apisports-key': API_KEY || '',
          },
        }
      );

      if (!response.ok) continue;

      const data = await response.json();

      if (data.response && Array.isArray(data.response)) {
        data.response.slice(0, 15).forEach((fixture: any) => {
          const eventDate = new Date(fixture.fixture.date);

          if (isEventInNext7Days(eventDate)) {
            events.push({
              id: `football-${fixture.fixture.id}`,
              sport: 'football',
              date: eventDate,
              time: convertToColombiaTime(eventDate),
              homeTeam: fixture.teams.home.name,
              awayTeam: fixture.teams.away.name,
              league: fixture.league.name,
              status: 'upcoming',
              tournament: fixture.league.name,
            });
          }
        });
      }
    }
  } catch (error) {
    console.error('Football API error:', error);
  }

  return events;
}

// Tennis API: ATP, WTA, Grand Slams
export async function fetchTennisEvents(): Promise<SportEvent[]> {
  const events: SportEvent[] = [];

  try {
    const response = await fetch(
      `${BASE_URL}/tennis/events?timezone=America/Bogota&season=2025`,
      {
        headers: {
          'x-apisports-key': API_KEY || '',
        },
      }
    );

    if (!response.ok) return events;

    const data = await response.json();

    if (data.response && Array.isArray(data.response)) {
      data.response.slice(0, 10).forEach((event: any) => {
        const eventDate = new Date(event.start_date);

        if (isEventInNext7Days(eventDate)) {
          events.push({
            id: `tennis-${event.id}`,
            sport: 'tennis',
            date: eventDate,
            time: convertToColombiaTime(eventDate),
            tournament: event.name,
            league: event.type || 'Professional',
            status: 'upcoming',
          });
        }
      });
    }
  } catch (error) {
    console.error('Tennis API error:', error);
  }

  return events;
}

// Formula 1 API
export async function fetchFormula1Events(): Promise<SportEvent[]> {
  const events: SportEvent[] = [];

  try {
    const response = await fetch(
      `${BASE_URL}/formula1/races?season=2025&timezone=America/Bogota`,
      {
        headers: {
          'x-apisports-key': API_KEY || '',
        },
      }
    );

    if (!response.ok) return events;

    const data = await response.json();

    if (data.response && Array.isArray(data.response)) {
      data.response.slice(0, 10).forEach((race: any) => {
        const eventDate = new Date(race.date);

        if (isEventInNext7Days(eventDate)) {
          events.push({
            id: `f1-${race.id}`,
            sport: 'formula1',
            date: eventDate,
            time: convertToColombiaTime(eventDate),
            tournament: race.name,
            league: 'Formula 1',
            status: 'upcoming',
          });
        }
      });
    }
  } catch (error) {
    console.error('Formula1 API error:', error);
  }

  return events;
}

export async function fetchAllEvents(): Promise<SportEvent[]> {
  const [footballEvents, tennisEvents, f1Events] = await Promise.all([
    fetchFootballEvents(),
    fetchTennisEvents(),
    fetchFormula1Events(),
  ]);

  const allEvents = [...footballEvents, ...tennisEvents, ...f1Events];
  return allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
}
