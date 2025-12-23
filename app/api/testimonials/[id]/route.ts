import { NextRequest, NextResponse } from 'next/server';
import { testimonialsData } from '@/lib/data';

// GET single testimonial
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const testimonial = testimonialsData.find(t => t.id === id);

    if (!testimonial) {
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

        const index = testimonialsData.findIndex(t => t.id === id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        testimonialsData[index] = {
            ...testimonialsData[index],
            ...(name && { name }),
            ...(role && { role }),
            ...(testimonial && { testimonial }),
            ...(rating !== undefined && { rating: Number(rating) }),
            ...(imageUrl && { imageUrl })
        };

        return NextResponse.json({ success: true, data: testimonialsData[index] });
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
    const index = testimonialsData.findIndex(t => t.id === id);

    if (index === -1) {
        return NextResponse.json(
            { success: false, error: 'Testimonial not found' },
            { status: 404 }
        );
    }

    testimonialsData.splice(index, 1);

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
}
