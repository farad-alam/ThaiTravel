import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { revalidatePath } from 'next/cache';
import { serverEnv } from '@/env/serverEnv';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: { current: string } }>(
      req,
      serverEnv.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Revalidate the homepage for any post change
    if (body._type === 'post') {
      revalidatePath('/');
      revalidatePath('/sitemap.xml'); // Update sitemap
      console.log('Revalidated homepage and sitemap due to post change');
      
      // Also revalidate the specific post page if slug exists
      if (body.slug?.current) {
         revalidatePath(`/blog/${body.slug.current}`);
         console.log(`Revalidated post: ${body.slug.current}`);
      }
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 500 });
  }
}
