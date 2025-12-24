"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, Sparkles, Send, MessageCircle } from "lucide-react"
import { useSettings } from '@/context/SettingsContext';
import { mockServices } from '@/data/mockData';
import { enquiryApi } from '@/services/api';

function StackedCircularFooter() {
    const { settings } = useSettings();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await enquiryApi.add({
                name: formData.name,
                phone: formData.phone,
                email: formData.email || undefined,
                service: formData.service,
                message: formData.message
            });

            setStatus('success');
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Failed to submit enquiry:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <footer id="contact" className="bg-charcoal pt-20 pb-10 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
            <div className="decoration-blob decoration-blob-gold absolute top-20 right-10 w-64 h-64 opacity-10"></div>
            <div className="decoration-blob decoration-blob-primary absolute bottom-40 left-10 w-48 h-48 opacity-15"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-3 ring-2 ring-secondary/30 shadow-xl overflow-hidden">
                        <img
                            src="/logo.jpg"
                            alt="Honey Herbal Logo"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Get In <span className="text-secondary">Touch</span>
                    </h2>
                    <p className="text-gray-light max-w-2xl mx-auto">
                        Ready to transform your look? Book an appointment or send us a message.
                    </p>
                </div>

                {/* Main Content Grid - Contact Form + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-secondary/20">
                        <h3 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-secondary" />
                            Send Us a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <Label htmlFor="name" className="text-white/80 text-sm mb-2 block">Your Name *</Label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-secondary/30 text-white placeholder:text-white/40 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <Label htmlFor="phone" className="text-white/80 text-sm mb-2 block">Phone Number *</Label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-secondary/30 text-white placeholder:text-white/40 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                                        placeholder="Your phone number"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <Label htmlFor="email" className="text-white/80 text-sm mb-2 block">Email (Optional)</Label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-secondary/30 text-white placeholder:text-white/40 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
                                        placeholder="Your email"
                                    />
                                </div>

                                {/* Service */}
                                <div>
                                    <Label htmlFor="service" className="text-white/80 text-sm mb-2 block">Service *</Label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-secondary/30 text-white focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-charcoal">Select a service</option>
                                        {mockServices.map(service => (
                                            <option key={service.id} value={service.title} className="bg-charcoal">
                                                {service.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <Label htmlFor="message" className="text-white/80 text-sm mb-2 block">Message *</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-secondary/30 text-white placeholder:text-white/40 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-secondary hover:to-accent text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Send className="w-4 h-4" />
                                        Send Enquiry
                                    </span>
                                )}
                            </Button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <div className="p-4 bg-green-500/20 text-green-300 rounded-xl text-center border border-green-500/30">
                                    ✓ Thank you! We'll get back to you soon.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/20 text-red-300 rounded-xl text-center border border-red-500/30">
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info Side */}
                    <div className="space-y-6">
                        {/* Contact Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Phone */}
                            <a
                                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                                className="group flex items-center p-5 bg-white/10 rounded-xl border border-secondary/20 hover:border-primary transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                                    <Phone className="w-5 h-5 text-secondary group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60">Call Us</p>
                                    <p className="font-medium text-white">{settings.phone}</p>
                                </div>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center p-5 bg-white/10 rounded-xl border border-secondary/20 hover:border-green-500 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-500 transition-colors">
                                    <svg className="w-5 h-5 text-green-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-white/60">WhatsApp</p>
                                    <p className="font-medium text-white">{settings.whatsapp}</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${settings.email}`}
                                className="group flex items-center p-5 bg-white/10 rounded-xl border border-secondary/20 hover:border-primary transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                                    <Mail className="w-5 h-5 text-secondary group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60">Email</p>
                                    <p className="font-medium text-white text-sm">{settings.email}</p>
                                </div>
                            </a>

                            {/* Working Hours */}
                            <div className="flex items-center p-5 bg-white/10 rounded-xl border border-secondary/20">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                                    <Clock className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60">Working Hours</p>
                                    <p className="font-medium text-white text-sm">{settings.workingHours}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-white/10 rounded-xl p-5 border border-secondary/20">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 mb-1">Our Location</p>
                                    <p className="font-medium text-white">{settings.address}</p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-secondary text-sm hover:underline mt-2 inline-block"
                                    >
                                        View on Google Maps →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white/10 rounded-xl p-5 border border-secondary/20">
                            <h4 className="text-white/80 text-sm mb-4">Follow Us</h4>
                            <div className="flex space-x-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-secondary/30 bg-transparent text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                                >
                                    <Facebook className="h-4 w-4" />
                                    <span className="sr-only">Facebook</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-secondary/30 bg-transparent text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300"
                                >
                                    <Instagram className="h-4 w-4" />
                                    <span className="sr-only">Instagram</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent mb-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                        <a href="#" className="text-white/70 hover:text-secondary transition-colors duration-300">Home</a>
                        <a href="#services" className="text-white/70 hover:text-secondary transition-colors duration-300">Services</a>
                        <a href="#about" className="text-white/70 hover:text-secondary transition-colors duration-300">About</a>
                        <a href="#gallery" className="text-white/70 hover:text-secondary transition-colors duration-300">Gallery</a>
                        <a href="#offers" className="text-white/70 hover:text-secondary transition-colors duration-300">Offers</a>
                    </nav>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-sm text-white/60">
                            © {new Date().getFullYear()} <span className="text-secondary">Honey Herbal</span> Beauty Parlor
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export { StackedCircularFooter }
