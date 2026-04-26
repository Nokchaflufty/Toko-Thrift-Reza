import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { auth = {} } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-logo-container">
                <Link href="/" className="nav-logo">
                    Toko Thrift
                </Link>
            </div>

            <ul className="nav-links">
                <li><Link href="/">Beranda</Link></li>
                <li><Link href="/katalog">Katalog</Link></li>
            </ul>

            <div className="nav-actions">
                <button className="icon-btn" aria-label="Search">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
                
                {auth.user ? (
                    <>
                        <Link href="/cart" className="icon-btn" aria-label="Cart">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </Link>
                        <Link href="/profile" className="profile-img-btn" aria-label="Profile">
                            {auth.user.user_profil_url ? (
                                <img src={auth.user.user_profil_url} alt={auth.user.user_fullname} className="nav-profile-img" />
                            ) : (
                                <div className="nav-profile-placeholder">
                                    {auth.user.user_fullname?.charAt(0) || 'U'}
                                </div>
                            )}
                        </Link>
                    </>
                ) : (
                    <div className="auth-btns">
                        <Link href="/login" className="btn-login">Login</Link>
                        <Link href="/register" className="btn-register">Daftar</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
