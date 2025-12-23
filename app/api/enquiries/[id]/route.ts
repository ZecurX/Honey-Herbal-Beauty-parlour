import { NextRequest, NextResponse } from 'next/server';
import { enquiries } from '@/lib/data';

// GET single enquiry
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const enquiry = enquiries.find(e => e.id === id);

    if (!enquiry) {
        return NextResponse.json(
            { success: false, error: 'Enquiry not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: enquiry });
}

// PUT update enquiry
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status, notes } = body;

        const index = enquiries.findIndex(e => e.id === id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Enquiry not found' },
                { status: 404 }
            );
        }

        enquiries[index] = {
            ...enquiries[index],
            ...(status && { status }),
            ...(notes !== undefined && { notes })
        };

        return NextResponse.json({ success: true, data: enquiries[index] });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// DELETE enquiry (requires password)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { password } = body;

        // Verify admin password
        const ADMIN_PASSWORD = 'admin123';
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { success: false, error: 'Invalid password' },
                { status: 401 }
            );
        }

        const index = enquiries.findIndex(e => e.id === id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Enquiry not found' },
                { status: 404 }
            );
        }

        enquiries.splice(index, 1);

        return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
