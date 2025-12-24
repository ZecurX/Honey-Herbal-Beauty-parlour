import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single gallery item
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { data: item, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !item) {
        return NextResponse.json(
            { success: false, error: 'Gallery item not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: item });
}

// PUT update gallery item
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { imageUrl, caption, category } = body;

        const updates: any = {};
        if (imageUrl) updates.image_url = imageUrl;
        if (caption) updates.caption = caption;
        if (category) updates.category = category;

        const { data, error } = await supabase
            .from('gallery_items')
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

// DELETE gallery item
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
}
