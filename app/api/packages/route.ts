import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET all packages
export async function GET() {
    const { data: packages, error } = await supabase
        .from('packages')
        .select('*');

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: packages });
}

// POST new package
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, discount, validUntil } = body;

        if (!title || !description) {
            return NextResponse.json(
                { success: false, error: 'Title and description are required' },
                { status: 400 }
            );
        }

        const newPackage = {
            title,
            description,
            discount: discount || '',
            valid_until: validUntil || null
        };

        const { data, error } = await supabase
            .from('packages')
            .insert([newPackage])
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
