import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Transform snake_case to camelCase for frontend
function transformGalleryItem(item: any) {
    return {
        id: item.id,
        imageUrl: item.image_url,
        caption: item.caption,
        category: item.category,
        createdAt: item.created_at
    };
}

// GET all gallery items
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

    if (category && category !== 'All') {
        query = query.eq('category', category);
    }

    const { data: items, error } = await query;

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Transform to camelCase
    const transformedItems = (items || []).map(transformGalleryItem);

    return NextResponse.json({ success: true, data: transformedItems });
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
            image_url: imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
            caption,
            category
        };

        const { data, error } = await supabase
            .from('gallery_items')
            .insert([newItem])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: transformGalleryItem(data) }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
