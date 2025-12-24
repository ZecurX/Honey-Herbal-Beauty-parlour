import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single testimonial
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { data: testimonial, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !testimonial) {
        return NextResponse.json(
            { success: false, error: 'Testimonial not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: testimonial });
}

// PUT update testimonial
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, role, testimonial, rating, imageUrl } = body;

        const updates: any = {};
        if (name) updates.name = name;
        if (role) updates.role = role;
        if (testimonial) updates.testimonial = testimonial;
        if (rating !== undefined) updates.rating = Number(rating);
        if (imageUrl) updates.image_url = imageUrl;

        const { data, error } = await supabase
            .from('testimonials')
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

// DELETE testimonial
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
}
