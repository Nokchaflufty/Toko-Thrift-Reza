import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useLanguage } from '@/Utils/useLanguage';

export default function Index({ categories = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useLanguage();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.category.destroy', id));
        }
    };

    const filteredCategories = (categories.data || []).filter(cat => 
        cat.kategori_pakaian_nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout currentRoute="category">
            <Head title={t('Category')} />

            {/* Header Section */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('Category')}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Organize and curate the digital boutique collections.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Link 
                        href={route('admin.category.create')}
                        className="flex items-center px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        {t('Add New')}
                    </Link>
                </div>
            </div>

            {/* Stats Cards - Only Total Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 transition-colors">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 dark:text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">{t('TOTAL KATEGORI')}</p>
                            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{categories.total || 0}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Table */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden mb-8 transition-colors">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">{t('Category')}</h3>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-white/5">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">{t('Category').toUpperCase()}</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">TOTAL ITEM</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 text-right">{t('AKSI')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {filteredCategories.map((category) => (
                                <tr key={category.kategori_pakaian_id} className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 dark:border-white/10 mr-4 bg-gray-50 dark:bg-white/5">
                                                <img 
                                                    src={category.kategori_pakaian_foto || `https://placehold.co/100x100/eeeeee/333333?text=${category.kategori_pakaian_nama[0]}`} 
                                                    alt={category.kategori_pakaian_nama} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{category.kategori_pakaian_nama}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">0 items</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link 
                                                href={route('admin.category.edit', category.kategori_pakaian_id)}
                                                className="p-2 text-gray-300 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(category.kategori_pakaian_id)}
                                                className="p-2 text-gray-300 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
