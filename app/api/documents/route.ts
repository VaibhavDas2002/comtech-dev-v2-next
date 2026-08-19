import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';
import { DocumentImage } from '@/lib/types';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const MAX_FILE_SIZE_BYTES = 6 * 1024 * 1024; // 6 MB limit

export async function GET() {
  try {
    const docs = await DataService.getDocuments();
    // Return document items with preview urls
    const sanitized = docs.map((d) => ({
      id: d.id,
      file_name: d.file_name,
      mime_type: d.mime_type,
      file_size_bytes: d.file_size_bytes || Math.round((d.base64_data.length * 3) / 4),
      created_at: d.created_at,
      url: `/api/documents/${d.id}`,
    }));
    return NextResponse.json({ success: true, count: sanitized.length, data: sanitized });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { file_name, mime_type, base64_data } = body;

    if (!file_name || !mime_type || !base64_data) {
      return NextResponse.json(
        { success: false, error: 'file_name, mime_type, and base64_data are required' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(mime_type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type "${mime_type}". Allowed formats: JPEG, PNG, WEBP, and PDF.`,
        },
        { status: 400 }
      );
    }

    // Clean base64 string
    const pureBase64 = base64_data.includes(',')
      ? base64_data.split(',')[1]
      : base64_data;

    // Calculate approximate byte size from base64 length
    const byteSize = Math.round((pureBase64.length * 3) / 4);

    if (byteSize > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 6 MB maximum limit (Calculated size: ${(byteSize / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    const docId = `doc-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newDoc: DocumentImage = {
      id: docId,
      file_name,
      mime_type: mime_type.toLowerCase(),
      base64_data: pureBase64,
      file_size_bytes: byteSize,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await DataService.saveDocument(newDoc);

    return NextResponse.json(
      {
        success: true,
        message: 'File successfully stored as Base64 in document_image table',
        id: docId,
        url: `/api/documents/${docId}`,
        file_name,
        mime_type: mime_type.toLowerCase(),
        file_size_bytes: byteSize,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
