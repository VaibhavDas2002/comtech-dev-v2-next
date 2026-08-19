import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('q');

    let blogs = await DataService.getBlogs();

    if (category && category !== 'all') {
      blogs = blogs.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      blogs = blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.content) {
      return NextResponse.json({ success: false, error: 'Title, category and content are required' }, { status: 400 });
    }
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blog = await DataService.saveBlog({
      id: body.id || `blog-${Date.now()}`,
      title: body.title,
      slug,
      category: body.category,
      excerpt: body.excerpt || body.content.substring(0, 150) + '...',
      content: body.content,
      image_url: body.image_url || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
      author: body.author || 'Comtech Expert',
      author_role: body.author_role || 'Technical Specialist',
      tags: Array.isArray(body.tags) ? body.tags : ['IT', 'Technology'],
      reading_time_minutes: Number(body.reading_time_minutes) || 5,
      views_count: 0,
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt,
      is_published: body.is_published !== undefined ? body.is_published : true,
      is_featured: body.is_featured !== undefined ? body.is_featured : false,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
