import { NextRequest, NextResponse } from 'next/server';
import { packagesData } from '@/lib/data';

// GET all packages
export async function GET() {
    return NextResponse.json({ success: true, data: packagesData });
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
            id: Date.now().toString(),
            title,
            description,
            discount: discount || '',
            validUntil: validUntil || ''
        };

        packagesData.push(newPackage);

        return NextResponse.json({ success: true, data: newPackage }, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
