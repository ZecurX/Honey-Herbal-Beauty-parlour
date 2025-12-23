import { NextRequest, NextResponse } from 'next/server';
import { servicesData } from '@/lib/data';

// GET single service
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const service = servicesData.find(s => s.id === id);

    if (!service) {
        return NextResponse.json(
            { success: false, error: 'Service not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, data: service });
}

// PUT update service
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, description, price, category, icon } = body;

        const index = servicesData.findIndex(s => s.id === id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Service not found' },
                { status: 404 }
            );
        }

        servicesData[index] = {
            ...servicesData[index],
            ...(title && { title }),
            ...(description && { description }),
            ...(price && { price }),
            ...(category && { category }),
            ...(icon && { icon })
        };

        return NextResponse.json({ success: true, data: servicesData[index] });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// DELETE service
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const index = servicesData.findIndex(s => s.id === id);

    if (index === -1) {
        return NextResponse.json(
            { success: false, error: 'Service not found' },
            { status: 404 }
        );
    }

    servicesData.splice(index, 1);

    return NextResponse.json({ success: true, message: 'Service deleted' });
}
