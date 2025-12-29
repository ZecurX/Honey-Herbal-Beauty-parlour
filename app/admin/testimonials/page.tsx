'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTestimonials } from '@/context/TestimonialsContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';
import { Testimonial } from '@/types';

// Icons
const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const DeleteIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

interface TestimonialFormData {
    name: string;
    role: string;
    testimonial: string;
    rating: number;
}

export default function TestimonialsManagementPage() {
    const { isAuthenticated } = useAuth();
    const { testimonials, loading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<TestimonialFormData>({
        name: '',
        role: '',
        testimonial: '',
        rating: 5
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const resetForm = () => {
        setFormData({ name: '', role: '', testimonial: '', rating: 5 });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setFormData({
            name: testimonial.name || '',
            role: testimonial.role || '',
            testimonial: testimonial.testimonial || '',
            rating: testimonial.rating
        });
        setEditingId(testimonial.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await deleteTestimonial(id);
                alert('Testimonial deleted successfully!');
            } catch (error) {
                console.error('Failed to delete testimonial:', error);
                alert('Failed to delete testimonial. Please try again.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.testimonial) {
            alert('Please fill in name and testimonial');
            return;
        }

        try {
            if (editingId) {
                await updateTestimonial(editingId, formData);
            } else {
                await addTestimonial(formData);
            }
            resetForm();
        } catch (error) {
            console.error('Failed to save testimonial:', error);
            alert('Failed to save testimonial. Please try again.');
        }
    };

    if (!isAuthenticated) return null;

    return (
        <AdminSidebarLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Testimonials Management</h1>
                        <p className="text-gray-light mt-1">Manage customer reviews and testimonials</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                        <PlusIcon />
                        Add Testimonial
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary-light">
                        <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
                            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Customer Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-xl border border-secondary-light focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="e.g., Priya Sharma"
                                        required
                                    />
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Role/Title</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-xl border border-secondary-light focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="e.g., Regular Client, Bride"
                                    />
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Testimonial *</label>
                                <textarea
                                    value={formData.testimonial}
                                    onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-xl border border-secondary-light focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                                    placeholder="Customer's feedback..."
                                    required
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                            className="p-1 hover:scale-110 transition-transform"
                                        >
                                            <StarIcon filled={star <= formData.rating} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                                >
                                    {editingId ? 'Update' : 'Add'} Testimonial
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-gray-200 text-charcoal rounded-xl font-medium hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Testimonials List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
                        All Testimonials ({(testimonials || []).length})
                    </h2>

                    {loading ? (
                        <div className="text-center py-8 text-gray-light">Loading...</div>
                    ) : !testimonials || testimonials.length === 0 ? (
                        <div className="text-center py-8 text-gray-light">
                            No testimonials yet. Add your first customer testimonial!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="border border-secondary-light rounded-xl p-4 hover:border-primary transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={testimonial.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                                            alt={testimonial.name || testimonial.clientName || 'Client'}
                                            className="w-14 h-14 rounded-full object-cover shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <div>
                                                    <h3 className="font-medium text-charcoal">{testimonial.name || testimonial.clientName}</h3>
                                                    <p className="text-xs text-gray-light">{testimonial.role || 'Client'}</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon key={i} filled={i < testimonial.rating} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-light mt-2 line-clamp-3">
                                                "{testimonial.testimonial || testimonial.quote}"
                                            </p>
                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => handleEdit(testimonial)}
                                                    className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark"
                                                >
                                                    <EditIcon /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(testimonial.id)}
                                                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
                                                >
                                                    <DeleteIcon /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
