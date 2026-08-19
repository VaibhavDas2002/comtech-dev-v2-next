import { NextResponse } from 'next/server';
import { DataService } from '@/lib/store/dataService';

export async function GET() {
  try {
    const users = await DataService.getUsers();
    return NextResponse.json({ success: true, count: users.length, data: users });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.username || !body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Username, Name and Email are required fields' },
        { status: 400 }
      );
    }

    const newUser = await DataService.saveUser({
      id: body.id || `usr-${Date.now()}`,
      username: body.username,
      name: body.name,
      email: body.email,
      phone: body.phone || '9434197268',
      role: body.role || 'Service Technician',
      status: body.status || 'active',
      avatar_url: body.avatar_url || '',
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'User saved successfully', data: newUser }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Protect super admin
    if (id === 'usr-1') {
      return NextResponse.json({ success: false, error: 'Cannot delete primary Super Administrator' }, { status: 403 });
    }

    await DataService.deleteUser(id);
    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
