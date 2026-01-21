import { NextRequest, NextResponse } from 'next/server';
import { fetchAllEvents } from '@/lib/api';
import { setCachedEvents } from '@/lib/cache';

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (CRON_SECRET) {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    console.log('Cron job started at', new Date().toISOString());

    const events = await fetchAllEvents();
    await setCachedEvents(events);

    console.log('Cache refreshed with', events.length, 'events');

    return NextResponse.json({
      success: true,
      message: 'Cache refreshed successfully',
      eventCount: events.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
