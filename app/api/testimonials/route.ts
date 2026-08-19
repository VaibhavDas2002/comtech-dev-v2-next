import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET() {
  try {
    const testimonials = await DataService.getTestimonials();
    return NextResponse.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.review) {
      return NextResponse.json({ success: false, error: 'Name and review are required' }, { status: 400 });
    }
    const item = await DataService.saveTestimonial({
      id: body.id || `test-${Date.now()}`,
      name: body.name,
      designation: body.designation || '',
      company: body.company || '',
      location: body.location || 'Suri, Birbhum',
      rating: Number(body.rating) || 5,
      review: body.review,
      service_type: body.service_type || 'General IT Support',
      is_featured: body.is_featured !== undefined ? body.is_featured : true,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
