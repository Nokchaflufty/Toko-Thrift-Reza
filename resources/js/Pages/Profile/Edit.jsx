import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { useState, useRef } from 'react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef();

    const { data, setData, post, errors, processing } = useForm({
        _method: 'PATCH', // Spoofing PATCH for file upload
        user_fullname: user.user_fullname || '',
        user_email: user.user_email || '',
        user_nohp: user.user_nohp || '',
        user_alamat: user.user_alamat || '',
        user_profil: null,
    });

    const [preview, setPreview] = useState(user.user_profil_url || '/images/default-avatar.png');

    const { data: passwordData, setData: setPasswordData, put: updatePassword, errors: passwordErrors, processing: passwordProcessing, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Use post because of file upload, spoofing PATCH via data
        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        updatePassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('user_profil', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <UserLayout>
            <Head title="Pengaturan Profil" />

            <div className="profile-page">
                <div className="profile-container">
                    {/* Sidebar */}
                    <aside className="profile-sidebar">
                        <div className="sidebar-header">
                            <h2 className="sidebar-title">Settings</h2>
                            <p className="sidebar-subtitle">Manage your profile & preferences</p>
                        </div>
                        <nav className="profile-nav">
                            <button className="nav-item active" type="button">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Personal Info
                            </button>
                            <Link href="/profile/purchases" className="nav-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                    <path d="M6 2h12l3 6v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8l3-6Z"></path>
                                    <path d="M3 8h18"></path>
                                    <path d="M16 12a4 4 0 0 1-8 0"></path>
                                </svg>
                                Riwayat Pembelian
                            </Link>
                            <button onClick={() => window.history.back()} className="nav-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                Kembali
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="profile-main">
                        {/* Personal Details Section */}
                        <section className="profile-section">
                            <div className="section-header-flex">
                                <h3 className="section-title">Personal Details</h3>
                                <button onClick={handleProfileUpdate} className="btn-edit-profile" disabled={processing}>
                                    Save Profile
                                </button>
                            </div>

                            <div className="profile-user-info">
                                <div className="profile-avatar-wrapper" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                                    <img src={preview} alt={user.user_fullname} className="profile-avatar-large" />
                                    <button className="avatar-edit-badge" aria-label="Edit Avatar">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>
                                <div className="profile-name-group">
                                    <h4 className="user-name-title">{user.user_fullname}</h4>
                                    <p className="user-location-text">Malang, Indonesia</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileUpdate} className="profile-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            value={data.user_fullname} 
                                            onChange={e => setData('user_fullname', e.target.value)}
                                            placeholder="Elena Richards"
                                        />
                                        {errors.user_fullname && <span className="form-error">{errors.user_fullname}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input 
                                            type="email" 
                                            value={data.user_email} 
                                            onChange={e => setData('user_email', e.target.value)}
                                            placeholder="elena.richards@gmail.com"
                                        />
                                        {errors.user_email && <span className="form-error">{errors.user_email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input 
                                            type="text" 
                                            value={data.user_nohp} 
                                            onChange={e => setData('user_nohp', e.target.value)}
                                            placeholder="+1 (415) 555-0123"
                                        />
                                        {errors.user_nohp && <span className="form-error">{errors.user_nohp}</span>}
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label>Alamat</label>
                                    <textarea 
                                        value={data.user_alamat} 
                                        onChange={e => setData('user_alamat', e.target.value)}
                                        placeholder="Alamat lengkap..."
                                        rows="3"
                                    />
                                    {errors.user_alamat && <span className="form-error">{errors.user_alamat}</span>}
                                </div>
                            </form>
                        </section>

                        {/* Change Password Section */}
                        <section className="profile-section">
                            <h3 className="section-title">Change Password</h3>
                            <form onSubmit={handlePasswordUpdate} className="profile-form mt-4">
                                <div className="form-group full-width">
                                    <label>Current Password</label>
                                    <input 
                                        type="password" 
                                        value={passwordData.current_password}
                                        onChange={e => setPasswordData('current_password', e.target.value)}
                                    />
                                    {passwordErrors.current_password && <span className="form-error">{passwordErrors.current_password}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label>New Password</label>
                                    <input 
                                        type="password" 
                                        value={passwordData.password}
                                        onChange={e => setPasswordData('password', e.target.value)}
                                    />
                                    {passwordErrors.password && <span className="form-error">{passwordErrors.password}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label>Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        value={passwordData.password_confirmation}
                                        onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                    />
                                    {passwordErrors.password_confirmation && <span className="form-error">{passwordErrors.password_confirmation}</span>}
                                </div>
                                <div className="form-actions-inline">
                                    <button type="submit" className="btn-update-password" disabled={passwordProcessing}>
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </section>

                        <div className="profile-final-actions">
                            <button onClick={handleLogout} className="btn-logout-alt">
                                Logout
                            </button>
                            <button onClick={handleProfileUpdate} className="btn-save-changes" disabled={processing}>
                                Save Changes
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </UserLayout>
    );
}
