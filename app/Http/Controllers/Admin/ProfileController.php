<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/Profile/Settings', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'user_fullname' => 'required|string|max:100',
            'user_email' => 'required|email|max:50|unique:user,user_email,' . $user->user_id . ',user_id',
            'user_nohp' => 'required|string|max:13',
            'user_alamat' => 'required|string|max:200',
            'user_profil_url' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->only(['user_fullname', 'user_email', 'user_nohp', 'user_alamat']);

        if ($request->hasFile('user_profil_url')) {
            $file = $request->file('user_profil_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/profiles'), $filename);
            $data['user_profil_url'] = '/images/profiles/' . $filename;
            
            // Delete old photo if not the default placeholder
            if ($user->user_profil_url && $user->user_profil_url !== 'url_placeholder_profil' && file_exists(public_path($user->user_profil_url))) {
                @unlink(public_path($user->user_profil_url));
            }
        }

        $user->update($data);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|current_password',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = Auth::user();
        $user->update([
            'user_password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Password updated successfully.');
    }
}
