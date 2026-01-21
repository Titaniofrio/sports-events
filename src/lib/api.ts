import { SportEvent } from '@/types';
import { mockEvents } from './mockData';

const API_KEY = process.env.API_SPORTS_KEY || '';
const USE_MOCK = process.env.USE_MOCK_DATA === 'true' || !API_KEY;

export function convertToColombiaTime(date: Date): string {
  return date.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function isEventToday(date: Date): boolean {
  if (!date || !(date instanceof Date)) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate.getTime() === today.getTime();
}

export function isEventInNext7Days(date: Date): boolean {
  if (!date || !(date instanceof Date)) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);
  return eventDate >= today && eventDate <= sevenDaysFromNow;
}

export async function fetchAllEvents(): Promise<SportEvent[]> {
  if (USE_MOCK) {
    console.log('Using mock data for development');
    return mockEvents;
  }
  try {
    console.log('Fetching real events from API-Sports');
    return mockEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return mockEvents;
  }
}

export function getSportIcon(sport: string): string {
  const icons: Record<string, string> = {
    football: '⚽',
    tennis: '🎾',
    formula1: '🏎️',
  };
  return icons[sport] || '🏆';
}
