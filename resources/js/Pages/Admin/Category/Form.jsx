import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Form({ category = null }) {
    const isEdit = !!category;
    const fileInputRef = useRef(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        kategori_pakaian_nama: category?.kategori_pakaian_nama || '',
        kategori_pakaian_foto: null,
        _method: isEdit ? 'PUT' : 'POST', // For Laravel spoofing when using files
    });

    const [previewUrl, setPreviewUrl] = useState(category?.kategori_pakaian_foto || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('kategori_pakaian_foto', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            // We use POST with _method PUT for file uploads in Laravel
            post(route('admin.category.update', category.kategori_pakaian_id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.category.store'));
        }
    };

    return (
        <AdminLayout currentRoute="category">
            <Head title={isEdit ? 'Edit Category' : 'Add Category'} />

            {/* Breadcrumbs / Title */}
            <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 mb-2">
                <Link href={route('admin.category.index')} className="hover:text-black dark:hover:text-white transition">Categories</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-bold">{isEdit ? 'Edit Category' : 'Add New'}</span>
            </div>

            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {isEdit ? 'Update Category' : 'Create New Category'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Organize your thrift collection by adding a new curated category with descriptive visuals.
                </p>
            </div>

            <form onSubmit={submit} className="max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Fields */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-black p-8 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6 transition-colors">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-900 dark:text-gray-400 uppercase tracking-widest mb-3">Nama Kategori</label>
                                <input 
                                    type="text"
                                    value={data.kategori_pakaian_nama}
                                    onChange={e => setData('kategori_pakaian_nama', e.target.value)}
                                    placeholder="e.g. Vintage Streetwear"
                                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg text-sm dark:text-white focus:border-black dark:focus:border-white focus:ring-0 transition"
                                    required
                                />
                                {errors.kategori_pakaian_nama && (
                                    <p className="mt-2 text-xs text-red-500 font-bold uppercase">{errors.kategori_pakaian_nama}</p>
                                )}
                                <p className="mt-2 text-[10px] text-gray-400 dark:text-gray-500 italic">Use a concise and descriptive name for the collection.</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 pt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-10 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50"
                            >
                                {isEdit ? 'Update Category' : 'Save Category'}
                            </button>
                            <Link 
                                href={route('admin.category.index')}
                                className="px-10 py-3.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-black p-8 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm transition-colors">
                            <label className="block text-[11px] font-bold text-gray-900 dark:text-gray-400 uppercase tracking-widest mb-4">Foto Kategori</label>
                            
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-white/30 transition-all bg-gray-50/50 dark:bg-white/5 group overflow-hidden"
                            >
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 dark:text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-[11px] font-bold text-gray-900 dark:text-gray-400 uppercase tracking-wide">Click to upload cover</p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, or WEBP (Max 5MB)</p>
                                        <button type="button" className="mt-4 px-6 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-white/10 dark:text-gray-400 transition-colors">
                                            Browse Files
                                        </button>
                                    </div>
                                )}
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            {errors.kategori_pakaian_foto && (
                                <p className="mt-3 text-xs text-red-500 font-bold uppercase">{errors.kategori_pakaian_foto}</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
