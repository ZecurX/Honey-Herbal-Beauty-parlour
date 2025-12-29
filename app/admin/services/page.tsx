'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useServices } from '@/context/ServicesContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';

export default function ServicesManagementPage() {
    const { isAuthenticated } = useAuth();
    const { services, loading, addService, updateService, deleteService, refreshServices } = useServices();
    const router = useRouter();

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [newService, setNewService] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Facial'
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateService(editingId, {
                    title: newService.title,
                    description: newService.description,
                    price: newService.price,
                    category: newService.category
                });
                setEditingId(null);
            } else {
                await addService({
                    title: newService.title,
                    description: newService.description,
                    price: newService.price,
                    category: newService.category
                });
            }
            setNewService({ title: '', description: '', price: '', category: 'Facial' });
            setShowAddForm(false);
            refreshServices();
        } catch (error) {
            console.error('Failed to save service:', error);
            setErrorMessage(editingId ? 'Failed to update service. Please try again.' : 'Failed to add service. Please try again.');
        }
    };

    const handleEditClick = (service: any) => {
        setNewService({
            title: service.title,
            description: service.description,
            price: service.price,
            category: service.category
        });
        setEditingId(service.id);
        setShowAddForm(true);
    };

    const handleCancelForm = () => {
        setNewService({ title: '', description: '', price: '', category: 'Facial' });
        setEditingId(null);
        setShowAddForm(false);
    };

    const handleDeleteClick = (id: string) => {
        setDeleteConfirmId(id);
        setErrorMessage(null);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteConfirmId) return;

        setDeletingId(deleteConfirmId);
        setErrorMessage(null);

        try {
            await deleteService(deleteConfirmId);
            setDeleteConfirmId(null);
            await refreshServices();
        } catch (error) {
            console.error('Failed to delete service:', error);
            setErrorMessage('Failed to delete service. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmId(null);
    };

    if (!isAuthenticated) return null;

    return (
        <AdminSidebarLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Services Management</h1>
                        <p className="text-gray-light mt-1">Add, edit, or remove services</p>
                    </div>
                    <button
                        onClick={() => showAddForm ? handleCancelForm() : setShowAddForm(true)}
                        className="btn-primary"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Service'}
                    </button>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
                        <span>{errorMessage}</span>
                        <button onClick={() => setErrorMessage(null)} className="text-red-500 hover:text-red-700">
                            ✕
                        </button>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirmId && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-light mb-6">
                                Are you sure you want to delete this service? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="px-4 py-2 rounded-xl border border-secondary hover:bg-gray-50 transition-colors"
                                    disabled={deletingId !== null}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    disabled={deletingId !== null}
                                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {deletingId ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Form */}
                {showAddForm && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
                            {editingId ? 'Edit Service' : 'Add New Service'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={newService.title}
                                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="e.g., Herbal Facial"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Price</label>
                                    <input
                                        type="text"
                                        value={newService.price}
                                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="e.g., ₹500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Category</label>
                                <select
                                    value={newService.category}
                                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="Facial">Facial</option>
                                    <option value="Hair">Hair</option>
                                    <option value="Bridal">Bridal</option>
                                    <option value="Waxing">Waxing</option>
                                    <option value="Body">Body</option>
                                    <option value="Nails">Nails</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none resize-none"
                                    placeholder="Describe the service..."
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                {editingId ? 'Update Service' : 'Add Service'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Services List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-4">All Services ({(services || []).length})</h2>

                    {loading ? (
                        <div className="text-center py-8 text-gray-light">Loading...</div>
                    ) : !services || services.length === 0 ? (
                        <div className="text-center py-8 text-gray-light">No services added yet</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {services.map((service) => (
                                <div key={service.id} className="border border-secondary-light rounded-xl p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                            {service.category}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditClick(service)}
                                                className="text-primary hover:text-primary-dark text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(service.id)}
                                                disabled={deletingId === service.id}
                                                className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50 flex items-center gap-1"
                                            >
                                                {deletingId === service.id ? (
                                                    <>
                                                        <div className="w-3 h-3 border-2 border-red-300 border-t-red-500 rounded-full animate-spin"></div>
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    'Delete'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-charcoal mb-1">{service.title}</h3>
                                    <p className="text-sm text-gray-light mb-2 line-clamp-2">{service.description}</p>
                                    <p className="font-bold text-primary">{service.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
