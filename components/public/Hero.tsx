'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { HeroShaderBackground } from '@/components/ui/hero-shader';
import Image from 'next/image';
import { RippleLink } from '@/components/ui/ripple-button';

// Professional SVG Icons
const LeafIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const HeartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const Hero: React.FC = () => {
    const { settings } = useSettings();

    return (
        <section id="home">
            <HeroShaderBackground>
                <div className="min-h-screen flex items-center justify-center relative">
                    {/* Decorative Blobs - now floating on top of shader */}
                    <div className="decoration-blob decoration-blob-primary absolute top-20 left-10 w-64 h-64 opacity-30"></div>
                    <div className="decoration-blob decoration-blob-gold absolute bottom-40 right-10 w-80 h-80 opacity-20"></div>
                    <div className="decoration-blob decoration-blob-primary absolute bottom-20 left-1/4 w-48 h-48 opacity-20"></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <div className="reveal">
                            {/* Logo Badge - Premium Glassmorphism */}
                            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-10 overflow-hidden glass-card animate-float animate-pulse-glow">
                                <Image src="/logo.jpg" alt="Honey Herbal Logo" width={112} height={112} className="w-full h-full object-cover" />
                            </div>


                            {/* Main Heading - Gradient Text */}
                            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-shadow-soft">
                                <span className="text-charcoal">Honey</span>{' '}
                                <span className="gradient-text">Herbal</span>
                                <span className="block text-3xl sm:text-4xl md:text-5xl font-medium mt-2 text-primary tracking-wide">Beauty Parlor</span>
                            </h1>

                            {/* Golden Divider */}
                            <div className="golden-line w-32 mx-auto mb-8"></div>

                            {/* Tagline - Enhanced */}
                            <p className="text-lg sm:text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                                {settings.heroTagline}
                            </p>

                            {/* CTA Buttons - Simple Transparent Styling */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <RippleLink
                                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call Now
                                </RippleLink>

                                <RippleLink
                                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                                    variant="outline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp Us
                                </RippleLink>

                                <RippleLink
                                    href="#contact"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Enquire Now
                                </RippleLink>
                            </div>

                            {/* Trust Indicators - Clean Layout */}
                            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                <div className="flex items-center justify-center gap-3 p-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <CheckIcon />
                                    </div>
                                    <span className="font-medium text-charcoal whitespace-nowrap">100% Organic</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 p-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <ClockIcon />
                                    </div>
                                    <span className="font-medium text-charcoal whitespace-nowrap">15+ Years Exp.</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 p-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <HeartIcon />
                                    </div>
                                    <span className="font-medium text-charcoal whitespace-nowrap">5000+ Clients</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </HeroShaderBackground>
        </section>
    );
};

export default Hero;
