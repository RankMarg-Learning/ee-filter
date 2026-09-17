import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const tag = searchParams.get('tag');

    // VERY IMPORTANT: Protect this endpoint with a strong secret!
    // In production, compare this against process.env.REVALIDATE_SECRET
    if (secret !== 'your-super-secret-token') {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (!tag) {
      return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    revalidateTag(tag, { expire: 0 });
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
