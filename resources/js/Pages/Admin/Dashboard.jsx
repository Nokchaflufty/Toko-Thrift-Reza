import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout currentRoute="dashboard">
            <Head title="Admin Dashboard" />

            {/* Header Section */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                    <p className="text-sm text-gray-500 mt-1">Performance insights for Toko Thrift Malang</p>
                </div>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Total Sales */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="flex items-center text-xs font-semibold text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            +12.5%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">Total Sales</p>
                    <h3 className="text-xl font-bold text-gray-900">Rp 42.850.000</h3>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className="flex items-center text-xs font-semibold text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            +8.2%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">Total Orders</p>
                    <h3 className="text-xl font-bold text-gray-900">1,248</h3>
                </div>

                {/* New Customers */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.662 3.14m-12.662 0A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </div>
                        <span className="flex items-center text-xs font-semibold text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg>
                            -2.4%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">New Customers</p>
                    <h3 className="text-xl font-bold text-gray-900">342</h3>
                </div>

                {/* Avg. Order Value */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                        </div>
                        <span className="flex items-center text-xs font-semibold text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            +5.1%
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wider mb-1 uppercase">Avg. Order Value</p>
                    <h3 className="text-xl font-bold text-gray-900">Rp 343.500</h3>
                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Sales Performance Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base font-medium text-gray-900">Sales Performance</h3>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
                                <span className="text-xs text-gray-600">Revenue</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
                                <span className="text-xs text-gray-600">Goal</span>
                            </div>
                        </div>
                    </div>
                    {/* Placeholder for Chart */}
                    <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between px-8 pt-8 pb-4 border border-gray-100">
                        {/* Fake bars for illustration */}
                        <div className="w-12 bg-gray-200 h-[60%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[45%] rounded-t-sm"></div></div>
                        <div className="w-12 bg-gray-200 h-[80%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[65%] rounded-t-sm"></div></div>
                        <div className="w-12 bg-gray-200 h-[50%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[35%] rounded-t-sm"></div></div>
                        <div className="w-12 bg-gray-200 h-[90%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[85%] rounded-t-sm"></div></div>
                        <div className="w-12 bg-gray-200 h-[70%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[60%] rounded-t-sm"></div></div>
                        <div className="w-12 bg-gray-200 h-[100%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[95%] rounded-t-sm"></div></div>
                        <div className="w-12 bg-gray-200 h-[40%] rounded-t-sm relative group"><div className="absolute bottom-0 w-12 bg-black h-[25%] rounded-t-sm"></div></div>
                    </div>
                    {/* X-Axis Labels */}
                    <div className="flex justify-between px-8 mt-4 text-[10px] font-bold text-gray-400 tracking-wider">
                        <span>MON</span>
                        <span>TUE</span>
                        <span>WED</span>
                        <span>THU</span>
                        <span>FRI</span>
                        <span>SAT</span>
                        <span>SUN</span>
                    </div>
                </div>

                {/* Top Sellers */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-base font-medium text-gray-900 mb-6">Top Sellers</h3>
                    
                    <div className="flex-1 space-y-5">
                        {/* Item 1 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src="https://placehold.co/100x100/eeeeee/black?text=Jacket" alt="Vintage Carhartt Jacket" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-3">
                                    <h4 className="text-sm font-medium text-gray-900 leading-tight">Vintage Carhartt Jacket</h4>
                                    <p className="text-[11px] text-gray-500 mt-1">12 Sales today</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Rp 850k</span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src="https://placehold.co/100x100/eeeeee/black?text=Shoes" alt="Retro Dunk High '85" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-3">
                                    <h4 className="text-sm font-medium text-gray-900 leading-tight">Retro Dunk High '85</h4>
                                    <p className="text-[11px] text-gray-500 mt-1">8 Sales today</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Rp 1.2M</span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src="https://placehold.co/100x100/eeeeee/black?text=T-Shirt" alt="90s Graphic Tee" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-3">
                                    <h4 className="text-sm font-medium text-gray-900 leading-tight">90s Graphic Tee</h4>
                                    <p className="text-[11px] text-gray-500 mt-1">24 Sales today</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Rp 225k</span>
                        </div>

                        {/* Item 4 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src="https://placehold.co/100x100/eeeeee/black?text=Pants" alt="Cargo Work Pants" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-3">
                                    <h4 className="text-sm font-medium text-gray-900 leading-tight">Cargo Work Pants</h4>
                                    <p className="text-[11px] text-gray-500 mt-1">5 Sales today</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Rp 450k</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-2.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition">
                        View All Products
                    </button>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
                    <h3 className="text-base font-medium text-gray-900">Recent Transactions</h3>
                    <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Transaction ID</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">#TTM-2904</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 mr-3">AK</div>
                                        <span className="text-sm font-medium text-gray-700">Arya Kusuma</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-100 text-green-700 tracking-wider">COMPLETED</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">Rp 1.250.000</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 24, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">#TTM-2903</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 mr-3">DP</div>
                                        <span className="text-sm font-medium text-gray-700">Dian Putri</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-yellow-100 text-yellow-700 tracking-wider">PROCESSING</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">Rp 425.000</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 24, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">#TTM-2902</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 mr-3">RM</div>
                                        <span className="text-sm font-medium text-gray-700">Reza Maulana</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-gray-200 text-gray-700 tracking-wider">SHIPPED</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">Rp 890.000</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 23, 2023</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </AdminLayout>
    );
}
