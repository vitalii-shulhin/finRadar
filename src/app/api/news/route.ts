import { NextResponse } from 'next/server';
import { getNewsDataNews } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '15');

    const news = await getNewsDataNews(limit);

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error in news API route:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// Disable caching to always fetch fresh data
export const revalidate = 0;
export const dynamic = 'force-dynamic';
