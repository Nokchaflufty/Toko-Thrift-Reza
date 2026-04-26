import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Index({ transactions, stats, filters }) {
    const [activeFilters, setActiveFilters] = useState({
        date: filters.date || '',
        month: filters.month || '',
        year: filters.year || '',
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...activeFilters, [key]: value };
        setActiveFilters(newFilters);
        router.get(route('admin.transaction.index'), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed':
                return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-600' };
            case 'Processing':
                return { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-600' };
            case 'Refund':
                return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-600' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-600' };
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AdminLayout currentRoute="transaction">
            <Head title="Transactions" />

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h2>
                    <p className="text-sm text-gray-500 mt-1">Oversee all customer ledger activities and payment reconciliations.</p>
                </div>
                
                {/* Filters Section */}
                <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                        <input 
                            type="date" 
                            value={activeFilters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                            className="text-xs font-bold border-none focus:ring-0 bg-transparent py-1.5"
                        />
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <select 
                            value={activeFilters.month}
                            onChange={(e) => handleFilterChange('month', e.target.value)}
                            className="text-xs font-bold border-none focus:ring-0 bg-transparent py-1.5"
                        >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{dayjs().month(i).format('MMMM')}</option>
                            ))}
                        </select>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <select 
                            value={activeFilters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="text-xs font-bold border-none focus:ring-0 bg-transparent py-1.5"
                        >
                            <option value="">Year</option>
                            {[2024, 2025, 2026].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Payments</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{formatCurrency(stats.total_payments)}</h3>
                        <span className="p-2 bg-blue-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.546 1.159 3.696 1.159 5.242 0l.879-.659M9.75 8.182l.879-.659a5.232 5.232 0 015.242 0l.879.659M9.75 13.182l.879-.659a5.232 5.232 0 015.242 0l.879.659" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Completed</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-green-600 tracking-tight">{stats.completed}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">Verified</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Processing</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-yellow-600 tracking-tight">{stats.processing}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-600 text-[10px] font-bold rounded uppercase">On Hold</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Refund</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-red-600 tracking-tight">{stats.refund}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase">Returned</span>
                    </div>
                </div>
            </div>

            {/* Transaction Ledger Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Transaction Ledger</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.data.map((transaction) => {
                                const statusStyle = getStatusStyle(transaction.pembelian_status);
                                return (
                                    <tr key={transaction.pembelian_id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-mono font-bold text-gray-900">#TM-{transaction.pembelian_id.toString().padStart(5, '0')}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 border border-gray-200">
                                                    <span className="text-[10px] font-bold text-gray-500">{transaction.user?.user_fullname.substring(0, 2).toUpperCase()}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 leading-none">{transaction.user?.user_fullname}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1">{transaction.user?.user_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-bold text-gray-900">{dayjs(transaction.pembelian_tanggal).format('MMM DD, YYYY')}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{dayjs(transaction.pembelian_tanggal).format('HH:mm A')}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-black text-gray-900">{formatCurrency(transaction.pembelian_total_harga)}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} uppercase tracking-wider`}>
                                                <span className={`w-1 h-1 rounded-full ${statusStyle.dot} mr-1.5`}></span>
                                                {transaction.pembelian_status === 'Completed' ? 'Paid' : transaction.pembelian_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-400">
                        Showing {transactions.from || 0} to {transactions.to || 0} of {transactions.total || 0} entries
                    </p>
                    <div className="flex space-x-1">
                        {transactions.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                as="button"
                                disabled={!link.url}
                                className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-bold transition ${
                                    link.active 
                                        ? 'border-black bg-black text-white' 
                                        : link.url 
                                            ? 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50' 
                                            : 'border-gray-100 bg-white text-gray-300 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
