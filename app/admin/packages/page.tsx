'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { usePackages } from '@/context/PackagesContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';

export default function PackagesManagementPage() {
    const { isAuthenticated } = useAuth();
    const { packages, loading, addPackage, deletePackage, refreshPackages } = usePackages();
    const router = useRouter();

    const [showAddForm, setShowAddForm] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [newPackage, setNewPackage] = useState({
        title: '',
        description: '',
        discount: '',
        validUntil: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addPackage({
                title: newPackage.title,
                description: newPackage.description,
                discount: newPackage.discount || undefined,
                validUntil: newPackage.validUntil || undefined
            });
            setNewPackage({ title: '', description: '', discount: '', validUntil: '' });
            setShowAddForm(false);
            refreshPackages();
        } catch (error) {
            console.error('Failed to add package:', error);
            setErrorMessage('Failed to add package. Please try again.');
        }
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
            await deletePackage(deleteConfirmId);
            setDeleteConfirmId(null);
            await refreshPackages();
        } catch (error) {
            console.error('Failed to delete package:', error);
            setErrorMessage('Failed to delete package. Please try again.');
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
                        <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Packages Management</h1>
                        <p className="text-gray-light mt-1">Manage special offers and packages</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="btn-primary"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Package'}
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
                                Are you sure you want to delete this package? This action cannot be undone.
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
                        <h2 className="font-display text-xl font-semibold text-charcoal mb-4">Add New Package</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={newPackage.title}
                                        onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="e.g., Bridal Package"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Discount</label>
                                    <input
                                        type="text"
                                        value={newPackage.discount}
                                        onChange={(e) => setNewPackage({ ...newPackage, discount: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="e.g., 20% OFF"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Valid Until</label>
                                <input
                                    type="date"
                                    value={newPackage.validUntil}
                                    onChange={(e) => setNewPackage({ ...newPackage, validUntil: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
                                <textarea
                                    value={newPackage.description}
                                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none resize-none"
                                    placeholder="Describe the package..."
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                Add Package
                            </button>
                        </form>
                    </div>
                )}

                {/* Packages List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-4">All Packages ({(packages || []).length})</h2>

                    {loading ? (
                        <div className="text-center py-8 text-gray-light">Loading...</div>
                    ) : !packages || packages.length === 0 ? (
                        <div className="text-center py-8 text-gray-light">No packages added yet</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {packages.map((pkg) => (
                                <div key={pkg.id} className="border border-secondary-light rounded-xl p-4 hover:shadow-md transition-shadow relative">
                                    {pkg.discount && (
                                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-accent text-white rounded-full font-bold">
                                            {pkg.discount}
                                        </span>
                                    )}
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-charcoal">{pkg.title}</h3>
                                        <button
                                            onClick={() => handleDeleteClick(pkg.id)}
                                            disabled={deletingId === pkg.id}
                                            className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
                                        >
                                            {deletingId === pkg.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-light mb-2 line-clamp-2">{pkg.description}</p>
                                    {pkg.validUntil && (
                                        <p className="text-xs text-secondary-dark">
                                            Valid until: {new Date(pkg.validUntil).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
