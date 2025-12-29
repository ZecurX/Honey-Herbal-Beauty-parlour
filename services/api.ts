const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

import { Package, Settings } from '@/types';

// Helper to get base URL without /api suffix
const getBaseUrl = () => API_BASE_URL.replace(/\/api$/, '');

// Gallery API
export const galleryApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/gallery`);
        const data = await res.json();
        return data.data;
    },

    add: async (item: { imageUrl: string; caption: string; category: string }) => {
        const res = await fetch(`${API_BASE_URL}/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        const data = await res.json();
        return data.data;
    },

    update: async (id: string, item: { imageUrl?: string; caption?: string; category?: string }) => {
        const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        const data = await res.json();
        return data.data;
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/gallery/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to delete gallery item');
        }
    },

    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_BASE_URL}/gallery/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        // Return full URL for display
        return `${getBaseUrl()}${data.imageUrl}`;
    }
};

// Enquiry API
export const enquiryApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/enquiries`);
        const data = await res.json();
        return data.data;
    },

    update: async (id: string, updates: { status?: string; notes?: string }) => {
        const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        const data = await res.json();
        return data.data;
    },

    add: async (enquiry: { name: string; phone: string; email?: string; service: string; message: string }) => {
        const res = await fetch(`${API_BASE_URL}/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enquiry)
        });
        const data = await res.json();
        return data.data;
    },

    delete: async (id: string, password: string) => {
        const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await res.json();
        if (!data.success) {
            throw new Error(data.error);
        }
        return data;
    }
};

// Settings API
export const settingsApi = {
    get: async () => {
        const res = await fetch(`${API_BASE_URL}/settings`);
        const data = await res.json();
        return data.data;
    },

    update: async (settings: Partial<Settings>) => {
        const res = await fetch(`${API_BASE_URL}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        const data = await res.json();
        return data.data;
    }
};

// Services API
export const servicesApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/services`);
        const data = await res.json();
        return data.data;
    },

    add: async (service: { title: string; description: string; price: string; category: string; icon?: string }) => {
        const res = await fetch(`${API_BASE_URL}/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(service)
        });
        const data = await res.json();
        return data.data;
    },

    update: async (id: string, service: { title?: string; description?: string; price?: string; category?: string; icon?: string }) => {
        const res = await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(service)
        });
        const data = await res.json();
        return data.data;
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to delete service');
        }
    }
};

// Packages API
export const packagesApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/packages`);
        const data = await res.json();
        return data.data || [];
    },

    add: async (pkg: Omit<Package, 'id'>) => {
        const res = await fetch(`${API_BASE_URL}/packages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pkg)
        });
        const data = await res.json();
        return data.data;
    },

    update: async (id: string, pkg: Partial<Package>) => {
        const res = await fetch(`${API_BASE_URL}/packages/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pkg)
        });
        const data = await res.json();
        return data.data;
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/packages/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to delete package');
        }
    }
};

// Testimonials API
export const testimonialsApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/testimonials`);
        const data = await res.json();
        return data.data;
    },

    add: async (testimonial: { name?: string; role?: string; testimonial?: string; rating: number; imageUrl?: string }) => {
        const res = await fetch(`${API_BASE_URL}/testimonials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testimonial)
        });
        const data = await res.json();
        return data.data;
    },

    update: async (id: string, testimonial: { name?: string; role?: string; testimonial?: string; rating?: number; imageUrl?: string }) => {
        const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testimonial)
        });
        const data = await res.json();
        return data.data;
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to delete testimonial');
        }
    },

    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_BASE_URL}/testimonials/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        return data.imageUrl;
    }
};
