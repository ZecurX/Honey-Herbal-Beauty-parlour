import { NextRequest, NextResponse } from 'next/server';
import { testimonialsData } from '@/lib/data';

// GET all testimonials
export async function GET() {
    return NextResponse.json({ success: true, data: testimonialsData });
}

// POST new testimonial
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, role, testimonial, rating, imageUrl } = body;

        if (!name || !testimonial || !rating) {
            return NextResponse.json(
                { success: false, error: 'Name, testimonial, and rating are required' },
                { status: 400 }
            );
        }

        const newTestimonial = {
            id: Date.now().toString(),
            name,
            role: role || 'Client',
            testimonial,
            rating: Number(rating),
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
            createdAt: new Date().toISOString().split('T')[0]
        };

        testimonialsData.push(newTestimonial);

        return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
