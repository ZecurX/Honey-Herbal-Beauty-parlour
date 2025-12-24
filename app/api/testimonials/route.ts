import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all testimonials
export async function GET() {
    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: testimonials });
}

// POST create new testimonial
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.testimonial) {
            return NextResponse.json(
                { success: false, error: 'Name and testimonial are required' },
                { status: 400 }
            );
        }

        const newTestimonial = {
            name: body.name,
            role: body.role || 'Client',
            testimonial: body.testimonial,
            rating: Number(body.rating) || 5,
            image_url: body.imageUrl || null
        };

        const { data, error } = await supabase
            .from('testimonials')
            .insert([newTestimonial])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
