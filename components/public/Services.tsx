'use client';

import React from 'react';
import Link from 'next/link';
import { useServices } from '@/context/ServicesContext';
import { ServiceParallaxCard } from '@/components/ui/service-parallax-card';

// Professional SVG Icon component - maps service categories to icons
const ServiceIcon: React.FC<{ category?: string; className?: string }> = ({ category, className = "w-8 h-8" }) => {
    const iconClass = `${className} text-primary`;

    switch (category?.toLowerCase()) {
        case 'facial':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'hair':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
            );
        case 'bridal':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            );
        case 'waxing':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
        case 'body':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        case 'nails':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            );
        default:
            // Default leaf/nature icon
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
    }
};

const Services: React.FC = () => {
    const { services, loading } = useServices();

    if (loading) {
        return (
            <section id="services" className="py-24 section-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-gray-light font-medium">Loading services...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="py-24 section-gradient relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="decoration-blob decoration-blob-gold absolute top-20 right-0 w-96 h-96 opacity-30"></div>
            <div className="decoration-blob decoration-blob-primary absolute bottom-20 left-0 w-64 h-64 opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20 reveal">
                    <span className="text-charcoal text-sm font-medium tracking-widest uppercase mb-6 inline-block">
                        Our Services
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 text-shadow-soft">
                        Natural Beauty{' '}
                        <span className="gradient-text">Treatments</span>
                    </h2>
                    <div className="golden-line w-24 mx-auto mb-6"></div>
                    <p className="text-gray-light max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover our range of herbal beauty services designed to enhance your natural beauty using organic ingredients.
                    </p>
                </div>

                {/* Services Grid - Show only first 6 on homepage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.slice(0, 6).map((service, index) => (
                        <ServiceParallaxCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            price={service.price}
                            category={service.category}
                            icon={<ServiceIcon category={service.category} />}
                            className="reveal"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {services.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="glass-card inline-block p-8 rounded-2xl">
                            <svg className="w-16 h-16 text-gray-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <p className="text-gray-light font-medium">No services available at the moment.</p>
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                {services.length > 0 && (
                    <div className="text-center mt-16 reveal flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/services" className="btn-primary inline-flex items-center gap-3">
                            <span>View All {services.length} Services</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <a href="#contact" className="btn-secondary inline-flex items-center gap-3">
                            <span>Book an Appointment</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
