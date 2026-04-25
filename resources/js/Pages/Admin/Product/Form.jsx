import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Form({ product, categories = [] }) {
    const isEdit = !!product;
    
    const { data, setData, post, put, processing, errors } = useForm({
        pakaian_nama: product?.pakaian_nama || '',
        pakaian_kategori_pakaian_id: product?.pakaian_kategori_pakaian_id || '',
        pakaian_stok: product?.pakaian_stok || '',
        pakaian_harga: product?.pakaian_harga || '',
        pakaian_gambar_url: null, // For file upload
    });

    const [previewImage, setPreviewImage] = useState(
        product?.pakaian_gambar_url || null
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('pakaian_gambar_url', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            // Use router.post directly for updates with files to handle _method spoofing
            router.post(route('admin.product.update', product.pakaian_id), {
                ...data,
                _method: 'put'
            });
        } else {
            post(route('admin.product.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AdminLayout currentRoute="product">
            <Head title={isEdit ? 'Edit Product' : 'Add New Product'} />

            <div className="max-w-6xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center text-xs font-medium text-gray-500 mb-6 uppercase tracking-wider">
                    <Link href={route('admin.product.index')} className="hover:text-black transition">Product</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="text-black">{isEdit ? 'Edit Product' : 'Add New'}</span>
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-10">
                    {isEdit ? 'Edit Product' : 'Add New Product'}
                </h2>

                <form onSubmit={submit} className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column - Form Fields */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <label htmlFor="pakaian_nama" className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-2">
                                Nama Pakaian
                            </label>
                            <input
                                id="pakaian_nama"
                                type="text"
                                className="w-full rounded-md border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black placeholder-gray-400"
                                placeholder="e.g. Vintage Carhartt Detroit Jacket"
                                value={data.pakaian_nama}
                                onChange={(e) => setData('pakaian_nama', e.target.value)}
                                required
                            />
                            {errors.pakaian_nama && <p className="mt-1 text-xs text-red-600">{errors.pakaian_nama}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="pakaian_kategori_pakaian_id" className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-2">
                                    Kategori
                                </label>
                                <select
                                    id="pakaian_kategori_pakaian_id"
                                    className="w-full rounded-md border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                    value={data.pakaian_kategori_pakaian_id}
                                    onChange={(e) => setData('pakaian_kategori_pakaian_id', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.pakaian_kategori_pakaian_id && <p className="mt-1 text-xs text-red-600">{errors.pakaian_kategori_pakaian_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="pakaian_stok" className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-2">
                                    Stok
                                </label>
                                <input
                                    id="pakaian_stok"
                                    type="number"
                                    min="0"
                                    className="w-full rounded-md border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black placeholder-gray-400"
                                    placeholder="0"
                                    value={data.pakaian_stok}
                                    onChange={(e) => setData('pakaian_stok', e.target.value)}
                                    required
                                />
                                {errors.pakaian_stok && <p className="mt-1 text-xs text-red-600">{errors.pakaian_stok}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pakaian_harga" className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-2">
                                Harga
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 font-medium text-sm">Rp</span>
                                </div>
                                <input
                                    id="pakaian_harga"
                                    type="number"
                                    min="0"
                                    className="w-full rounded-md border-gray-300 bg-white pl-12 pr-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black placeholder-gray-400"
                                    placeholder="0"
                                    value={data.pakaian_harga}
                                    onChange={(e) => setData('pakaian_harga', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.pakaian_harga && <p className="mt-1 text-xs text-red-600">{errors.pakaian_harga}</p>}
                        </div>

                        <div className="pt-6 flex items-center space-x-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                Save Product
                            </button>
                            <Link
                                href={route('admin.product.index')}
                                className="px-8 py-3 bg-[#e5e2db] text-black text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#d5d2cb] transition"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="lg:w-96 flex-shrink-0">
                        <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-2">
                            Foto Produk
                        </label>
                        
                        {/* Main Image Area */}
                        <div className="relative w-full aspect-[3/4] bg-[#f4f7f6] rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-400 transition-colors flex flex-col items-center justify-center overflow-hidden mb-4 cursor-pointer group">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto text-gray-400 mb-3 group-hover:text-gray-600 transition">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                    <p className="text-sm font-medium text-gray-700">Drag and drop here</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">or click to browse from device</p>
                                </div>
                            )}
                        </div>
                        {errors.pakaian_gambar_url && <p className="mt-1 text-xs text-red-600 mb-4">{errors.pakaian_gambar_url}</p>}

                        {/* Additional thumbnails (Mockup) */}
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-[#f9fafb] rounded border border-gray-100 flex items-center justify-center cursor-not-allowed opacity-50">
                                    <span className="text-gray-300 font-light text-xl">+</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] italic text-gray-400 mt-4">Recommended size: 1200×1600px. Max size: 5MB.</p>
                    </div>
                </form>


            </div>
        </AdminLayout>
    );
}
