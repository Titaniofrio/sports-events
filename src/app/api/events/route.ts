import { NextRequest, NextResponse } from 'next/server';
import { getCachedEvents, setCachedEvents } from '@/lib/cache';
import { fetchAllEvents } from '@/lib/api';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Try to get cached events
    let events = await getCachedEvents();

    // If cache miss, fetch from APIs
    if (!events) {
      console.log('Cache miss, fetching from APIs...');
      events = await fetchAllEvents();

      // Save to cache for next requests
      await setCachedEvents(events);
    } else {
      console.log('Serving from cache');
    }

    return NextResponse.json({
      success: true,
      data: events,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}
