<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|unique:user,user_username',
            'email' => 'required|string|lowercase|email|max:255|unique:user,user_email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'user_fullname' => $request->name,
            'user_username' => $request->username,
            'user_email' => $request->email,
            'user_password' => Hash::make($request->password),
            'user_nohp' => '-',
            'user_alamat' => '-',
            'user_level' => 'Pengguna',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
