import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all services
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
        .from('services')
        .select('*');

    if (category && category !== 'All') {
        query = query.eq('category', category);
    }

    const { data: items, error } = await query;

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: items || [] });
}

// POST new service
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, price, category, icon } = body;

        if (!title || !description || !price || !category) {
            return NextResponse.json(
                { success: false, error: 'Title, description, price, and category are required' },
                { status: 400 }
            );
        }

        const newService = {
            title,
            description,
            price,
            category,
            icon: icon || '✨'
        };

        const { data, error } = await supabase
            .from('services')
            .insert([newService])
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
