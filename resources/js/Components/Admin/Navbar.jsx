import { usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/Utils/useLanguage';

export default function Navbar({ showSearch = true, onMenuToggle }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [search, setSearch] = useState('');
    const [isDark, setIsDark] = useState(false);
    const { lang, changeLanguage, t } = useLanguage();
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    // Sync search state with URL filters if they exist
    useEffect(() => {
        setSearch(new URLSearchParams(window.location.search).get('search') || '');
        // Check for existing dark mode preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.get(window.location.pathname, { 
                ...Object.fromEntries(new URLSearchParams(window.location.search)),
                search: search 
            }, {
                preserveState: true,
                replace: true,
            });
        }
    };

    return (
        <header className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5 h-20 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
            {/* Search */}
            <div className="flex items-center gap-3 min-w-0">
                <button
                    type="button"
                    onClick={onMenuToggle}
                    className="md:hidden text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {showSearch ? (
                    <div className="w-56 sm:w-80 md:w-96 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder={t('Search...')} 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border-transparent rounded-lg text-sm focus:border-gray-300 dark:focus:border-white/20 dark:text-white focus:bg-white dark:focus:bg-black focus:ring-0 transition"
                    />
                </div>
                ) : (
                    <div className="w-56 sm:w-80 md:w-96"></div>
                )}
            </div>

            {/* Right Side Icons & Profile */}
            <div className="flex items-center space-x-3 md:space-x-6">
                <button 
                    onClick={toggleTheme}
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                >
                    {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M12 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    )}
                </button>
                
                <div className="relative">
                    <button 
                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                        className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg flex items-center space-x-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m2.247 2.247L3 21" />
                        </svg>
                        <span className="text-[10px] font-black">{lang}</span>
                    </button>
                    
                    {showLangDropdown && (
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                            <button 
                                onClick={() => { changeLanguage('ID'); setShowLangDropdown(false); }}
                                className={`w-full px-4 py-3 text-left text-xs font-bold transition hover:bg-gray-50 dark:hover:bg-white/5 ${lang === 'ID' ? 'text-black dark:text-white' : 'text-gray-400'}`}
                            >
                                Bahasa Indonesia
                            </button>
                            <button 
                                onClick={() => { changeLanguage('EN'); setShowLangDropdown(false); }}
                                className={`w-full px-4 py-3 text-left text-xs font-bold transition hover:bg-gray-50 dark:hover:bg-white/5 ${lang === 'EN' ? 'text-black dark:text-white' : 'text-gray-400'}`}
                            >
                                English
                            </button>
                        </div>
                    )}
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>
                <button className="flex items-center space-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white group">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-white transition">
                        {user?.user_profil_url && user.user_profil_url !== 'url_placeholder_profil' ? (
                            <img src={user.user_profil_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-500 mt-2">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    <span className="font-bold hidden sm:inline">
                        {user?.user_fullname || 'Store Admin'}
                    </span>
                </button>
            </div>
        </header>
    );
}
