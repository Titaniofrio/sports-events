import { NextRequest, NextResponse } from 'next/server';
import { fetchAllEvents } from '@/lib/api';
import { getCachedEvents, setCachedEvents } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    let events = await getCachedEvents().catch(() => null);
    if (!events) {
      console.log('Cache miss, fetching from APIs...');
      events = await fetchAllEvents();
      await setCachedEvents(events).catch((err) => {
        console.error('Cache set error:', err.message);
      });
    }

    const serializedEvents = events.map(event => ({
      ...event,
      date: event.date instanceof Date ? event.date.toISOString() : event.date,
    }));

    return NextResponse.json({
      success: true,
      data: serializedEvents,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch events',
        data: [],
      },
      { status: 500 }
    );
  }
}
