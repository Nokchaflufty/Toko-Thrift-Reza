import { Link } from '@inertiajs/react';

export default function LoginModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                
                <h2 className="modal-title">Kamu belum login</h2>
                <p className="modal-subtitle">Silakan login terlebih dahulu untuk melanjutkan</p>
                
                <div className="modal-actions-vertical">
                    <Link href="/login" className="btn-modal-primary">
                        LOGIN SEKARANG
                    </Link>
                    <Link href="/register" className="btn-modal-outline">
                        DAFTAR AKUN BARU
                    </Link>
                    <button onClick={onClose} className="btn-modal-text">
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}
