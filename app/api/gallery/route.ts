import { NextRequest, NextResponse } from 'next/server';
import { galleryItems } from '@/lib/data';

// GET all gallery items
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let items = galleryItems;
    if (category && category !== 'All') {
        items = items.filter(item => item.category === category);
    }

    return NextResponse.json({ success: true, data: items });
}

// POST new gallery item
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { imageUrl, caption, category } = body;

        if (!caption || !category) {
            return NextResponse.json(
                { success: false, error: 'Caption and category are required' },
                { status: 400 }
            );
        }

        const newItem = {
            id: Date.now().toString(),
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
            caption,
            category,
            createdAt: new Date().toISOString()
        };

        galleryItems.unshift(newItem);

        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
