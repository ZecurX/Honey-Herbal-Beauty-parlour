// Service interface
export interface Service {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    icon?: string;
    image?: string;
}

// Gallery item interface
export interface GalleryItem {
    id: string;
    imageUrl: string;
    caption: string;
    category: 'Hair' | 'Facial' | 'Bridal' | 'Other';
    createdAt: string;
}

// Enquiry interface
export interface Enquiry {
    id: string;
    name: string;
    phone: string;
    email?: string;
    service: string;
    message: string;
    status: 'New' | 'Contacted' | 'Closed';
    notes?: string;
    createdAt: string;
}

// Offer interface
export interface Offer {
    id: string;
    title: string;
    description: string;
    discount?: string;
    validUntil?: string;
    image?: string;
}

// Testimonial interface
export interface Testimonial {
    id: string;
    name?: string;
    clientName?: string;
    role?: string;
    testimonial?: string;
    quote?: string;
    rating: number;
    imageUrl?: string;
    createdAt?: string;
}

// Settings interface
export interface Settings {
    businessName: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    workingHours: string;
    heroTagline: string;
    aboutText: string;
    socialLinks: {
        facebook?: string;
        instagram?: string;
    };
}

// Auth user interface
export interface AuthUser {
    email: string;
    name: string;
    role: 'admin';
}
