'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Testimonial } from '@/types';
import { testimonialsApi } from '@/services/api';

interface TestimonialsContextType {
    testimonials: Testimonial[];
    loading: boolean;
    addTestimonial: (testimonial: { name?: string; role?: string; testimonial?: string; rating: number; imageUrl?: string }) => Promise<Testimonial>;
    updateTestimonial: (id: string, updates: Partial<Testimonial>) => Promise<void>;
    deleteTestimonial: (id: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
    refreshTestimonials: () => Promise<void>;
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(undefined);

export const TestimonialsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = useCallback(async () => {
        try {
            setLoading(true);
            const data = await testimonialsApi.getAll();
            setTestimonials(data);
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    const addTestimonial = async (testimonial: { name?: string; role?: string; testimonial?: string; rating: number; imageUrl?: string }): Promise<Testimonial> => {
        const newTestimonial = await testimonialsApi.add(testimonial as Omit<Testimonial, 'id' | 'createdAt'>);
        setTestimonials(prev => [...prev, newTestimonial]);
        return newTestimonial;
    };

    const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
        const updated = await testimonialsApi.update(id, updates);
        setTestimonials(prev => prev.map(t => t.id === id ? updated : t));
    };

    const deleteTestimonial = async (id: string) => {
        await testimonialsApi.delete(id);
        setTestimonials(prev => prev.filter(t => t.id !== id));
    };

    const uploadImage = async (file: File): Promise<string> => {
        return await testimonialsApi.uploadImage(file);
    };

    const refreshTestimonials = async () => {
        await fetchTestimonials();
    };

    return (
        <TestimonialsContext.Provider value={{
            testimonials,
            loading,
            addTestimonial,
            updateTestimonial,
            deleteTestimonial,
            uploadImage,
            refreshTestimonials
        }}>
            {children}
        </TestimonialsContext.Provider>
    );
};

export const useTestimonials = (): TestimonialsContextType => {
    const context = useContext(TestimonialsContext);
    if (!context) {
        throw new Error('useTestimonials must be used within a TestimonialsProvider');
    }
    return context;
};
