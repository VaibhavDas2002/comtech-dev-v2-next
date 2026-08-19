import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function POST() {
  try {
    await DataService.clearAllEnquiries();
    return NextResponse.json({
      success: true,
      message: 'All public enquiries and appointments have been permanently reset/deleted from database.',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
