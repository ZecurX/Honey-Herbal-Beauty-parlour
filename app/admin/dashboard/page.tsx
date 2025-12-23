'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEnquiry } from '@/context/EnquiryContext';
import { useGallery } from '@/context/GalleryContext';
import { useServices } from '@/context/ServicesContext';
import { usePackages } from '@/context/PackagesContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';

// Icons
const EnvelopeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const SparkleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const ImageIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ServicesStatsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const GiftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);

const PlusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const InboxIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
);

const GlobeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
);

export default function DashboardPage() {
    const { isAuthenticated } = useAuth();
    const { enquiries, loading: enquiriesLoading } = useEnquiry();
    const { gallery, loading: galleryLoading } = useGallery();
    const { services, loading: servicesLoading } = useServices();
    const { packages, loading: packagesLoading } = usePackages();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const newEnquiries = enquiries.filter(e => e.status === 'New').length;
    const totalEnquiries = enquiries.length;
    const totalGalleryImages = gallery.length;
    const totalServices = services.length;
    const totalPackages = packages.length;

    const stats = [
        { label: 'Total Enquiries', value: totalEnquiries, icon: <EnvelopeIcon />, color: 'bg-blue-100 text-blue-600' },
        { label: 'New Enquiries', value: newEnquiries, icon: <SparkleIcon />, color: 'bg-green-100 text-green-600' },
        { label: 'Gallery Images', value: totalGalleryImages, icon: <ImageIcon />, color: 'bg-purple-100 text-purple-600' },
        { label: 'Services', value: totalServices, icon: <ServicesStatsIcon />, color: 'bg-orange-100 text-orange-600' },
        { label: 'Packages', value: totalPackages, icon: <GiftIcon />, color: 'bg-pink-100 text-pink-600' },
    ];

    const isLoading = enquiriesLoading || galleryLoading || servicesLoading || packagesLoading;

    if (!isAuthenticated) {
        return null;
    }

    return (
        <AdminSidebarLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">
                        Dashboard
                    </h1>
                    <p className="text-gray-light mt-1">Welcome back to Honey Herbal admin panel</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-light text-xs sm:text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold text-charcoal mt-1">
                                        {isLoading ? '...' : stat.value}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/admin/gallery"
                            className="flex items-center p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors group"
                        >
                            <span className="mr-3 text-primary"><PlusIcon /></span>
                            <span className="font-medium text-charcoal group-hover:text-primary transition-colors">
                                Add Photo
                            </span>
                        </Link>
                        <Link
                            href="/admin/enquiries"
                            className="flex items-center p-4 bg-secondary/20 rounded-xl hover:bg-secondary/30 transition-colors group"
                        >
                            <span className="mr-3 text-secondary-dark"><InboxIcon /></span>
                            <span className="font-medium text-charcoal group-hover:text-secondary-dark transition-colors">
                                View Enquiries
                            </span>
                        </Link>
                        <Link
                            href="/admin/services"
                            className="flex items-center p-4 bg-orange-100 rounded-xl hover:bg-orange-200 transition-colors group"
                        >
                            <span className="mr-3 text-orange-600"><ServicesStatsIcon /></span>
                            <span className="font-medium text-charcoal group-hover:text-orange-600 transition-colors">
                                Manage Services
                            </span>
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition-colors group"
                        >
                            <span className="mr-3 text-purple-600"><GlobeIcon /></span>
                            <span className="font-medium text-charcoal group-hover:text-purple-600 transition-colors">
                                View Website
                            </span>
                        </a>
                    </div>
                </div>

                {/* Recent Enquiries */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-xl font-semibold text-charcoal">
                            Recent Enquiries
                        </h2>
                        <Link href="/admin/enquiries" className="text-primary hover:underline text-sm font-medium">
                            View All →
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8 text-gray-light">Loading...</div>
                    ) : enquiries.length === 0 ? (
                        <div className="text-center py-8 text-gray-light">
                            <InboxIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No enquiries yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-secondary-light">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Service</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enquiries.slice(0, 5).map((enquiry) => (
                                        <tr key={enquiry.id} className="border-b border-secondary-light/50 last:border-0 hover:bg-secondary-light/20">
                                            <td className="py-3 px-4 text-sm text-charcoal font-medium">{enquiry.name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-light">{enquiry.service}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${enquiry.status === 'New' ? 'bg-green-100 text-green-700' :
                                                    enquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {enquiry.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-light">
                                                {new Date(enquiry.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
