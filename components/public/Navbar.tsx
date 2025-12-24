'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { settings } = useSettings();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home', isPage: true },
        { href: '/services', label: 'Services', isPage: true },
        { href: '/gallery', label: 'Gallery', isPage: true },
        { href: '/#offers', label: 'Offers', isPage: true },
        { href: '/#contact', label: 'Contact', isPage: true },
    ];

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                            <Image
                                src="/logo.jpg"
                                alt="Honey Herbal Logo"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className={`font-display text-xl font-bold transition-colors ${isScrolled ? 'text-charcoal' : 'text-charcoal'
                            }`}>
                            Honey <span className="gradient-text">Herbal</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-medium transition-colors duration-300 hover:text-primary ${isScrolled ? 'text-charcoal/80' : 'text-charcoal/80'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={`tel:${settings.phone?.replace(/\s/g, '') || ''}`}
                            className="btn-primary text-sm px-5 py-2.5"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-charcoal"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
                        }`}
                >
                    <div className="glass-card rounded-2xl p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className="block px-4 py-3 rounded-xl font-medium text-charcoal/80 hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={`tel:${settings.phone?.replace(/\s/g, '') || ''}`}
                            onClick={closeMobileMenu}
                            className="block w-full btn-primary text-center mt-4"
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
