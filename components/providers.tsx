'use client';

import { ReactNode } from 'react';
import { SettingsProvider } from '@/context/SettingsContext';
import { AuthProvider } from '@/context/AuthContext';
import { GalleryProvider } from '@/context/GalleryContext';
import { EnquiryProvider } from '@/context/EnquiryContext';
import { ServicesProvider } from '@/context/ServicesContext';
import { PackagesProvider } from '@/context/PackagesContext';
import { TestimonialsProvider } from '@/context/TestimonialsContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SmoothScrollProvider>
            <SettingsProvider>
                <ServicesProvider>
                    <PackagesProvider>
                        <TestimonialsProvider>
                            <GalleryProvider>
                                <EnquiryProvider>
                                    <AuthProvider>
                                        {children}
                                    </AuthProvider>
                                </EnquiryProvider>
                            </GalleryProvider>
                        </TestimonialsProvider>
                    </PackagesProvider>
                </ServicesProvider>
            </SettingsProvider>
        </SmoothScrollProvider>
    );
}
