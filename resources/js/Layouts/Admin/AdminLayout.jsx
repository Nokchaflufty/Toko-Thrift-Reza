import Sidebar from '@/Components/Admin/Sidebar';
import Navbar from '@/Components/Admin/Navbar';

export default function AdminLayout({ children, currentRoute = 'dashboard', showSearch = true }) {
    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans">
            {/* Sidebar */}
            <Sidebar currentRoute={currentRoute} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar */}
                <Navbar showSearch={showSearch} />

                {/* Main Scrollable Content */}
                <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
