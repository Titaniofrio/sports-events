import { SportEvent } from '@/types';

const CACHE_KEY = 'sports-events-cache';
const CACHE_TTL = 24 * 60 * 60;

export async function getCachedEvents(): Promise<SportEvent[] | null> {
  try {
    if (!process.env.KV_REST_API_URL) {
      console.warn('KV cache not configured, skipping cache read');
      return null;
    }
    const { kv } = await import('@vercel/kv');
    const cached = await kv.get(CACHE_KEY);
    if (cached && typeof cached === 'object' && 'events' in cached) {
      const cacheData = cached as any;
      return cacheData.events.map((event: any) => ({
        ...event,
        date: new Date(event.date),
      }));
    }
    return null;
  } catch (error) {
    console.warn('Cache read error:', error);
    return null;
  }
}

export async function setCachedEvents(events: SportEvent[]): Promise<void> {
  try {
    if (!process.env.KV_REST_API_URL) {
      console.warn('KV cache not configured, skipping cache write');
      return;
    }
    const { kv } = await import('@vercel/kv');
    const cacheData = {
      events: events.map(event => ({
        ...event,
        date: event.date.toISOString(),
      })),
      timestamp: Date.now(),
    };
    await kv.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(cacheData));
    console.log('Cache updated successfully');
  } catch (error) {
    console.warn('Cache write error:', error);
  }
}

export async function clearCache(): Promise<void> {
  try {
    if (!process.env.KV_REST_API_URL) return;
    const { kv } = await import('@vercel/kv');
    await kv.del(CACHE_KEY);
    console.log('Cache cleared');
  } catch (error) {
    console.warn('Cache clear error:', error);
  }
}
