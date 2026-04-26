import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useLanguage } from '@/Utils/useLanguage';

export default function Index({ users, stats, filters }) {
    const { t } = useLanguage();

    const handleFilterChange = (status) => {
        router.get(route('admin.customer.index'), { status }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AdminLayout currentRoute="customers">
            <Head title={t('Pelanggan')} />

            {/* Header */}
            <div className="mb-8">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Internal Management</p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('Pelanggan')}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage staff roles and access permissions for Malang store operations.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-black dark:hover:border-white transition-all" onClick={() => handleFilterChange('')}>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">{t('TOTAL PENGGUNA')}</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.total}</h3>
                        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">+12% {t('BULAN INI')}</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-green-500 transition-all" onClick={() => handleFilterChange('online')}>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Online</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.online}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold rounded uppercase">
                            <span className="w-1 h-1 rounded-full bg-green-600 mr-1.5"></span>
                            Active
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-gray-400 dark:hover:border-white/20 transition-all" onClick={() => handleFilterChange('offline')}>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Offline</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.offline}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 text-[10px] font-bold rounded uppercase">Offline</span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/30 dark:bg-white/5">
                    <div className="flex items-center space-x-4">
                        <select 
                            value={filters.status || ''}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-md text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-widest focus:ring-0 focus:border-black dark:focus:border-white py-2 px-4 shadow-sm transition"
                        >
                            <option value="" className="dark:bg-black">All Status</option>
                            <option value="online" className="dark:bg-black">Online</option>
                            <option value="offline" className="dark:bg-black">Offline</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">USER PROFILE</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">EMAIL ADDRESS</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">ROLE</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {users.data.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center mr-4 border border-gray-200 dark:border-white/5 overflow-hidden relative">
                                                <img 
                                                    src={`https://ui-avatars.com/api/?name=${user.user_fullname}&background=random`} 
                                                    alt={user.user_fullname}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none uppercase">{user.user_fullname}</p>
                                                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-tighter">ID: USR-{user.user_id.toString().padStart(3, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{user.user_email}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black rounded-md uppercase tracking-widest">
                                            {user.user_level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        {t('Showing')} {users.from || 0} {t('to')} {users.to || 0} {t('of')} {users.total || 0} {t('entries')}
                    </p>
                    <div className="flex space-x-1">
                        {users.links.map((link, i) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
