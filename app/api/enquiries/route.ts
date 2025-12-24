import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET all enquiries
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sort = searchParams.get('sort');

    let query = supabase
        .from('enquiries')
        .select('*');

    // Filter by status
    if (status && status !== 'All') {
        query = query.eq('status', status);
    }

    // Sort by date
    if (sort === 'oldest') {
        query = query.order('created_at', { ascending: true });
    } else {
        query = query.order('created_at', { ascending: false });
    }

    const { data: items, error } = await query;

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: items || [] });
}

// POST new enquiry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, service, message } = body;

        if (!name || !phone || !service || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, phone, service, and message are required' },
                { status: 400 }
            );
        }

        const newEnquiry = {
            name,
            phone,
            email,
            service,
            message,
            status: 'New'
        };

        const { data, error } = await supabase
            .from('enquiries')
            .insert([newEnquiry])
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
