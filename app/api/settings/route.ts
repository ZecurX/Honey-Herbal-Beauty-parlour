import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockSettings } from '@/data/mockData';
import { Settings } from '@/types';

export async function GET() {
    try {
        // Fetch site_info and footer_content
        const { data, error } = await supabase
            .from('settings')
            .select('key, value')
            .in('key', ['site_info', 'footer_content']);

        if (error) {
            console.error('Error fetching settings:', error);
            // Fallback to mock data if table implementation is not ready or fails
            return NextResponse.json({ success: true, data: mockSettings });
        }

        if (data && data.length > 0) {
            const siteInfo = data.find(item => item.key === 'site_info')?.value || {};
            const footerContent = data.find(item => item.key === 'footer_content')?.value || {};

            // Map DB data to Settings interface
            const settings: Settings = {
                businessName: siteInfo.name || mockSettings.businessName,
                phone: siteInfo.phone || mockSettings.phone,
                whatsapp: siteInfo.whatsapp || mockSettings.whatsapp,
                email: siteInfo.email || mockSettings.email,
                address: siteInfo.address || mockSettings.address,
                workingHours: siteInfo.working_hours || mockSettings.workingHours,
                heroTagline: siteInfo.hero_tagline || mockSettings.heroTagline,
                aboutText: footerContent.about_text || mockSettings.aboutText,
                socialLinks: {
                    facebook: siteInfo.facebook || mockSettings.socialLinks.facebook,
                    instagram: siteInfo.instagram || mockSettings.socialLinks.instagram
                }
            };

            return NextResponse.json({ success: true, data: settings });
        }

        return NextResponse.json({ success: true, data: mockSettings });
    } catch (error) {
        console.error('Settings API Error:', error);
        return NextResponse.json({ success: true, data: mockSettings });
    }
}

// Ensure POST behaves like PUT for compatibility
export async function POST(req: Request) {
    return PUT(req);
}

export async function PUT(req: Request) {
    try {
        const body: Settings = await req.json();

        // fetch existing data to merge
        const { data: existingData } = await supabase
            .from('settings')
            .select('key, value')
            .in('key', ['site_info', 'footer_content']);

        const existingSiteInfo = existingData?.find(item => item.key === 'site_info')?.value || {};
        const existingFooterContent = existingData?.find(item => item.key === 'footer_content')?.value || {};

        // Prepare site_info update
        const siteInfo = {
            ...existingSiteInfo,
            name: body.businessName,
            phone: body.phone,
            whatsapp: body.whatsapp,
            email: body.email,
            address: body.address,
            working_hours: body.workingHours,
            hero_tagline: body.heroTagline,
            facebook: body.socialLinks.facebook,
            instagram: body.socialLinks.instagram
        };

        // Prepare footer_content update
        const footerContent = {
            ...existingFooterContent,
            about_text: body.aboutText,
        };

        const { error: siteError } = await supabase
            .from('settings')
            .upsert({
                key: 'site_info',
                value: siteInfo,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

        const { error: footerError } = await supabase
            .from('settings')
            .upsert({
                key: 'footer_content',
                value: footerContent,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

        if (siteError || footerError) {
            console.error('Error updating settings:', siteError || footerError);
            return NextResponse.json(
                { success: false, error: 'Failed to update settings' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error('Settings API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
