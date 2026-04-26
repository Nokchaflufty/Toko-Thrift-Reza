import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Dashboard({ stats, recentTransactions }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const cards = [
        {
            title: 'TOTAL PRODUK',
            value: stats.total_products.toLocaleString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.455l.259-1.036.259 1.036a3.375 3.375 0 002.455 2.456l1.036.259-1.036.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 22.5l-.394-1.933a2.25 2.25 0 00-1.638-1.64L12.5 18.5l1.967-.394a2.25 2.25 0 001.64-1.638l.393-1.967.394 1.967a2.25 2.25 0 001.638 1.639l1.933.394-1.933.394a2.25 2.25 0 00-1.64 1.638z" />
                </svg>
            ),
        },
        {
            title: 'TOTAL KATEGORI',
            value: stats.total_categories.toLocaleString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
            ),
        },
        {
            title: 'TOTAL TRANSAKSI',
            value: stats.total_transactions.toLocaleString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-.23 2.1-.997 2.612-2.029L21.31 8.077A2.25 2.25 0 0019.336 5H5.405L4.82 3.447A1.5 1.5 0 003.374 2.25H2.25m0 0l1.43 5.365m0 0l.83 3.115m0 0l.33 1.24" />
                </svg>
            ),
        },
        {
            title: 'TOTAL PENGGUNA',
            value: stats.total_users.toLocaleString(),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            ),
        },
    ];

    return (
        <AdminLayout currentRoute="dashboard">
            <Head title="Dashboard Overview" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Performance insights for Toko Thrift Malang</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900">
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{card.title}</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Recent Transactions</h3>
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-400 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">NO.</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">NAMA PENGGUNA</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">TANGGAL</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">TOTAL HARGA</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">METODE PEMBAYARAN</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentTransactions.map((transaction, index) => (
                                <tr key={transaction.pembelian_id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-gray-900">{transaction.user?.user_fullname}</td>
                                    <td className="px-8 py-5 text-sm text-gray-500">{dayjs(transaction.pembelian_tanggal).format('MMM DD, YYYY')}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-gray-900">{formatCurrency(transaction.pembelian_total_harga)}</td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black text-gray-700 bg-gray-100 px-2 py-1 rounded uppercase tracking-widest">
                                            {transaction.metode_pembayaran?.metode_pembayaran_jenis}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <Link href={route('admin.transaction.index')} className="text-gray-400 hover:text-black transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 inline">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </Link>
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
