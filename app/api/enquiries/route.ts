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
      whatsapp_number: body.whatsapp_number || body.phone,
      email: body.email || '',
      type: body.type || 'general',
      service_or_product_name: body.service_or_product_name || '',
      subject: body.subject || (body.type === 'service_appointment' ? 'Service Appointment & Issue Registration' : 'Website Enquiry'),
      message: body.message,
      urgency: body.urgency || 'normal',
      admin_notes: body.admin_notes || '',

      // Appointment specific fields
      appointment_date: body.appointment_date || '',
      appointment_time_slot: body.appointment_time_slot || '',
      service_mode: body.service_mode || 'lab_visit',
      customer_category: body.customer_category || 'Individual / Home',
      address: body.address || '',
      landmark: body.landmark || '',
      device_brand_model: body.device_brand_model || '',
      device_serial: body.device_serial || '',
      warranty_status: body.warranty_status || 'Out of Warranty',
      issue_symptoms: body.issue_symptoms || [],
      attachment_doc_id: body.attachment_doc_id || '',
      attachment_url: body.attachment_url || '',
    });

    return NextResponse.json({
      success: true,
      message: body.type === 'service_appointment' ? 'Service Appointment registered successfully' : 'Enquiry submitted successfully',
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
    
    // Support Bulk Status Updates
    if (body.ids && Array.isArray(body.ids)) {
      const updatedList = [];
      for (const id of body.ids) {
        const updatePayload: Record<string, unknown> = {};
        if (body.status) updatePayload.status = body.status;
        if (body.admin_notes) updatePayload.admin_notes = body.admin_notes;
        const res = await DataService.updateEnquiry(id, updatePayload);
        if (res) updatedList.push(res);
      }
      return NextResponse.json({ success: true, count: updatedList.length, message: `${updatedList.length} enquiries updated.` });
    }

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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids');

    // Support Bulk Deletion by comma-separated IDs
    if (ids) {
      const idList = ids.split(',').map((x) => x.trim()).filter(Boolean);
      for (const singleId of idList) {
        await DataService.deleteEnquiry(singleId);
      }
      return NextResponse.json({ success: true, count: idList.length, message: `${idList.length} enquiries deleted.` });
    }

    if (id) {
      await DataService.deleteEnquiry(id);
      return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
    }

    return NextResponse.json({ success: false, error: 'ID or IDs parameter required' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
