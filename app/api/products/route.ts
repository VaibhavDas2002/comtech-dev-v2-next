import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const featured = searchParams.get('featured');
    const search = searchParams.get('q');

    let products = await DataService.getProducts();

    if (category && category !== 'all') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'all') {
      products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (featured === 'true') {
      products = products.filter((p) => p.is_featured);
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.brand) {
      return NextResponse.json({ success: false, error: 'Title, category and brand are required' }, { status: 400 });
    }
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const product = await DataService.saveProduct({
      id: body.id || `prod-${Date.now()}`,
      title: body.title,
      slug,
      category: body.category,
      brand: body.brand,
      sku: body.sku || '',
      short_description: body.short_description || '',
      description: body.description || '',
      price: body.price ? Number(body.price) : undefined,
      discount_price: body.discount_price ? Number(body.discount_price) : undefined,
      warranty: body.warranty || '1 Year Brand Warranty',
      specifications: body.specifications || {},
      image_url: body.image_url || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      in_stock: body.in_stock !== undefined ? body.in_stock : true,
      is_featured: body.is_featured !== undefined ? body.is_featured : false,
      is_new: body.is_new !== undefined ? body.is_new : false,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
