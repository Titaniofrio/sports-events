import { NextRequest, NextResponse } from 'next/server';
import { fetchAllEvents } from '@/lib/api';
import { setCachedEvents } from '@/lib/cache';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Verify this is called by Vercel Cron or authorized request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Cron job triggered at', new Date().toISOString());

    // Fetch fresh events from all APIs
    const events = await fetchAllEvents();

    // Update cache
    await setCachedEvents(events);

    console.log(`Cache updated with ${events.length} events`);

    return NextResponse.json({
      success: true,
      message: `Cache refreshed with ${events.length} events`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Cron job failed',
      },
      { status: 500 }
    );
  }
}

// Allow manual GET for testing
export async function GET(request: NextRequest) {
  return POST(request);
}
