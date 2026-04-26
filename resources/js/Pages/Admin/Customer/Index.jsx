import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ users, stats, filters }) {
    const handleFilterChange = (status) => {
        router.get(route('admin.customer.index'), { status }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AdminLayout currentRoute="customers">
            <Head title="User Management" />

            {/* Header */}
            <div className="mb-8">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Internal Management</p>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h2>
                <p className="text-sm text-gray-500 mt-1">Manage staff roles and access permissions for Malang store operations.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-black transition" onClick={() => handleFilterChange('')}>
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Total Users</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{stats.total}</h3>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12% this month</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-green-500 transition" onClick={() => handleFilterChange('online')}>
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Users Online</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{stats.online}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">
                            <span className="w-1 h-1 rounded-full bg-green-600 mr-1.5"></span>
                            Active
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-gray-400 transition" onClick={() => handleFilterChange('offline')}>
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Users Offline</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{stats.offline}</h3>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded uppercase">Offline</span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <div className="flex items-center space-x-4">
                        <select 
                            value={filters.status || ''}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="bg-white border border-gray-200 rounded-md text-[11px] font-bold text-gray-900 uppercase tracking-widest focus:ring-0 focus:border-black py-2 px-4 shadow-sm transition"
                        >
                            <option value="">All Status</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            Showing {users.data.length} of {users.total} users
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Profile</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 border border-gray-200 overflow-hidden relative">
                                                <img 
                                                    src={`https://ui-avatars.com/api/?name=${user.user_fullname}&background=random`} 
                                                    alt={user.user_fullname}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-none uppercase">{user.user_fullname}</p>
                                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">ID: USR-{user.user_id.toString().padStart(3, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-medium text-gray-500">{user.user_email}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-2 py-1 bg-black text-white text-[9px] font-black rounded-md uppercase tracking-widest">
                                            {user.user_level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Page {users.current_page} of {users.last_page}</p>
                    <div className="flex space-x-2">
                        {users.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                as="button"
                                disabled={!link.url}
                                className={`px-4 py-1.5 rounded text-[11px] font-bold uppercase tracking-widest transition ${
                                    link.active 
                                        ? 'bg-black text-white' 
                                        : link.url 
                                            ? 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50' 
                                            : 'bg-white text-gray-300 border border-gray-100 cursor-not-allowed'
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
