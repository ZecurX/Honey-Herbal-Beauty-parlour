import { NextRequest, NextResponse } from 'next/server';
import { packagesData } from '@/lib/data';

// GET single package
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const pkg = packagesData.find(p => p.id === id);

    if (!pkg) {
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

        const index = packagesData.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Package not found' },
                { status: 404 }
            );
        }

        packagesData[index] = {
            ...packagesData[index],
            ...(title && { title }),
            ...(description && { description }),
            ...(discount !== undefined && { discount }),
            ...(validUntil !== undefined && { validUntil })
        };

        return NextResponse.json({ success: true, data: packagesData[index] });
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
    const index = packagesData.findIndex(p => p.id === id);

    if (index === -1) {
        return NextResponse.json(
            { success: false, error: 'Package not found' },
            { status: 404 }
        );
    }

    packagesData.splice(index, 1);

    return NextResponse.json({ success: true, message: 'Package deleted' });
}
