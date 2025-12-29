'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useGallery } from '@/context/GalleryContext';
import AdminSidebarLayout from '@/components/admin/AdminSidebarLayout';
import { GalleryItem } from '@/types';

export default function GalleryManagementPage() {
    const { isAuthenticated } = useAuth();
    const { gallery, loading, addItem, deleteItem, refreshGallery } = useGallery();
    const router = useRouter();

    const [showAddForm, setShowAddForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newItem, setNewItem] = useState({
        caption: '',
        category: 'Hair' as GalleryItem['category']
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const handleFileSelect = (file: File) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setUploadError('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('File too large. Maximum size is 5MB.');
            return;
        }

        setUploadError(null);
        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            setUploadError('Please select an image to upload');
            return;
        }

        setUploading(true);
        setUploadError(null);

        try {
            // Upload the file first
            const formData = new FormData();
            formData.append('image', selectedFile);

            const uploadRes = await fetch('/api/gallery/upload', {
                method: 'POST',
                body: formData
            });

            const uploadData = await uploadRes.json();

            if (!uploadData.success) {
                throw new Error(uploadData.error || 'Failed to upload image');
            }

            // Add the gallery item with the uploaded image URL
            await addItem({
                imageUrl: uploadData.imageUrl,
                caption: newItem.caption,
                category: newItem.category
            });

            // Reset form
            setNewItem({ caption: '', category: 'Hair' });
            setSelectedFile(null);
            setPreviewUrl(null);
            setShowAddForm(false);
            refreshGallery();
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteConfirmId(id);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteConfirmId) return;

        setDeletingId(deleteConfirmId);
        try {
            await deleteItem(deleteConfirmId);
            setDeleteConfirmId(null);
            await refreshGallery();
        } catch (error) {
            console.error('Failed to delete image:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmId(null);
    };

    const resetForm = () => {
        setNewItem({ caption: '', category: 'Hair' });
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadError(null);
        setShowAddForm(false);
    };

    if (!isAuthenticated) return null;

    return (
        <AdminSidebarLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-2xl lg:text-3xl font-bold text-charcoal">Gallery Management</h1>
                        <p className="text-gray-light mt-1">Upload and manage your gallery images</p>
                    </div>
                    <button
                        onClick={() => showAddForm ? resetForm() : setShowAddForm(true)}
                        className="btn-primary"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Image'}
                    </button>
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirmId && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-light mb-6">
                                Are you sure you want to delete this image? This action cannot be undone.
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
                        <h2 className="font-display text-xl font-semibold text-charcoal mb-4">Add New Image</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* File Upload Area */}
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Upload Image
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                                        ? 'border-primary bg-primary/10'
                                        : previewUrl
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-secondary hover:border-primary hover:bg-primary/5'
                                        }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {previewUrl ? (
                                        <div className="space-y-3">
                                            <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden">
                                                <Image
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <p className="text-sm text-green-600 font-medium">
                                                ✓ {selectedFile?.name}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFile(null);
                                                    setPreviewUrl(null);
                                                }}
                                                className="text-sm text-red-500 hover:text-red-700"
                                            >
                                                Remove and choose another
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-charcoal font-medium">
                                                    Drop your image here, or <span className="text-primary">browse</span>
                                                </p>
                                                <p className="text-sm text-gray-light mt-1">
                                                    Supports: JPEG, PNG, GIF, WebP (Max 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {uploadError && (
                                    <p className="mt-2 text-sm text-red-600">{uploadError}</p>
                                )}
                            </div>

                            {/* Caption & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Caption</label>
                                    <input
                                        type="text"
                                        value={newItem.caption}
                                        onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Describe this image..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Category</label>
                                    <select
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value as GalleryItem['category'] })}
                                        className="w-full px-4 py-3 rounded-xl border border-secondary bg-bg-cream focus:ring-2 focus:ring-primary outline-none"
                                    >
                                        <option value="Hair">Hair</option>
                                        <option value="Facial">Facial</option>
                                        <option value="Bridal">Bridal</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !selectedFile}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        Upload Image
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Gallery Grid */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-4">All Images ({(gallery || []).length})</h2>

                    {loading ? (
                        <div className="text-center py-8 text-gray-light">Loading...</div>
                    ) : !gallery || gallery.length === 0 ? (
                        <div className="text-center py-8 text-gray-light">No images added yet</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map((item) => (
                                <div key={item.id} className="relative group rounded-xl overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.caption}
                                        width={300}
                                        height={200}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                        <button
                                            onClick={() => handleDeleteClick(item.id)}
                                            disabled={deletingId === item.id}
                                            className="self-end bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 disabled:opacity-50"
                                        >
                                            {deletingId === item.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                        <div>
                                            <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                                                {item.category}
                                            </span>
                                            <p className="text-white text-sm mt-1 line-clamp-2">{item.caption}</p>
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
