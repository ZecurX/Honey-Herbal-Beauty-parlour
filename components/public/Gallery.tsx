'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useGallery } from '@/context/GalleryContext';
import { CircularGallery, GalleryItem as CircularGalleryItem } from '@/components/ui/circular-gallery-2';

// Fallback images if gallery is empty
const fallbackGalleryItems: CircularGalleryItem[] = [
    { image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop', text: 'Hair Styling' },
    { image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop', text: 'Bridal Makeup' },
    { image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop', text: 'Facial Treatment' },
    { image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop', text: 'Beauty Care' },
    { image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop', text: 'Hair Color' },
    { image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop', text: 'Skin Care' },
];

const Gallery: React.FC = () => {
    const { gallery, loading } = useGallery();

    // Convert gallery items to circular gallery format - use uploaded images
    const circularGalleryItems: CircularGalleryItem[] = useMemo(() => {
        if (gallery.length === 0) {
            return fallbackGalleryItems;
        }
        // Use up to 8 images for the circular gallery
        return gallery.slice(0, 8).map(item => ({
            image: item.imageUrl,
            text: item.caption
        }));
    }, [gallery]);

    if (loading) {
        return (
            <section id="gallery" className="py-24 section-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-gray-light font-medium">Loading gallery...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" className="py-24 section-gradient relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="decoration-blob decoration-blob-primary absolute top-40 left-0 w-64 h-64 opacity-20"></div>
            <div className="decoration-blob decoration-blob-gold absolute bottom-20 right-10 w-80 h-80 opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 reveal">
                    <span className="text-charcoal text-sm font-medium tracking-widest uppercase mb-6 inline-block">
                        Our Work
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 text-shadow-soft">
                        Beauty{' '}
                        <span className="gradient-text">Gallery</span>
                    </h2>
                    <div className="golden-line w-24 mx-auto mb-6"></div>
                    <p className="text-gray-light max-w-2xl mx-auto text-lg">
                        Browse through our collection of stunning transformations and beautiful work.
                    </p>
                </div>

                {/* ✨ 3D Circular Gallery Showcase - Uses dynamic gallery images */}
                <div className="mb-12 reveal">
                    <div className="relative h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-bg-cream to-bg-warm shadow-lg">
                        <CircularGallery
                            items={circularGalleryItems}
                            bend={3}
                            borderRadius={0.08}
                            scrollSpeed={2}
                            scrollEase={0.03}
                            className="font-display"
                        />
                        {/* Gradient overlays for smooth edges */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-cream to-transparent pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-cream to-transparent pointer-events-none"></div>
                    </div>
                </div>

                {/* View All Gallery Button */}
                <div className="text-center reveal">
                    <Link
                        href="/gallery"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <span>View Full Gallery</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
