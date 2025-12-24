import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No image file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: 'Invalid file type. Please upload JPEG, PNG, WebP or GIF.' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `testimonial-${timestamp}.${extension}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('testimonials')
            .upload(filename, file);

        if (error) {
            console.error('Storage upload error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to upload image' },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('testimonials')
            .getPublicUrl(filename);

        return NextResponse.json({ success: true, imageUrl: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
