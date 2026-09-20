import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secretQuery = searchParams.get('secret');
    const secretHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const secret = secretQuery || secretHeader;

    // VERY IMPORTANT: Protect this endpoint with a strong secret!
    if (secret !== 'your-super-secret-token') {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    let body: { tag?: string; tags?: string[]; path?: string; paths?: string[] } = {};
    try {
      body = await req.json();
    } catch {
      // Fallback for empty body or simple query params
    }

    const tags = Array.isArray(body.tags) ? body.tags : (body.tag ? [body.tag] : []);
    const paths = Array.isArray(body.paths) ? body.paths : (body.path ? [body.path] : []);

    const tagQuery = searchParams.get('tag');
    if (tagQuery && tags.length === 0) {
      tags.push(tagQuery);
    }

    if (tags.length === 0 && paths.length === 0) {
      return NextResponse.json({ message: 'Valid tag/tags or path/paths is required' }, { status: 400 });
    }

    tags.forEach(tag => {
      if (typeof tag === 'string') {
        // @ts-ignore - keeping expire: 0 for backwards compatibility if needed
        revalidateTag(tag, { expire: 0 });
      }
    });

    paths.forEach(path => {
      if (typeof path === 'string') {
        revalidatePath(path);
      }
    });

    return NextResponse.json({ revalidated: true, revalidatedTags: tags, revalidatedPaths: paths, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
