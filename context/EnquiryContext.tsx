'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Enquiry } from '@/types';
import { enquiryApi } from '@/services/api';

interface EnquiryContextType {
    enquiries: Enquiry[];
    loading: boolean;
    updateEnquiry: (id: string, updates: { status?: Enquiry['status']; notes?: string }) => Promise<void>;
    deleteEnquiry: (id: string, password: string) => Promise<boolean>;
    refreshEnquiries: () => Promise<void>;
    downloadExcel: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = useCallback(async () => {
        try {
            setLoading(true);
            const data = await enquiryApi.getAll();
            setEnquiries(data);
        } catch (error) {
            console.error('Failed to fetch enquiries:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEnquiries();
    }, [fetchEnquiries]);

    const updateEnquiry = async (id: string, updates: { status?: Enquiry['status']; notes?: string }) => {
        const updatedEnquiry = await enquiryApi.update(id, updates);
        setEnquiries(prev => prev.map(e => e.id === id ? updatedEnquiry : e));
    };

    const deleteEnquiry = async (id: string, password: string): Promise<boolean> => {
        try {
            await enquiryApi.delete(id, password);
            setEnquiries(prev => prev.filter(e => e.id !== id));
            return true;
        } catch (error) {
            console.error('Failed to delete enquiry:', error);
            return false;
        }
    };

    const refreshEnquiries = async () => {
        await fetchEnquiries();
    };

    // Download as CSV file that opens in Excel
    const downloadExcel = () => {
        // CSV headers
        const headers = ['Name', 'Phone', 'Email', 'Service', 'Message', 'Status', 'Notes', 'Date'];

        // Helper function to escape CSV values
        const escapeCSV = (value: string) => {
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        };

        // Convert enquiries to CSV rows
        const rows = enquiries.map(e => [
            escapeCSV(e.name),
            escapeCSV(e.phone),
            escapeCSV(e.email || ''),
            escapeCSV(e.service),
            escapeCSV(e.message),
            escapeCSV(e.status),
            escapeCSV(e.notes || ''),
            new Date(e.createdAt).toLocaleString()
        ].join(','));

        // Create CSV content with BOM for Excel compatibility
        const BOM = '\uFEFF';
        const csvContent = BOM + headers.join(',') + '\n' + rows.join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);

        // Create filename with date
        const date = new Date().toISOString().split('T')[0];
        const filename = `Honey_Herbal_Enquiries_${date}.csv`;

        // Create link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <EnquiryContext.Provider value={{ enquiries, loading, updateEnquiry, deleteEnquiry, refreshEnquiries, downloadExcel }}>
            {children}
        </EnquiryContext.Provider>
    );
};

export const useEnquiry = (): EnquiryContextType => {
    const context = useContext(EnquiryContext);
    if (!context) {
        throw new Error('useEnquiry must be used within an EnquiryProvider');
    }
    return context;
};
