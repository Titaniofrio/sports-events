export interface SportEvent {
  id: string;
  sport: 'football' | 'tennis' | 'formula1';
  homeTeam: string;
  awayTeam: string;
  date: Date;
  time: string;
  league: string;
  status: 'scheduled' | 'live' | 'finished';
}

export interface CacheData {
  events: SportEvent[];
  timestamp: number;
}

export interface ApiResponse {
  data: SportEvent[];
  success: boolean;
  message?: string;
}
