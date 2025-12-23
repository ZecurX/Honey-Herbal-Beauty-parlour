'use client';

import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { mockServices } from '@/data/mockData';
import { enquiryApi } from '@/services/api';

const Contact: React.FC = () => {
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
            // Submit enquiry to API
            await enquiryApi.add({
                name: formData.name,
                phone: formData.phone,
                email: formData.email || undefined,
                service: formData.service,
                message: formData.message
            });

            setStatus('success');
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });

            // Reset after 3 seconds
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
        <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 bg-herbal/10 text-herbal rounded-full text-sm font-medium mb-4">
                        Get In Touch
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4">
                        Contact Us
                    </h2>
                    <p className="text-gray-light max-w-2xl mx-auto">
                        Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="reveal-left">
                        <div className="bg-honey rounded-2xl p-8 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-honey-dark bg-white focus:ring-2 focus:ring-herbal focus:border-transparent transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-honey-dark bg-white focus:ring-2 focus:ring-herbal focus:border-transparent transition-all outline-none"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                                        Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-honey-dark bg-white focus:ring-2 focus:ring-herbal focus:border-transparent transition-all outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                {/* Service */}
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">
                                        Service Interested In *
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-honey-dark bg-white focus:ring-2 focus:ring-herbal focus:border-transparent transition-all outline-none"
                                    >
                                        <option value="">Select a service</option>
                                        {mockServices.map(service => (
                                            <option key={service.id} value={service.title}>
                                                {service.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-honey-dark bg-white focus:ring-2 focus:ring-herbal focus:border-transparent transition-all outline-none resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full px-6 py-4 bg-herbal text-white rounded-xl font-medium hover:bg-herbal-dark transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Enquiry'
                                    )}
                                </button>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center">
                                        ✓ Thank you! We&apos;ll get back to you soon.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center">
                                        Something went wrong. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Contact Info & Map */}
                    <div className="reveal-right space-y-8">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Phone */}
                            <a
                                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                                className="group flex items-center p-6 bg-honey rounded-xl hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-herbal/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-herbal group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6 text-herbal group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-light">Call Us</p>
                                    <p className="font-medium text-charcoal">{settings.phone}</p>
                                </div>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center p-6 bg-honey rounded-xl hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-500 transition-colors">
                                    <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-light">WhatsApp</p>
                                    <p className="font-medium text-charcoal">{settings.whatsapp}</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${settings.email}`}
                                className="group flex items-center p-6 bg-honey rounded-xl hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-herbal/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-herbal group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6 text-herbal group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-light">Email</p>
                                    <p className="font-medium text-charcoal">{settings.email}</p>
                                </div>
                            </a>

                            {/* Working Hours */}
                            <div className="flex items-center p-6 bg-honey rounded-xl">
                                <div className="w-12 h-12 bg-herbal/10 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-herbal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-light">Working Hours</p>
                                    <p className="font-medium text-charcoal text-sm">{settings.workingHours}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-honey rounded-xl p-6">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-herbal/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <svg className="w-6 h-6 text-herbal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-light">Our Location</p>
                                    <p className="font-medium text-charcoal">{settings.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-honey-dark rounded-xl h-64 flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                                <svg className="w-16 h-16 text-herbal/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                <p className="text-gray-light text-sm">
                                    Map integration coming soon<br />
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-herbal hover:underline"
                                    >
                                        View on Google Maps →
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
