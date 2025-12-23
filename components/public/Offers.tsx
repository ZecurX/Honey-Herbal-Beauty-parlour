'use client';

import React from 'react';
import { usePackages } from '@/context/PackagesContext';
import { Interactive3DPackageCard } from '@/components/ui/3d-card';

// Beauty parlor package images from Unsplash
const packageImages = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80', // Bridal/makeup
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', // Spa treatment
    'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80', // Facial
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', // Skincare
    'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80', // Hair styling
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', // Salon
];

const Offers: React.FC = () => {
    const { packages, loading } = usePackages();

    if (loading) {
        return (
            <section id="offers" className="py-24 bg-bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-gray-light font-medium">Loading offers...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="offers" className="py-24 bg-bg-cream relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="decoration-blob decoration-blob-gold absolute top-20 left-0 w-64 h-64 opacity-20"></div>
            <div className="decoration-blob decoration-blob-primary absolute bottom-20 right-10 w-80 h-80 opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 text-shadow-soft">
                        Exclusive{' '}
                        <span className="gradient-text">Packages</span>
                    </h2>
                    <div className="golden-line w-24 mx-auto mb-6"></div>
                    <p className="text-gray-light max-w-2xl mx-auto text-lg">
                        Take advantage of our special offers and packages for incredible savings.
                    </p>
                </div>

                {/* 3D Package Cards Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    style={{ perspective: "1000px" }}
                >
                    {packages.map((offer, index) => (
                        <Interactive3DPackageCard
                            key={offer.id}
                            title={offer.title}
                            description={offer.description}
                            imageUrl={packageImages[index % packageImages.length]}
                            discount={offer.discount}
                            validUntil={offer.validUntil}
                            actionText="Book This Package"
                            index={index}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {packages.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="glass-card inline-block p-8 rounded-2xl">
                            <svg className="w-16 h-16 text-gray-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            <p className="text-gray-light font-medium">No special offers available at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Offers;
