import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Transform snake_case to camelCase for frontend
function transformTestimonial(item: any) {
    return {
        id: item.id,
        name: item.name,
        role: item.role,
        testimonial: item.testimonial,
        rating: item.rating,
        imageUrl: item.image_url,
        createdAt: item.created_at
    };
}

// GET all testimonials
export async function GET() {
    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Transform to camelCase
    const transformedTestimonials = (testimonials || []).map(transformTestimonial);

    return NextResponse.json({ success: true, data: transformedTestimonials });
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

        return NextResponse.json({ success: true, data: transformTestimonial(data) }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
