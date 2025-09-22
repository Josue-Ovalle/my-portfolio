import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ message: 'Error reporting disabled in development' }, { status: 200 });
  }

  try {
    const errorData = await request.json();
    
    // Log to your preferred service (e.g., Sentry, LogRocket, etc.)
    console.error('Client Error:', {
      ...errorData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json({ message: 'Error logged' }, { status: 200 });
  } catch (error) {
    console.error('Failed to log client error:', error);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}