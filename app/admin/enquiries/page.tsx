'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEnquiry } from '@/context/EnquiryContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';

// Icons
const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const RefreshIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

export default function EnquiriesManagementPage() {
    const { isAuthenticated } = useAuth();
    const { enquiries, loading, updateEnquiry, deleteEnquiry, refreshEnquiries, downloadExcel } = useEnquiry();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const handleStatusChange = async (id: string, status: string) => {
        await updateEnquiry(id, { status: status as 'New' | 'Contacted' | 'Closed' });
        refreshEnquiries();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this enquiry?')) {
            try {
                // Using admin123 as the default password
                const success = await deleteEnquiry(id, 'admin123');
                if (success) {
                    alert('Enquiry deleted successfully!');
                    refreshEnquiries();
                } else {
                    alert('Failed to delete enquiry.');
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete enquiry. Please try again.');
            }
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await refreshEnquiries();
        setRefreshing(false);
    };


    const handleDownloadCSV = () => {
        if (!enquiries || enquiries.length === 0) {
            alert('No enquiries to download');
            return;
        }

        try {
            // Helper to escape CSV fields properly
            const escapeCSVField = (field: string | undefined | null): string => {
                if (field === undefined || field === null) return '';
                const str = String(field);
                if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            // CSV Headers
            const headers = ['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date', 'Notes'];

            // CSV Rows
            const rows = enquiries.map(enquiry => [
                escapeCSVField(enquiry.name),
                escapeCSVField(enquiry.email || ''),
                escapeCSVField(enquiry.phone),
                escapeCSVField(enquiry.service),
                escapeCSVField(enquiry.message),
                escapeCSVField(enquiry.status),
                escapeCSVField(new Date(enquiry.createdAt).toLocaleDateString('en-IN')),
                escapeCSVField(enquiry.notes || '')
            ]);

            // Build CSV content
            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');

            // Create filename
            const today = new Date();
            const filename = `Honey_Herbal_Enquiries_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}.csv`;

            // Download using data URI
            const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', dataUri);
            link.setAttribute('download', filename);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('CSV downloaded successfully!');
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download CSV. Please try again.');
        }
    };

    if (!isAuthenticated) return null;

    return (
        <AdminSidebarLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Enquiries Management</h1>
                        <p className="text-gray-light mt-1">View and manage customer enquiries</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing || loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary text-charcoal rounded-xl font-medium hover:bg-secondary-light/20 transition-colors disabled:opacity-50"
                        >
                            <span className={refreshing ? 'animate-spin' : ''}>
                                <RefreshIcon />
                            </span>
                            {refreshing ? 'Refreshing...' : 'Reload Data'}
                        </button>
                        <button
                            onClick={handleDownloadCSV}
                            disabled={!enquiries || enquiries.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                        >
                            <DownloadIcon />
                            Download CSV
                        </button>
                    </div>
                </div>

                {/* Enquiries List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-4">All Enquiries ({(enquiries || []).length})</h2>

                    {loading ? (
                        <div className="text-center py-8 text-gray-light">Loading...</div>
                    ) : !enquiries || enquiries.length === 0 ? (
                        <div className="text-center py-8 text-gray-light">No enquiries yet</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-secondary-light">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Contact</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Service</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Message</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Date</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-light">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enquiries.map((enquiry) => (
                                        <tr key={enquiry.id} className="border-b border-secondary-light/50 last:border-0 hover:bg-secondary-light/20">
                                            <td className="py-3 px-4 text-sm text-charcoal font-medium">{enquiry.name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-light">
                                                <div>{enquiry.phone}</div>
                                                <div className="text-xs">{enquiry.email}</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-light">{enquiry.service}</td>
                                            <td className="py-3 px-4 text-sm text-gray-light max-w-xs truncate">{enquiry.message}</td>
                                            <td className="py-3 px-4">
                                                <select
                                                    value={enquiry.status}
                                                    onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                                                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${enquiry.status === 'New' ? 'bg-green-100 text-green-700' :
                                                        enquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-light">
                                                {new Date(enquiry.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <button
                                                    onClick={() => handleDelete(enquiry.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Delete
                                                </button>
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

