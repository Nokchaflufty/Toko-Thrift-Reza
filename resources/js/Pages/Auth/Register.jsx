import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Head title="Register" />

            {/* Left Side - Image Background */}
            <div className="relative hidden w-1/2 bg-black md:block">
                <img 
                    src="/images/register-bg.png" 
                    alt="Male model" 
                    className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                
                <div className="absolute top-16 left-16 text-white">
                    <h1 className="text-5xl font-extrabold leading-[1] tracking-tight uppercase">
                        CURATED<br />COLLECTIVE
                    </h1>
                </div>

                <div className="absolute bottom-16 left-16 text-white max-w-md">
                    <p className="text-base font-medium text-white/90 leading-relaxed">
                        Authentic vintage finds from the heart of Malang.<br />
                        Join the subculture of curated thrift and streetwear.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full items-center justify-center p-8 md:w-1/2 lg:p-24">
                <div className="w-full max-w-md">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="mb-10 text-sm text-gray-600">
                        Join the Toko Thrift Malang community
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="FULL NAME" className="mb-2 text-xs font-bold tracking-wider text-gray-900 uppercase" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black"
                                placeholder="John Doe"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="username" value="USERNAME" className="mb-2 text-xs font-bold tracking-wider text-gray-900 uppercase" />
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black"
                                placeholder="johndoe123"
                                autoComplete="username"
                                onChange={(e) => setData('username', e.target.value)}
                                required
                            />
                            <InputError message={errors.username} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="EMAIL ADDRESS" className="mb-2 text-xs font-bold tracking-wider text-gray-900 uppercase" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black"
                                placeholder="name@example.com"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <InputLabel htmlFor="password" value="PASSWORD" className="mb-2 text-xs font-bold tracking-wider text-gray-900 uppercase" />
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black pr-10"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex-1">
                                <InputLabel htmlFor="password_confirmation" value="CONFIRM" className="mb-2 text-xs font-bold tracking-wider text-gray-900 uppercase" />
                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-black focus:ring-black pr-10"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-xs text-gray-600">
                                <label htmlFor="terms">
                                    I agree to the <span className="font-bold text-black cursor-pointer hover:underline">Terms of Service</span> and <span className="font-bold text-black cursor-pointer hover:underline">Privacy Policy</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center rounded-md bg-black px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:opacity-75"
                        >
                            Create Account
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Or register with
                        </span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            GOOGLE
                        </button>
                        <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50">
                            <svg className="mr-2 h-4 w-4 text-black" viewBox="0 0 384 512" fill="currentColor">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.1-44.6-35.9-2.8-74.3 22.7-93.1 22.7-18.8 0-46.6-22.2-75-22.2-45.6 0-89.6 30.6-112.5 76.5-47.9 96.1-13 194.2 32.8 261 22.8 32.8 50.6 69.4 86.9 69.4 34.4 0 46.9-20.6 86.9-20.6 39.4 0 50.6 20.6 88.4 20.6 38.8 0 63.8-35.6 86.9-69.4 16.3-23.9 28.1-50 33.8-66.7-32.8-15-50.6-47.2-50.6-82.5zM258.4 88.6c20.6-24.4 33.8-58.3 30-91.1-28.1 1.1-63.1 18.9-84.4 43.3-18.8 21.1-33.8 56.1-29.4 88.3 31.3 2.2 63.8-16.1 83.8-40.5z"/>
                            </svg>
                            APPLE
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm font-medium text-gray-600">
                        Already have an account?{' '}
                        <Link href={route('login')} className="font-bold text-gray-900 hover:text-black">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
