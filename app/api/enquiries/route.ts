import { NextRequest, NextResponse } from 'next/server';
import { enquiries } from '@/lib/data';

// GET all enquiries
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sort = searchParams.get('sort');

    let items = [...enquiries];

    // Filter by status
    if (status && status !== 'All') {
        items = items.filter(e => e.status === status);
    }

    // Sort by date
    if (sort === 'oldest') {
        items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json({ success: true, data: items });
}

// POST new enquiry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, service, message } = body;

        if (!name || !phone || !service || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, phone, service, and message are required' },
                { status: 400 }
            );
        }

        const newEnquiry = {
            id: Date.now().toString(),
            name,
            phone,
            email,
            service,
            message,
            status: 'New' as const,
            createdAt: new Date().toISOString()
        };

        enquiries.unshift(newEnquiry);

        return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
