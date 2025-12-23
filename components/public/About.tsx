'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import Image from 'next/image';

// Professional Feature Icons
const LeafIcon = () => (
    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const UserExpertIcon = () => (
    <svg className="w-7 h-7 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const SparkleIcon = () => (
    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const EcoIcon = () => (
    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const About: React.FC = () => {
    const { settings } = useSettings();

    const features = [
        {
            icon: <LeafIcon />,
            text: '100% Herbal Products',
            bgColor: 'from-primary/10 to-primary/5'
        },
        {
            icon: <UserExpertIcon />,
            text: 'Expert Beauticians',
            bgColor: 'from-secondary/10 to-secondary/5'
        },
        {
            icon: <SparkleIcon />,
            text: 'Premium Experience',
            bgColor: 'from-accent/10 to-accent/5'
        },
        {
            icon: <EcoIcon />,
            text: 'Eco-Friendly',
            bgColor: 'from-primary/10 to-primary/5'
        }
    ];

    return (
        <section id="about" className="py-24 bg-bg-cream relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="decoration-blob decoration-blob-primary absolute top-40 right-0 w-80 h-80 opacity-20"></div>
            <div className="decoration-blob decoration-blob-gold absolute bottom-20 left-10 w-64 h-64 opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="reveal-left relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
                                alt="About Honey Herbal"
                                width={800}
                                height={550}
                                className="w-full h-[450px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"></div>

                            {/* Overlay Content */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="glass-card p-6 !rounded-2xl">
                                    <p className="text-charcoal font-medium text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        Trusted by 5000+ happy customers
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge - Experience */}
                        <div className="absolute -bottom-8 -right-4 lg:-right-8 glass-card !rounded-2xl p-6 shadow-2xl hidden md:block animate-float">
                            <div className="text-center">
                                <span className="text-5xl font-display font-bold gradient-text block">15+</span>
                                <span className="text-sm text-gray-light font-medium">Years Experience</span>
                            </div>
                        </div>

                        {/* Decorative Ring */}
                        <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-primary/20 rounded-full -z-10"></div>
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-secondary/30 rounded-full -z-10"></div>
                    </div>

                    {/* Content Side */}
                    <div className="reveal-right">
                        <span className="badge-premium inline-block mb-6">
                            About Us
                        </span>
                        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">
                            Where Nature Meets{' '}
                            <span className="gradient-text block">Beauty Care</span>
                        </h2>

                        <div className="golden-line w-20 mb-8"></div>

                        <div className="space-y-5 text-gray-light leading-relaxed text-lg">
                            {(settings.aboutText || 'At Honey Herbal Beauty Parlor, we believe in the power of nature for your beauty. Our expert beauticians use only the finest herbal and organic products to give you a rejuvenating experience.\n\nWith over 15 years of experience, we have been trusted by thousands of customers for our premium services and personalized care.').split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Features Grid - With SVG Icons */}
                        <div className="grid grid-cols-2 gap-4 mt-10">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-4 bg-gradient-to-br ${feature.bgColor} rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}
                                >
                                    <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <span className="text-sm font-semibold text-charcoal">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-10">
                            <a href="#contact" className="btn-primary inline-flex items-center gap-3">
                                <span>Get in Touch</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
