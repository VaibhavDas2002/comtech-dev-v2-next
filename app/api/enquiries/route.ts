import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const urgency = searchParams.get('urgency');
    const search = searchParams.get('q');

    let enquiries = await DataService.getEnquiries();

    if (status && status !== 'all') {
      enquiries = enquiries.filter((e) => e.status === status);
    }
    if (urgency && urgency !== 'all') {
      enquiries = enquiries.filter((e) => e.urgency === urgency);
    }
    if (search) {
      const q = search.toLowerCase();
      enquiries = enquiries.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.phone.includes(q) ||
          e.ticket_number.toLowerCase().includes(q) ||
          (e.service_or_product_name && e.service_or_product_name.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, Phone and Message are required fields' },
        { status: 400 }
      );
    }

    const enquiry = await DataService.createEnquiry({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      type: body.type || 'general',
      service_or_product_name: body.service_or_product_name || '',
      subject: body.subject || 'Website Enquiry',
      message: body.message,
      urgency: body.urgency || 'normal',
      admin_notes: '',
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      ticket_number: enquiry.ticket_number,
      data: enquiry,
    }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Enquiry ID is required' }, { status: 400 });
    }

    const updated = await DataService.updateEnquiry(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
