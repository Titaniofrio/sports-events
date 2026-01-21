import { kv } from '@vercel/kv';
import { SportEvent, CacheData } from '@/types';

const CACHE_KEY = 'sports-events-cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function getCachedEvents(): Promise<SportEvent[] | null> {
  try {
    const cached = await kv.get<CacheData>(CACHE_KEY);

    if (!cached) return null;

    // Check if cache is still fresh
    const now = Date.now();
    if (now - cached.lastUpdate > cached.ttl) {
      // Cache expired
      await kv.del(CACHE_KEY);
      return null;
    }

    return cached.events;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setCachedEvents(events: SportEvent[]): Promise<void> {
  try {
    const cacheData: CacheData = {
      events,
      lastUpdate: Date.now(),
      ttl: CACHE_TTL,
    };

    // Set with 25 hour expiration (slightly longer than our 24h TTL)
    await kv.setex(CACHE_KEY, 25 * 60 * 60, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function clearCache(): Promise<void> {
  try {
    await kv.del(CACHE_KEY);
  } catch (error) {
    console.error('Cache clear error:', error);
  }
}

export async function isCacheFresh(): Promise<boolean> {
  try {
    const cached = await kv.get<CacheData>(CACHE_KEY);

    if (!cached) return false;

    const now = Date.now();
    return now - cached.lastUpdate < cached.ttl;
  } catch (error) {
    console.error('Cache freshness check error:', error);
    return false;
  }
}
