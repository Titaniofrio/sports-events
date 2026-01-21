export interface SportEvent {
  id: string;
  sport: 'football' | 'tennis' | 'formula1';
  date: Date;
  time: string; // HH:mm Colombia time
  homeTeam?: string;
  awayTeam?: string;
  league: string;
  status: 'upcoming' | 'live' | 'finished';
  tournament?: string;
  competitors?: Array<{ name: string; id?: string }>;
}

export interface CacheData {
  events: SportEvent[];
  lastUpdate: number; // timestamp
  ttl: number; // 24 hours in ms
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
