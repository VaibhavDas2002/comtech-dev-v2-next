import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const division = searchParams.get('division');
    const search = searchParams.get('q');

    let services = await DataService.getServices();

    if (category && category !== 'all') {
      services = services.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    if (division && division !== 'all') {
      services = services.filter((s) => s.division === division || s.division === 'both');
    }
    if (search) {
      const q = search.toLowerCase();
      services = services.filter(
        (s) => s.title.toLowerCase().includes(q) || s.short_description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ success: false, error: 'Title and category are required' }, { status: 400 });
    }
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const service = await DataService.saveService({
      id: body.id || `srv-${Date.now()}`,
      title: body.title,
      slug,
      category: body.category,
      division: body.division || 'both',
      short_description: body.short_description || '',
      description: body.description || '',
      features: Array.isArray(body.features) ? body.features : [],
      price_starting: body.price_starting || '',
      image_url: body.image_url || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      badge: body.badge || '',
      is_active: body.is_active !== undefined ? body.is_active : true,
      is_featured: body.is_featured !== undefined ? body.is_featured : false,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
