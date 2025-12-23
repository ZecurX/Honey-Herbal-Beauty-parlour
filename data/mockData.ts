import { Service, GalleryItem, Enquiry, Offer, Testimonial, Settings } from '@/types';

// Mock Settings
export const mockSettings: Settings = {
    businessName: 'Honey Herbal Beauty Parlor',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'hello@honeyherbal.com',
    address: '123 Green Lane, Botanical Garden Road, Mumbai - 400001',
    workingHours: 'Mon-Sat: 10AM - 8PM | Sun: 10AM - 6PM',
    heroTagline: 'Experience the Power of Nature for Your Beauty',
    aboutText: `At Honey Herbal Beauty Parlor, we believe that true beauty comes from nature. Our salon combines centuries-old herbal traditions with modern beauty techniques to give you a radiant, natural glow.

Founded with a passion for organic beauty care, we use only the finest herbal ingredients sourced from trusted suppliers. Our trained beauticians specialize in treatments that nourish your skin and hair without harsh chemicals.

Whether you're preparing for your special day or treating yourself to some self-care, our personalized services ensure you leave feeling refreshed, rejuvenated, and beautiful inside out.`,
    socialLinks: {
        facebook: 'https://facebook.com/honeyherbal',
        instagram: 'https://instagram.com/honeyherbal'
    }
};

// Mock Services
export const mockServices: Service[] = [
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

// Mock Gallery Items
export const mockGallery: GalleryItem[] = [
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

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
    {
        id: '1',
        quote: 'The herbal facial was absolutely amazing! My skin has never felt so fresh and rejuvenated. The staff is incredibly professional and caring.',
        clientName: 'Priya S.',
        rating: 5
    },
    {
        id: '2',
        quote: 'Best bridal makeup experience! They made my special day even more beautiful. Highly recommend their herbal products.',
        clientName: 'Anita M.',
        rating: 5
    },
    {
        id: '3',
        quote: 'I love that they use all-natural products. The results are visible and my hair has never been healthier. Thank you, Honey Herbal!',
        clientName: 'Kavitha R.',
        rating: 5
    },
    {
        id: '4',
        quote: 'Wonderful ambiance and excellent service. The herbal body treatment was so relaxing. Will definitely come back!',
        clientName: 'Deepa K.',
        rating: 4
    }
];

// Mock Offers
export const mockOffers: Offer[] = [
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

// Mock Enquiries (for admin)
export const mockEnquiries: Enquiry[] = [
    {
        id: '1',
        name: 'Sneha Patel',
        phone: '+91 99887 76655',
        email: 'sneha@email.com',
        service: 'Bridal Makeup',
        message: 'I am getting married in February and would like to know about your bridal packages.',
        status: 'New',
        createdAt: '2024-12-18T10:30:00'
    },
    {
        id: '2',
        name: 'Meera Sharma',
        phone: '+91 88776 65544',
        service: 'Herbal Facials',
        message: 'Do you offer packages for multiple facial sessions?',
        status: 'Contacted',
        notes: 'Called back, explained monthly package options',
        createdAt: '2024-12-17T14:00:00'
    },
    {
        id: '3',
        name: 'Ritu Verma',
        phone: '+91 77665 54433',
        email: 'ritu.v@email.com',
        service: 'Hair Care',
        message: 'Looking for organic hair color options. What brands do you use?',
        status: 'Closed',
        notes: 'Visited salon, did organic coloring',
        createdAt: '2024-12-15T09:00:00'
    }
];
