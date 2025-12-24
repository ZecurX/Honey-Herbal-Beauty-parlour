'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useServices } from '@/context/ServicesContext';
import { ServiceParallaxCard } from '@/components/ui/service-parallax-card';
import Navbar from '@/components/public/Navbar';

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
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
    }
};

export default function ServicesPage() {
    const { services, loading } = useServices();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(services.map(s => s.category))];
        return cats;
    }, [services]);

    // Filter services based on category and search
    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
            const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [services, selectedCategory, searchQuery]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-bg-cream pt-16">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-primary/10 via-bg-cream to-secondary/10 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="decoration-blob decoration-blob-gold absolute top-10 right-10 w-64 h-64 opacity-20"></div>
                    <div className="decoration-blob decoration-blob-primary absolute bottom-10 left-10 w-48 h-48 opacity-20"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="mb-8">
                            <ol className="flex items-center gap-2 text-sm">
                                <li>
                                    <Link href="/" className="text-gray-light hover:text-primary transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li className="text-gray-light">/</li>
                                <li className="text-primary font-medium">Services</li>
                            </ol>
                        </nav>

                        {/* Page Header */}
                        <div className="text-center">
                            <span className="badge-premium inline-block mb-6">
                                ✨ Our Complete Service Menu
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6">
                                All Beauty{' '}
                                <span className="gradient-text">Services</span>
                            </h1>
                            <div className="golden-line w-24 mx-auto mb-6"></div>
                            <p className="text-gray-light max-w-2xl mx-auto text-lg leading-relaxed">
                                Explore our complete range of herbal beauty treatments. Each service uses premium organic ingredients for the best results.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="py-8 bg-white/50 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Search */}
                            <div className="relative w-full md:w-80">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-full border border-primary/20 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'bg-white text-charcoal hover:bg-primary/10 border border-primary/20'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Results Count */}
                        <div className="mb-8 flex items-center justify-between">
                            <p className="text-gray-light">
                                Showing <span className="font-semibold text-charcoal">{filteredServices.length}</span> services
                                {selectedCategory !== 'All' && (
                                    <span> in <span className="text-primary font-medium">{selectedCategory}</span></span>
                                )}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                <p className="ml-4 text-gray-light">Loading services...</p>
                            </div>
                        ) : filteredServices.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="glass-card inline-block p-8 rounded-2xl">
                                    <svg className="w-16 h-16 text-gray-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-gray-light font-medium mb-4">No services found</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('All');
                                            setSearchQuery('');
                                        }}
                                        className="text-primary hover:underline"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredServices.map((service, index) => (
                                    <ServiceParallaxCard
                                        key={service.id}
                                        title={service.title}
                                        description={service.description}
                                        price={service.price}
                                        category={service.category}
                                        icon={<ServiceIcon category={service.category} />}
                                        className="reveal"
                                        style={{
                                            transitionDelay: `${index * 50}ms`,
                                            animationDelay: `${index * 50}ms`
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
                            Can&apos;t find what you&apos;re looking for?
                        </h2>
                        <p className="text-gray-light mb-8 max-w-xl mx-auto">
                            Contact us for custom treatments or package options tailored to your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/#contact"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact Us
                            </Link>
                            <Link
                                href="/"
                                className="btn-outline inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
