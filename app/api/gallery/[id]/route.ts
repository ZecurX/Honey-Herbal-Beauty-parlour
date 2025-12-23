import { NextRequest, NextResponse } from 'next/server';
import { galleryItems } from '@/lib/data';

// GET single gallery item
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const item = galleryItems.find(g => g.id === id);

    if (!item) {
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

        const index = galleryItems.findIndex(g => g.id === id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Gallery item not found' },
                { status: 404 }
            );
        }

        galleryItems[index] = {
            ...galleryItems[index],
            ...(imageUrl && { imageUrl }),
            ...(caption && { caption }),
            ...(category && { category })
        };

        return NextResponse.json({ success: true, data: galleryItems[index] });
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
    const index = galleryItems.findIndex(g => g.id === id);

    if (index === -1) {
        return NextResponse.json(
            { success: false, error: 'Gallery item not found' },
            { status: 404 }
        );
    }

    galleryItems.splice(index, 1);

    return NextResponse.json({ success: true, message: 'Gallery item deleted' });
}
