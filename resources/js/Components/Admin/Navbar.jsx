export default function Navbar() {
    return (
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8">
            {/* Search */}
            <div className="w-96 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input 
                    type="text" 
                    placeholder="Search orders, products, customers..." 
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-transparent rounded-lg text-sm focus:border-gray-300 focus:bg-white focus:ring-0 transition"
                />
            </div>

            {/* Right Side Icons & Profile */}
            <div className="flex items-center space-x-6">
                <button className="text-gray-500 hover:text-black transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>
                <button className="text-gray-500 hover:text-black transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <div className="h-6 w-px bg-gray-200"></div>
                <button className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-black">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-500 mt-2">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>Store Admin</span>
                </button>
            </div>
        </header>
    );
}
