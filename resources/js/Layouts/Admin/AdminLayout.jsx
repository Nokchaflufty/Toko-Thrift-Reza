import Sidebar from '@/Components/Admin/Sidebar';
import Navbar from '@/Components/Admin/Navbar';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children, currentRoute = 'dashboard', showSearch = true }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSidebarOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!sidebarOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [sidebarOpen]);

    return (
        <div className="flex h-screen bg-white dark:bg-black overflow-hidden font-sans transition-colors duration-300">
            {/* Sidebar */}
            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setSidebarOpen(false)}
            />

            <div
                className={`fixed z-50 inset-y-0 left-0 w-64 transform transition-transform md:static md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar
                    currentRoute={currentRoute}
                    onNavigate={() => setSidebarOpen(false)}
                    onClose={() => setSidebarOpen(false)}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar */}
                <Navbar
                    showSearch={showSearch}
                    onMenuToggle={() => setSidebarOpen((v) => !v)}
                />

                {/* Main Scrollable Content */}
                <main className="flex-1 p-5 md:p-8 bg-gray-50 dark:bg-[#050505] overflow-y-auto transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
