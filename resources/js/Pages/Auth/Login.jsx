import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title="Log in" />

            {/* Left Side - Image Background */}
            <div className="relative hidden w-1/2 bg-slate-900 md:block">
                <img 
                    src="/images/login-bg.png" 
                    alt="Fashion model" 
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-16 left-16 text-white">
                    <p className="mb-4 text-sm font-bold tracking-widest uppercase text-white/90">Est. 2024</p>
                    <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight uppercase">
                        The finds that <br /> define you.
                    </h1>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full items-center justify-center p-8 md:w-1/2 lg:p-24">
                <div className="w-full max-w-md">
                    {/* Top Label */}
                    <div className="mb-10">
                        <span className="text-sm font-bold tracking-widest uppercase text-black">Curated</span>
                        <div className="mt-2 h-px w-8 bg-black"></div>
                    </div>

                    <h2 className="mb-3 text-3xl font-bold text-gray-900">Toko Thrift Malang</h2>
                    <p className="mb-8 text-sm text-gray-600">
                        Sign in to browse curated vintage pieces and heritage workwear.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="username" value="USERNAME" className="mb-2 text-xs font-bold tracking-wider text-gray-900" />
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black"
                                placeholder="Enter your username"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('username', e.target.value)}
                            />
                            <InputError message={errors.username} className="mt-2" />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <InputLabel htmlFor="password" value="PASSWORD" className="text-xs font-bold tracking-wider text-gray-900" />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-medium text-gray-600 transition-colors hover:text-gray-900"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>
                            
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black pr-12"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {/* Eye icon toggle */}
                                <div 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 p-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Hidden remember me field to maintain data shape */}
                        <div className="hidden">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center rounded-md bg-black px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:opacity-75"
                        >
                            Login
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Or continue with
                        </span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            GOOGLE
                        </button>
                        <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
                            <svg className="mr-2 h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            FACEBOOK
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm font-medium text-gray-600">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="font-bold text-gray-900 underline underline-offset-2 hover:text-black">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
