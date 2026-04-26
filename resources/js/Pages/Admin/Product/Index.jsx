import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Index({ products, categories = [], filters }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        category: filters.category || '',
        stock_status: filters.stock_status || '',
    });
    
    const dropdownRef = useRef(null);
    const filterRef = useRef(null);

    // Close dropdown and filter when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...activeFilters, [key]: value };
        setActiveFilters(newFilters);
        
        router.get(route('admin.product.index'), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        const cleared = { category: '', stock_status: '' };
        setActiveFilters(cleared);
        router.get(route('admin.product.index'), cleared);
    };

    const getStatusInfo = (stock) => {
        if (stock === 0) return { label: 'Sold Out', color: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' };
        if (stock <= 5) return { label: 'Low Stock', color: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' };
        return { label: 'In Stock', color: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' };
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.product.destroy', id));
        }
    };

    const productList = products.data || [];
    const totalFinds = products.total || 0;
    const activeListings = products.total_active || totalFinds; // Mocked or passed from backend if needed
    // Simple mock stats for now
    const lowStockCount = productList.filter(p => p.pakaian_stok > 0 && p.pakaian_stok <= 5).length;
    const outOfStockCount = productList.filter(p => p.pakaian_stok === 0).length;

    return (
        <AdminLayout currentRoute="product">
            <Head title="Product Management" />

            {/* Header Section */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Product Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Curate and monitor your thrifted collection from Malang.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative overflow-visible" ref={filterRef}>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium transition shadow-sm ${
                                showFilters || filters.category || filters.stock_status
                                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                                    : 'bg-white dark:bg-black text-gray-700 dark:text-gray-300 border-gray-300 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                            Filters
                            {(filters.category || filters.stock_status) && (
                                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {showFilters && (
                            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 z-[110] p-5 animate-in fade-in slide-in-from-top-2 duration-200 transition-colors">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Category</label>
                                        <select 
                                            value={activeFilters.category}
                                            onChange={(e) => handleFilterChange('category', e.target.value)}
                                            className="w-full text-xs font-bold border-gray-200 dark:border-white/10 rounded-md focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-black dark:text-white"
                                        >
                                            <option value="" className="dark:bg-black">All Categories</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id} className="dark:bg-black">{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Stock Status</label>
                                        <select 
                                            value={activeFilters.stock_status}
                                            onChange={(e) => handleFilterChange('stock_status', e.target.value)}
                                            className="w-full text-xs font-bold border-gray-200 dark:border-white/10 rounded-md focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-black dark:text-white"
                                        >
                                            <option value="" className="dark:bg-black">All Status</option>
                                            <option value="in_stock" className="dark:bg-black">In Stock (&gt; 5)</option>
                                            <option value="low_stock" className="dark:bg-black">Low Stock (1 - 5)</option>
                                            <option value="out_of_stock" className="dark:bg-black">Out of Stock (0)</option>
                                        </select>
                                    </div>
                                    <div className="pt-2 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                                        <button 
                                            onClick={clearFilters}
                                            className="text-[10px] font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 transition uppercase tracking-widest"
                                        >
                                            Reset
                                        </button>
                                        <button 
                                            onClick={() => setShowFilters(false)}
                                            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition uppercase tracking-widest"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link href={route('admin.product.create')} className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Product
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Total Finds */}
                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 transition-colors">
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 tracking-wider uppercase">Total Finds</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{totalFinds}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded">
                            Active
                        </span>
                    </div>
                </div>

                {/* Active Listings */}
                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 transition-colors">
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 tracking-wider uppercase">Active Listings</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{productList.filter(p => p.pakaian_stok > 0).length}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-500 text-xs font-bold rounded">
                            In View
                        </span>
                    </div>
                </div>

                {/* Low Stock */}
                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 transition-colors">
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 tracking-wider uppercase">Low Stock</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{lowStockCount}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded">
                            Attention
                        </span>
                    </div>
                </div>

                {/* Out of Stock */}
                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 transition-colors">
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 tracking-wider uppercase">Out of Stock</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{outOfStockCount}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-bold rounded">
                            Alert
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-visible mb-8 transition-colors">
                <div className="overflow-x-auto overflow-visible">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5 w-2/5">Product</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5">SKU</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5">Category</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5">Stock</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5">Price</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5 overflow-visible">
                            {productList.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">No products found</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Try adjusting your filters or creating a new product.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                productList.map((product) => {
                                    const status = getStatusInfo(product.pakaian_stok);
                                    return (
                                        <tr key={product.pakaian_id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center">
                                                    <div className="w-14 h-14 rounded-md border border-gray-200 dark:border-white/5 overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-white/5">
                                                        <img src={product.pakaian_gambar_url || 'https://placehold.co/100x100/eeeeee/black?text=Image'} alt={product.pakaian_nama} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{product.pakaian_nama}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-mono text-gray-500 dark:text-gray-500">TKM-{product.pakaian_id.toString().padStart(3, '0')}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-300">
                                                    {product.kategori_pakaian?.kategori_pakaian_nama || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-medium text-gray-900 dark:text-white">
                                                {product.pakaian_stok} units
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Rp</span><br />
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{product.pakaian_harga}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className={`flex items-center text-xs font-bold ${status.color}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${status.dot}`}></div>
                                                    {status.label}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end items-center space-x-2">
                                                    <Link 
                                                        href={route('admin.product.edit', product.pakaian_id)}
                                                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all"
                                                        title="Edit Product"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(product.pakaian_id)}
                                                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                                                        title="Delete Product"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                        Showing {products.from || 0} to {products.to || 0} of {products.total} products
                    </p>
                    <div className="flex space-x-1">
                        {products.links.map((link, i) => {
                            const label = link.label
                                .replace('&laquo; Previous', '')
                                .replace('Next &raquo;', '')
                                || (link.label.includes('Previous') ? '<' : '>');
                                
                            const isPrev = link.label.includes('Previous');
                            const isNext = link.label.includes('Next');

                            return (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    as="button"
                                    disabled={!link.url}
                                    className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-bold transition ${
                                        link.active 
                                            ? 'border-black bg-black text-white dark:bg-white dark:text-black dark:border-white' 
                                            : link.url 
                                                ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-black dark:text-gray-400 dark:border-white/10 dark:hover:bg-white/5' 
                                                : 'border-gray-100 bg-white text-gray-300 dark:bg-black dark:text-gray-700 dark:border-white/5 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}
