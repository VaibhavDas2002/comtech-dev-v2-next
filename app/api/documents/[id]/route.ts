import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await DataService.getDocumentById(id);

    if (!doc || !doc.base64_data) {
      return new NextResponse('Document or image not found', { status: 404 });
    }

    // Extract raw base64 string
    const rawBase64 = doc.base64_data.includes(',')
      ? doc.base64_data.split(',')[1]
      : doc.base64_data;

    const buffer = Buffer.from(rawBase64, 'base64');

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': doc.mime_type || 'application/octet-stream',
        'Content-Length': buffer.length.toString(),
        'Content-Disposition': `inline; filename="${encodeURIComponent(doc.file_name || 'file')}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error decoding document';
    return new NextResponse(msg, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await DataService.deleteDocument(id);
    return NextResponse.json({ success });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting document';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
