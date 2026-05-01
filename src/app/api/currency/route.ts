import { NextResponse } from 'next/server';
import { getUAHExchangeRates } from '@/lib/uahRates';

export async function GET() {
  try {
    const rates = await getUAHExchangeRates();
    return NextResponse.json(rates);
  } catch (error) {
    console.error('Error in currency API route:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// Disable caching to always fetch fresh data
export const revalidate = 0;
export const dynamic = 'force-dynamic';
