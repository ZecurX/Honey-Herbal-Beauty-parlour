'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGallery } from '@/context/GalleryContext';
import { GalleryItem } from '@/types';
import Navbar from '@/components/public/Navbar';

const categories = ['All', 'Hair', 'Facial', 'Bridal', 'Other'] as const;

export default function GalleryPage() {
    const { gallery, loading } = useGallery();
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const filteredGallery = activeCategory === 'All'
        ? gallery
        : gallery.filter(item => item.category === activeCategory);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-bg-cream">
                {/* Hero Section */}
                <section className="pt-32 pb-16 section-gradient relative overflow-hidden">
                    <div className="decoration-blob decoration-blob-primary absolute top-20 right-10 w-80 h-80 opacity-20"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-gray-light mb-8">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-charcoal font-medium">Gallery</span>
                        </nav>

                        {/* Header */}
                        <div className="text-center">
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 text-shadow-soft">
                                Beauty{' '}
                                <span className="gradient-text">Gallery</span>
                            </h1>
                            <div className="golden-line w-24 mx-auto mb-6"></div>
                            <p className="text-gray-light max-w-2xl mx-auto text-lg">
                                Explore our collection of stunning transformations and beautiful work.
                                Each image showcases our dedication to making you look and feel your best.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-400 ${activeCategory === category
                                        ? 'btn-primary'
                                        : 'glass-card hover:bg-white/90 text-charcoal hover:-translate-y-1'
                                        }`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Count */}
                        <div className="text-center mb-8">
                            <p className="text-gray-light">
                                Showing <span className="text-charcoal font-semibold">{filteredGallery.length}</span> {filteredGallery.length === 1 ? 'image' : 'images'}
                                {activeCategory !== 'All' && <> in <span className="text-primary font-semibold">{activeCategory}</span></>}
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                    <p className="text-gray-light font-medium">Loading gallery...</p>
                                </div>
                            </div>
                        ) : filteredGallery.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="glass-card inline-block p-8 rounded-2xl">
                                    <svg className="w-16 h-16 text-gray-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-light font-medium">No photos in this category yet.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {filteredGallery.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transform hover:-translate-y-2 transition-all duration-500 ${index % 5 === 0 ? 'row-span-2' : ''
                                            }`}
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.caption}
                                            width={400}
                                            height={index % 5 === 0 ? 500 : 256}
                                            className={`w-full ${index % 5 === 0 ? 'h-full' : 'h-64'} object-cover transition-transform duration-700 group-hover:scale-110`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400">
                                            <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                                                <span className="text-secondary text-xs font-medium inline-block mb-2">
                                                    {item.category}
                                                </span>
                                                <p className="text-white font-medium">{item.caption}</p>
                                            </div>
                                        </div>
                                        {/* Hover Icon */}
                                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400">
                                            <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Back to Home */}
                        <div className="text-center mt-16">
                            <Link
                                href="/#gallery"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back to Home</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-5xl w-full animate-scale-in">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-16 right-0 w-12 h-12 rounded-full glass-card flex items-center justify-center text-charcoal hover:bg-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <Image
                                src={selectedImage.imageUrl.includes('unsplash') ? selectedImage.imageUrl.replace('w=400', 'w=1200') : selectedImage.imageUrl}
                                alt={selectedImage.caption}
                                width={1200}
                                height={800}
                                className="w-full rounded-3xl shadow-2xl"
                            />
                            <div className="mt-6 text-center">
                                <span className="text-secondary text-sm font-medium inline-block mb-2">
                                    {selectedImage.category}
                                </span>
                                <p className="text-white text-xl font-display">{selectedImage.caption}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
