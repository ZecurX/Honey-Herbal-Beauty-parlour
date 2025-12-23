'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Service } from '@/types';
import { servicesApi } from '@/services/api';

interface ServicesContextType {
    services: Service[];
    loading: boolean;
    error: string | null;
    addService: (service: Omit<Service, 'id'>) => Promise<void>;
    updateService: (id: string, service: Partial<Service>) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
    refreshServices: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Fallback services data for when API fails
const fallbackServices: Service[] = [
    {
        id: '1',
        title: 'Herbal Facials',
        description: 'Rejuvenating facials using natural herbs and organic ingredients for glowing skin.',
        price: 'Starting from ₹500',
        category: 'Facial',
        icon: '🌿'
    },
    {
        id: '2',
        title: 'Hair Care',
        description: 'Organic hair treatments, cuts, styling, and coloring with herbal products.',
        price: 'Starting from ₹300',
        category: 'Hair',
        icon: '💇'
    },
    {
        id: '3',
        title: 'Bridal Makeup',
        description: 'Complete bridal packages with mehendi, makeup, and pre-wedding treatments.',
        price: 'Contact for price',
        category: 'Bridal',
        icon: '👰'
    },
    {
        id: '4',
        title: 'Waxing Services',
        description: 'Gentle herbal waxing for smooth, irritation-free skin.',
        price: 'Starting from ₹200',
        category: 'Waxing',
        icon: '✨'
    },
    {
        id: '5',
        title: 'Herbal Body Treatments',
        description: 'Full body scrubs, wraps, and massages using natural herbal blends.',
        price: 'Starting from ₹800',
        category: 'Body',
        icon: '🍃'
    },
    {
        id: '6',
        title: 'Manicure & Pedicure',
        description: 'Luxurious nail care with organic products and herbal soaks.',
        price: 'Starting from ₹400',
        category: 'Nails',
        icon: '💅'
    }
];

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [services, setServices] = useState<Service[]>(fallbackServices);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await servicesApi.getAll();
            // Accept empty arrays - they're valid after deleting all items
            if (data && Array.isArray(data)) {
                setServices(data);
            } else {
                // Only use fallback if API fails entirely
                setServices(fallbackServices);
            }
        } catch (err) {
            console.error('Failed to fetch services:', err);
            setError('Failed to load services');
            // Only use fallback on initial load error, not refresh
            if (services.length === 0) {
                setServices(fallbackServices);
            }
        } finally {
            setLoading(false);
        }
    }, [services.length]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const addService = async (service: Omit<Service, 'id'>) => {
        try {
            const newService = await servicesApi.add(service);
            setServices(prev => [...prev, newService]);
        } catch (err) {
            console.error('Failed to add service:', err);
            throw err;
        }
    };

    const updateService = async (id: string, updates: Partial<Service>) => {
        try {
            const updatedService = await servicesApi.update(id, updates);
            setServices(prev => prev.map(s => s.id === id ? updatedService : s));
        } catch (err) {
            console.error('Failed to update service:', err);
            throw err;
        }
    };

    const deleteService = async (id: string) => {
        try {
            await servicesApi.delete(id);
            setServices(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error('Failed to delete service:', err);
            throw err;
        }
    };

    const refreshServices = async () => {
        await fetchServices();
    };

    return (
        <ServicesContext.Provider value={{ services, loading, error, addService, updateService, deleteService, refreshServices }}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = (): ServicesContextType => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};
