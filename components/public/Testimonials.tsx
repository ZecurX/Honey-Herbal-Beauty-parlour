'use client';

import React, { useState, useEffect } from 'react';
import { mockTestimonials } from '@/data/mockData';

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % mockTestimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderStars = (rating: number = 5) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-charcoal relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
            <div className="decoration-blob decoration-blob-gold absolute top-20 right-20 w-64 h-64 opacity-20"></div>
            <div className="decoration-blob decoration-blob-primary absolute bottom-20 left-20 w-48 h-48 opacity-30"></div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 text-shadow-soft">
                        What Our Clients Say
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full"></div>
                </div>

                {/* Testimonial Slider */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {mockTestimonials.map((testimonial) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                    <div className="glass-card p-10 md:p-14 text-center relative">
                                        {/* Quote Icon - Gradient */}
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>

                                        {/* Quote */}
                                        <p className="text-xl md:text-2xl text-charcoal leading-relaxed mb-8 font-display italic pt-4">
                                            &quot;{testimonial.quote}&quot;
                                        </p>

                                        {/* Divider */}
                                        <div className="golden-line w-16 mx-auto mb-6"></div>

                                        {/* Stars */}
                                        <div className="flex justify-center mb-6 gap-1">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        {/* Client Info */}
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
                                                <span className="text-white font-bold text-xl font-display">
                                                    {(testimonial.clientName || testimonial.name || 'A').charAt(0)}
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <span className="font-display font-semibold text-charcoal text-lg block">
                                                    {testimonial.clientName || testimonial.name}
                                                </span>
                                                <span className="text-sm text-gray-light">Verified Client</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots - Premium */}
                    <div className="flex justify-center mt-10 gap-2">
                        {mockTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-3 rounded-full transition-all duration-400 ${index === activeIndex
                                    ? 'bg-gradient-to-r from-secondary to-accent w-10 shadow-lg'
                                    : 'bg-white/30 hover:bg-white/50 w-3'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows - Glassmorphism */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-16 w-14 h-14 glass-card rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 hidden md:flex shadow-lg"
                    >
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % mockTestimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-16 w-14 h-14 glass-card rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 hidden md:flex shadow-lg"
                    >
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
