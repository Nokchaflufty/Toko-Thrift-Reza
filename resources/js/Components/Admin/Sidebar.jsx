import { Link } from '@inertiajs/react';
import { useLanguage } from '@/Utils/useLanguage';

export default function Sidebar({ currentRoute = 'dashboard', onNavigate, onClose }) {
    const { t } = useLanguage();
    
    const menuItems = [
        {
            name: t('Dashboard'),
            id: 'dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            )
        },
        {
            name: t('Product'),
            id: 'product',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            )
        },
        {
            name: t('Category'),
            id: 'category',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
            )
        },
        {
            name: t('Transaction'),
            id: 'transaction',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            name: t('Customers'),
            id: 'customers',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            )
        },
        {
            name: t('Settings'),
            id: 'settings',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.79l.867-1.33m7.264-11.12l.867-1.33M10.598 20.898l.513-1.41m4.893-13.46l.513-1.41M14.095 20.898l-.513-1.41m-4.893-13.46l-.513-1.41M16.499 19.79l-.867-1.33m-7.264-11.12l-.867-1.33M18.894 17.785l-1.149-.964M5.106 6.215l1.15.964M20.543 15.077l-1.41-.513M3.457 8.923l1.41.513" />
                </svg>
            )
        }
    ];

    return (
        <aside className="w-64 bg-[#0a0a0a] text-white flex flex-col min-h-screen">
            {/* Logo Area */}
            <div className="px-6 py-6 border-b border-white/5 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black tracking-widest uppercase mb-1">{t('THRIFT ADMIN')}</h1>
                    <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">V0.1-STREETWEAR</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="md:hidden text-white/70 hover:text-white transition p-2 -mr-2 rounded-lg hover:bg-white/5"
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-1">
                {menuItems.map((item) => {
                    const isActive = currentRoute === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={
                                item.id === 'dashboard' ? route('admin.dashboard') : 
                                item.id === 'product' ? route('admin.product.index') : 
                                item.id === 'category' ? route('admin.category.index') : 
                                item.id === 'transaction' ? route('admin.transaction.index') : 
                                item.id === 'customers' ? route('admin.customer.index') : 
                                item.id === 'settings' ? route('admin.settings') : '#'
                            }
                            onClick={onNavigate}
                            className={`flex items-center px-6 py-3.5 text-sm font-medium transition-colors ${
                                isActive 
                                    ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                                    : 'text-gray-400 hover:text-white border-l-4 border-transparent hover:bg-white/5'
                            }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Button */}
            <div className="p-6 border-t border-white/5">
                <Link 
                    href={route('logout')} 
                    method="post" 
                    as="button"
                    onClick={onNavigate}
                    className="w-full flex items-center justify-center bg-white text-black px-4 py-3 rounded-md font-bold text-sm transition hover:bg-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    {t('Log Out')}
                </Link>
            </div>
        </aside>
    );
}
