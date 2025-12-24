import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single enquiry
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { data: enquiry, error } = await supabase
        .from('enquiries')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !enquiry) {
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

        const updates: any = {};
        if (status) updates.status = status;
        if (notes !== undefined) updates.notes = notes;

        const { data, error } = await supabase
            .from('enquiries')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
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

        const { error } = await supabase
            .from('enquiries')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
