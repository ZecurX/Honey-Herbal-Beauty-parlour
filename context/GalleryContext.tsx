'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { GalleryItem } from '@/types';
import { galleryApi } from '@/services/api';

interface GalleryContextType {
    gallery: GalleryItem[];
    loading: boolean;
    error: string | null;
    addItem: (item: { imageUrl: string; caption: string; category: GalleryItem['category'] }) => Promise<void>;
    updateItem: (id: string, item: Partial<GalleryItem>) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
    refreshGallery: () => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Fallback gallery data for when API fails
const fallbackGallery: GalleryItem[] = [
    {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
        caption: 'Premium Hair Styling',
        category: 'Hair',
        createdAt: '2024-12-01'
    },
    {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400',
        caption: 'Relaxing Facial Treatment',
        category: 'Facial',
        createdAt: '2024-12-05'
    },
    {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
        caption: 'Bridal Makeup Artistry',
        category: 'Bridal',
        createdAt: '2024-12-10'
    },
    {
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        caption: 'Natural Hair Coloring',
        category: 'Hair',
        createdAt: '2024-12-12'
    },
    {
        id: '5',
        imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400',
        caption: 'Herbal Glow Facial',
        category: 'Facial',
        createdAt: '2024-12-14'
    },
    {
        id: '6',
        imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400',
        caption: 'Traditional Bridal Look',
        category: 'Bridal',
        createdAt: '2024-12-15'
    },
    {
        id: '7',
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
        caption: 'Spa Treatment',
        category: 'Other',
        createdAt: '2024-12-16'
    },
    {
        id: '8',
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
        caption: 'Skin Rejuvenation',
        category: 'Facial',
        createdAt: '2024-12-17'
    }
];

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGallery = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await galleryApi.getAll();
            if (data && Array.isArray(data) && data.length > 0) {
                setGallery(data);
            } else {
                // Keep fallback gallery if API returns empty
                setGallery(fallbackGallery);
            }
        } catch (err) {
            console.error('Failed to fetch gallery:', err);
            setError('Failed to load gallery');
            // Keep fallback data on error
            setGallery(fallbackGallery);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGallery();
    }, [fetchGallery]);

    const addItem = async (item: { imageUrl: string; caption: string; category: GalleryItem['category'] }) => {
        try {
            const newItem = await galleryApi.add(item);
            setGallery(prev => [newItem, ...prev]);
        } catch (err) {
            console.error('Failed to add item:', err);
            throw err;
        }
    };

    const updateItem = async (id: string, updates: Partial<GalleryItem>) => {
        try {
            const updatedItem = await galleryApi.update(id, updates);
            setGallery(prev => prev.map(item => item.id === id ? updatedItem : item));
        } catch (err) {
            console.error('Failed to update item:', err);
            throw err;
        }
    };

    const deleteItem = async (id: string) => {
        try {
            await galleryApi.delete(id);
            setGallery(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error('Failed to delete item:', err);
            throw err;
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        return await galleryApi.uploadImage(file);
    };

    const refreshGallery = async () => {
        await fetchGallery();
    };

    return (
        <GalleryContext.Provider value={{ gallery, loading, error, addItem, updateItem, deleteItem, uploadImage, refreshGallery }}>
            {children}
        </GalleryContext.Provider>
    );
};

export const useGallery = (): GalleryContextType => {
    const context = useContext(GalleryContext);
    if (!context) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
};
