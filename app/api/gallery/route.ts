import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let gallery = await DataService.getGallery();
    if (category && category !== 'all') {
      gallery = gallery.filter((g) => g.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ success: true, count: gallery.length, data: gallery });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.image_url) {
      return NextResponse.json({ success: false, error: 'Title and image_url are required' }, { status: 400 });
    }
    const item = await DataService.saveGalleryItem({
      id: body.id || `gal-${Date.now()}`,
      title: body.title,
      category: body.category || 'Client Deployments',
      image_url: body.image_url,
      description: body.description || '',
      location: body.location || 'Suri, Birbhum',
      is_featured: body.is_featured !== undefined ? body.is_featured : false,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
