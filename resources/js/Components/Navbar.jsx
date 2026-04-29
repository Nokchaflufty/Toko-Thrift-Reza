import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { auth = {} } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-logo-container">
                    <Link href="/" className="nav-logo" onClick={closeMobile}>
                        Toko Thrift
                    </Link>
                </div>

                <ul className="nav-links">
                    <li>
                        <Link href="/" onClick={closeMobile}>
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link href="/katalog" onClick={closeMobile}>
                            Katalog
                        </Link>
                    </li>
                </ul>

                <div className="nav-actions">
                    <button className="icon-btn" aria-label="Search" type="button">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>

                    {auth.user ? (
                        <>
                            <Link
                                href="/cart"
                                className="icon-btn"
                                aria-label="Cart"
                                onClick={closeMobile}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </Link>
                            <Link
                                href="/profile"
                                className="profile-img-btn"
                                aria-label="Profile"
                                onClick={closeMobile}
                            >
                                {auth.user.user_profil_url ? (
                                    <img
                                        src={auth.user.user_profil_url}
                                        alt={auth.user.user_fullname}
                                        className="nav-profile-img"
                                    />
                                ) : (
                                    <div className="nav-profile-placeholder">
                                        {auth.user.user_fullname?.charAt(0) ||
                                            'U'}
                                    </div>
                                )}
                            </Link>
                        </>
                    ) : (
                        <div className="auth-btns">
                            <Link href="/login" className="btn-login" onClick={closeMobile}>
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn-register"
                                onClick={closeMobile}
                            >
                                Daftar
                            </Link>
                        </div>
                    )}

                    <button
                        type="button"
                        className="mobile-menu-btn"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 6h16"></path>
                                <path d="M4 12h16"></path>
                                <path d="M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            <div
                id="mobile-menu"
                className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                onClick={closeMobile}
            >
                <div
                    className="mobile-menu-panel"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mobile-menu-links">
                        <Link href="/" onClick={closeMobile}>
                            Beranda
                        </Link>
                        <Link href="/katalog" onClick={closeMobile}>
                            Katalog
                        </Link>
                        {auth.user ? (
                            <>
                                <Link href="/cart" onClick={closeMobile}>
                                    Keranjang
                                </Link>
                                <Link href="/profile" onClick={closeMobile}>
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={closeMobile}>
                                    Login
                                </Link>
                                <Link href="/register" onClick={closeMobile}>
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
