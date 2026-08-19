import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET() {
  try {
    const promotions = await DataService.getPromotions();
    return NextResponse.json({ success: true, count: promotions.length, data: promotions });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 });
    }
    const promo = await DataService.savePromotion({
      id: body.id || `promo-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || '',
      badge: body.badge || 'Special Offer',
      discount_text: body.discount_text || '',
      description: body.description,
      coupon_code: body.coupon_code || '',
      valid_until: body.valid_until || '',
      cta_text: body.cta_text || 'Claim Deal',
      cta_link: body.cta_link || '/contact',
      image_url: body.image_url || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      bg_gradient: body.bg_gradient || 'from-blue-900 via-indigo-900 to-slate-900',
      is_active: body.is_active !== undefined ? body.is_active : true,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, data: promo }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
