'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Offer } from '@/types';
import { packagesApi } from '@/services/api';

interface PackagesContextType {
    packages: Offer[];
    loading: boolean;
    error: string | null;
    addPackage: (pkg: Omit<Offer, 'id'>) => Promise<void>;
    updatePackage: (id: string, pkg: Partial<Offer>) => Promise<void>;
    deletePackage: (id: string) => Promise<void>;
    refreshPackages: () => Promise<void>;
}

const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

// Fallback packages data for when API fails
const fallbackPackages: Offer[] = [
    {
        id: '1',
        title: 'Bridal Glow Package',
        description: 'Complete pre-wedding skincare with 5 herbal facials, body polishing, and hair spa.',
        discount: 'Save 20%',
        validUntil: '2025-01-31'
    },
    {
        id: '2',
        title: 'Festive Beauty Combo',
        description: 'Facial + Manicure + Pedicure + Hair Styling at a special combo price.',
        discount: '₹500 Off',
        validUntil: '2025-01-15'
    },
    {
        id: '3',
        title: 'First Visit Special',
        description: 'Get 15% off on all services for your first visit to Honey Herbal.',
        discount: '15% Off',
        validUntil: '2025-03-31'
    }
];

export const PackagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [packages, setPackages] = useState<Offer[]>(fallbackPackages);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPackages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await packagesApi.getAll();
            // Accept empty arrays - they're valid after deleting all items
            if (data && Array.isArray(data)) {
                setPackages(data);
            } else {
                // Only use fallback if API fails entirely
                setPackages(fallbackPackages);
            }
        } catch (err) {
            console.error('Failed to fetch packages:', err);
            setError('Failed to load packages');
            // Only use fallback on initial load error, not refresh
            if (packages.length === 0) {
                setPackages(fallbackPackages);
            }
        } finally {
            setLoading(false);
        }
    }, [packages.length]);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    const addPackage = async (pkg: Omit<Offer, 'id'>) => {
        try {
            const newPackage = await packagesApi.add(pkg);
            setPackages(prev => [...prev, newPackage]);
        } catch (err) {
            console.error('Failed to add package:', err);
            throw err;
        }
    };

    const updatePackage = async (id: string, updates: Partial<Offer>) => {
        try {
            const updatedPackage = await packagesApi.update(id, updates);
            setPackages(prev => prev.map(p => p.id === id ? updatedPackage : p));
        } catch (err) {
            console.error('Failed to update package:', err);
            throw err;
        }
    };

    const deletePackage = async (id: string) => {
        try {
            await packagesApi.delete(id);
            setPackages(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Failed to delete package:', err);
            throw err;
        }
    };

    const refreshPackages = async () => {
        await fetchPackages();
    };

    return (
        <PackagesContext.Provider value={{ packages, loading, error, addPackage, updatePackage, deletePackage, refreshPackages }}>
            {children}
        </PackagesContext.Provider>
    );
};

export const usePackages = (): PackagesContextType => {
    const context = useContext(PackagesContext);
    if (!context) {
        throw new Error('usePackages must be used within a PackagesProvider');
    }
    return context;
};
