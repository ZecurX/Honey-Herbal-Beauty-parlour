import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single package
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { data: pkg, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !pkg) {
        return NextResponse.json(
            { success: false, error: 'Package not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: pkg });
}

// PUT update package
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, description, discount, validUntil } = body;

        const updates: any = {};
        if (title) updates.title = title;
        if (description) updates.description = description;
        if (discount !== undefined) updates.discount = discount;
        if (validUntil !== undefined) updates.valid_until = validUntil;

        const { data, error } = await supabase
            .from('packages')
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

// DELETE package
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true, message: 'Package deleted' });
}
