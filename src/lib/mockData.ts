import { SportEvent } from '@/types';

export const mockEvents: SportEvent[] = [
  // Football - Today
  {
    id: 'football-1',
    sport: 'football',
    date: new Date(new Date().toDateString()),
    time: '15:30',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    status: 'upcoming',
    tournament: 'Premier League',
  },
  {
    id: 'football-2',
    sport: 'football',
    date: new Date(new Date().toDateString()),
    time: '18:00',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    status: 'upcoming',
    tournament: 'La Liga',
  },
  {
    id: 'football-3',
    sport: 'football',
    date: new Date(new Date().toDateString()),
    time: '19:45',
    homeTeam: 'Chelsea',
    awayTeam: 'Bayern Munich',
    league: 'Champions League',
    status: 'upcoming',
    tournament: 'UEFA Champions League',
  },

  // Football - Tomorrow
  {
    id: 'football-4',
    sport: 'football',
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    time: '16:00',
    homeTeam: 'PSG',
    awayTeam: 'AC Milan',
    league: 'Champions League',
    status: 'upcoming',
    tournament: 'UEFA Champions League',
  },
  {
    id: 'football-5',
    sport: 'football',
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    time: '20:00',
    homeTeam: 'Manchester United',
    awayTeam: 'Arsenal',
    league: 'Premier League',
    status: 'upcoming',
    tournament: 'Premier League',
  },

  // Football - 3 days
  {
    id: 'football-6',
    sport: 'football',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    time: '14:00',
    homeTeam: 'Barcelona',
    awayTeam: 'Sevilla',
    league: 'La Liga',
    status: 'upcoming',
    tournament: 'La Liga',
  },
  {
    id: 'football-7',
    sport: 'football',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    time: '17:30',
    homeTeam: 'Inter Miami',
    awayTeam: 'LA Galaxy',
    league: 'Europa League',
    status: 'upcoming',
    tournament: 'UEFA Europa League',
  },

  // Football - 5 days (World Cup 2026)
  {
    id: 'football-8',
    sport: 'football',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    time: '18:00',
    homeTeam: 'Colombia',
    awayTeam: 'Argentina',
    league: 'World Cup 2026',
    status: 'upcoming',
    tournament: 'FIFA World Cup 2026',
  },

  // Tennis - Today
  {
    id: 'tennis-1',
    sport: 'tennis',
    date: new Date(new Date().toDateString()),
    time: '10:00',
    tournament: 'Australian Open - Round 2',
    league: 'Grand Slam',
    status: 'upcoming',
  },

  // Tennis - Tomorrow
  {
    id: 'tennis-2',
    sport: 'tennis',
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    time: '12:00',
    tournament: 'Australian Open - Round 3',
    league: 'Grand Slam',
    status: 'upcoming',
  },

  // Tennis - 4 days
  {
    id: 'tennis-3',
    sport: 'tennis',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
    time: '14:00',
    tournament: 'ATP 500 Dubai',
    league: 'ATP Tour',
    status: 'upcoming',
  },

  // Formula 1 - 6 days
  {
    id: 'f1-1',
    sport: 'formula1',
    date: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000),
    time: '08:00',
    tournament: 'Australian Grand Prix - FP1',
    league: 'Formula 1',
    status: 'upcoming',
  },

  // Formula 1 - 7 days
  {
    id: 'f1-2',
    sport: 'formula1',
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    time: '09:00',
    tournament: 'Australian Grand Prix - Carrera',
    league: 'Formula 1',
    status: 'upcoming',
  },
];
