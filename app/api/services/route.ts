import { NextRequest, NextResponse } from 'next/server';
import { servicesData } from '@/lib/data';

// GET all services
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let items = servicesData;
    if (category && category !== 'All') {
        items = items.filter(item => item.category === category);
    }

    return NextResponse.json({ success: true, data: items });
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
            id: Date.now().toString(),
            title,
            description,
            price,
            category,
            icon: icon || '✨'
        };

        servicesData.push(newService);

        return NextResponse.json({ success: true, data: newService }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
