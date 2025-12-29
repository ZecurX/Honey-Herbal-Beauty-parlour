'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/context/SettingsContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';

export default function SettingsPage() {
    const { isAuthenticated } = useAuth();
    const { settings, updateSettings } = useSettings();
    const router = useRouter();

    const [formData, setFormData] = useState({
        businessName: '',
        heroTagline: '',
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        workingHours: '',
        instagramUrl: '',
        facebookUrl: ''
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (settings) {
            setFormData({
                businessName: settings.businessName || '',
                heroTagline: settings.heroTagline || '',
                phone: settings.phone || '',
                whatsapp: settings.whatsapp || '',
                email: settings.email || '',
                address: settings.address || '',
                workingHours: settings.workingHours || '',
                instagramUrl: settings.socialLinks?.instagram || '',
                facebookUrl: settings.socialLinks?.facebook || ''
            });
        }
    }, [settings]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await updateSettings({
            ...settings,
            businessName: formData.businessName,
            heroTagline: formData.heroTagline,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            email: formData.email,
            address: formData.address,
            workingHours: formData.workingHours,
            socialLinks: {
                instagram: formData.instagramUrl,
                facebook: formData.facebookUrl
            }
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!isAuthenticated) return null;

    return (
        <AdminSidebarLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Settings</h1>
                    <p className="text-gray-light mt-1">Manage your business information</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Business Name</label>
                            <input
                                type="text"
                                value={formData.businessName}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Hero Tagline</label>
                            <textarea
                                value={formData.heroTagline}
                                onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">WhatsApp</label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Address</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Working Hours</label>
                            <input
                                type="text"
                                value={formData.workingHours}
                                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                                placeholder="e.g., Mon-Sat: 10AM - 8PM | Sun: 10AM - 6PM"
                                className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        {/* Social Media Links */}
                        <div className="border-t border-secondary/30 pt-5 mt-5">
                            <h3 className="text-sm font-semibold text-charcoal mb-4">Social Media Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Instagram URL</label>
                                    <input
                                        type="url"
                                        value={formData.instagramUrl}
                                        onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                                        placeholder="https://instagram.com/yourpage"
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Facebook URL</label>
                                    <input
                                        type="url"
                                        value={formData.facebookUrl}
                                        onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                                        placeholder="https://facebook.com/yourpage"
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Settings'}
                            </button>
                            {saved && (
                                <span className="text-green-600 text-sm font-medium">✓ Settings saved!</span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
