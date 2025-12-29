'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useGallery } from '@/context/GalleryContext';
import InteractiveImageBentoGallery, { ImageItem } from '@/components/ui/bento-gallery';

// Fallback images with beauty parlor themed content
const fallbackGalleryItems: ImageItem[] = [
    {
        id: 1,
        title: "Bridal Elegance",
        desc: "Stunning bridal makeup for your special day",
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
        span: "md:col-span-2",
    },
    {
        id: 2,
        title: "Hair Transformation",
        desc: "Professional styling & coloring",
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        span: "md:row-span-1",
    },
    {
        id: 3,
        title: "Herbal Facial",
        desc: "Natural ingredients for glowing skin",
        url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
        span: "md:row-span-1",
    },
    {
        id: 4,
        title: "Spa Relaxation",
        desc: "Rejuvenate body and mind",
        url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        span: "md:row-span-2",
    },
    {
        id: 5,
        title: "Mehndi Art",
        desc: "Traditional henna designs",
        url: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80",
        span: "md:row-span-1",
    },
    {
        id: 6,
        title: "Beauty Essentials",
        desc: "Premium products for skincare",
        url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
        span: "md:col-span-2",
    },
    {
        id: 7,
        title: "Nail Art",
        desc: "Creative nail designs",
        url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        span: "md:row-span-1",
    },
    {
        id: 8,
        title: "Hair Care",
        desc: "Healthy hair treatments",
        url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
        span: "md:row-span-1",
    },
];

const Gallery: React.FC = () => {
    const { gallery, loading } = useGallery();

    // Convert gallery items to bento format
    const galleryItems: ImageItem[] = useMemo(() => {
        if (!gallery || gallery.length === 0) {
            return fallbackGalleryItems;
        }
        // Map uploaded images to bento format
        return gallery.slice(0, 10).map((item, index) => ({
            id: item.id,
            title: item.caption || `Beauty ${index + 1}`,
            desc: item.category || "Transform your look",
            url: item.imageUrl,
            span: index === 0 ? "md:col-span-2" : index === 3 ? "md:row-span-2" : "md:row-span-1",
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
        <div id="gallery" className="section-gradient">
            <InteractiveImageBentoGallery
                imageItems={galleryItems}
                title="Beauty Gallery"
                description="Drag to explore our stunning transformations. Click any image to view full size."
            />

            {/* View All Gallery Button */}
            <div className="text-center pb-16 reveal">
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
    );
};

export default Gallery;
