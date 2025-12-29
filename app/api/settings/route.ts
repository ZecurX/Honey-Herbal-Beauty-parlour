import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockSettings } from '@/data/mockData';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('data')
            .eq('id', 1)
            .single();

        if (error) {
            // If table doesn't exist or row missing, return mock data
            console.error('Error fetching settings:', error);
            return NextResponse.json({ success: true, data: mockSettings });
        }

        if (data && data.data) {
            return NextResponse.json({ success: true, data: data.data });
        }

        return NextResponse.json({ success: true, data: mockSettings });
    } catch (error) {
        console.error('Settings API Error:', error);
        return NextResponse.json({ success: true, data: mockSettings });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { error } = await supabase
            .from('site_settings')
            .upsert({
                id: 1,
                data: body,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error updating settings:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to update settings' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
