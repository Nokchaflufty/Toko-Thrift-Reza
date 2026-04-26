import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Settings({ user }) {
    const { flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(user.user_profil_url && user.user_profil_url !== 'url_placeholder_profil' ? user.user_profil_url : `https://ui-avatars.com/api/?name=${user.user_fullname}&size=200&background=black&color=fff`);

    // Form for profile details
    const { data: profileData, setData: setProfileData, post: postProfile, processing: profileProcessing, errors: profileErrors } = useForm({
        user_fullname: user.user_fullname || '',
        user_email: user.user_email || '',
        user_nohp: user.user_nohp || '',
        user_alamat: user.user_alamat || '',
        user_profil_url: null,
        _method: 'PUT', // Spoofing for file upload
    });

    // Form for password change
    const { data: passwordData, setData: setPasswordData, put: updatePassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
        old_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData('user_profil_url', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        postProfile(route('admin.settings.update'), {
            forceFormData: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        updatePassword(route('admin.settings.password'), {
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AdminLayout currentRoute="settings" showSearch={false}>
            <Head title="Profile Settings" />

            {/* Success Notification */}
            {flash?.success && (
                <div className="fixed top-8 right-8 z-50 bg-black text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce-short">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-bold uppercase tracking-widest">{flash.success}</span>
                </div>
            )}

            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 mb-6">
                <span>Admin</span>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-bold">Profile Settings</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Personal Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                        <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center space-x-8">
                            <div className="relative w-32 h-32 group">
                                <div className="w-full h-full rounded-xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                    <img 
                                        src={previewUrl} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-2 right-2 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight uppercase">Personal Details</h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Update your personal information and profile picture.</p>
                                {profileErrors.user_profil_url && <p className="mt-1 text-xs text-red-500 font-bold uppercase tracking-tighter">{profileErrors.user_profil_url}</p>}
                            </div>
                        </div>

                        <form onSubmit={submitProfile} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                                    <input 
                                        type="text"
                                        value={profileData.user_fullname}
                                        onChange={e => setProfileData('user_fullname', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all"
                                    />
                                    {profileErrors.user_fullname && <p className="mt-1 text-xs text-red-500 font-bold">{profileErrors.user_fullname}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                    <input 
                                        type="email"
                                        value={profileData.user_email}
                                        onChange={e => setProfileData('user_email', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all"
                                    />
                                    {profileErrors.user_email && <p className="mt-1 text-xs text-red-500 font-bold">{profileErrors.user_email}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                                    <input 
                                        type="text"
                                        value={profileData.user_nohp}
                                        onChange={e => setProfileData('user_nohp', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all"
                                    />
                                    {profileErrors.user_nohp && <p className="mt-1 text-xs text-red-500 font-bold">{profileErrors.user_nohp}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Residential Address</label>
                                <textarea 
                                    rows="3"
                                    value={profileData.user_alamat}
                                    onChange={e => setProfileData('user_alamat', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all resize-none"
                                ></textarea>
                                {profileErrors.user_alamat && <p className="mt-1 text-xs text-red-500 font-bold">{profileErrors.user_alamat}</p>}
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    type="submit"
                                    disabled={profileProcessing}
                                    className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: Password & Info */}
                <div className="space-y-8">
                    {/* Change Password Card */}
                    <div className="bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-8 transition-colors">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-8 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 dark:text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Change Password</h3>
                        </div>

                        <form onSubmit={submitPassword} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Old Password</label>
                                <input 
                                    type="password"
                                    value={passwordData.old_password}
                                    onChange={e => setPasswordData('old_password', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all"
                                />
                                {passwordErrors.old_password && <p className="mt-1 text-xs text-red-500 font-bold">{passwordErrors.old_password}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">New Password</label>
                                <input 
                                    type="password"
                                    value={passwordData.password}
                                    onChange={e => setPasswordData('password', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all"
                                />
                                {passwordErrors.password && <p className="mt-1 text-xs text-red-500 font-bold">{passwordErrors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Confirm New Password</label>
                                <input 
                                    type="password"
                                    value={passwordData.password_confirmation}
                                    onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg text-sm dark:text-white focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white transition-all"
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={passwordProcessing}
                                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all mt-2 disabled:opacity-50"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>

                    {/* Account Info Card */}
                    <div className="bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-white/5 shadow-sm p-8 transition-colors">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-8 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 dark:text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Account Info</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-white/5">
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Role</span>
                                <span className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black rounded uppercase tracking-widest">{user.user_level}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-white/5">
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Joined</span>
                                <span className="text-xs text-gray-900 dark:text-white font-bold">Jan 12, 2023</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Last Login</span>
                                <span className="text-xs text-gray-900 dark:text-white font-bold">2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
