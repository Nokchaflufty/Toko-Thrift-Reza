<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Pembelian;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function purchases(Request $request): Response
    {
        $userId = (int) $request->user()->user_id;

        $orders = Pembelian::with([
            'metodePembayaran',
            'details.pakaian',
        ])
            ->where('pembelian_user_id', $userId)
            ->orderByDesc('pembelian_tanggal')
            ->get()
            ->map(function ($order) {
                $items = $order->details->map(function ($d) {
                    $p = $d->pakaian;

                    return [
                        'id' => (int) $d->pembelian_detail_id,
                        'qty' => (int) $d->pembelian_detail_jumlah,
                        'line_total' => (int) $d->pembelian_detail_total_harga,
                        'product' => $p ? [
                            'id' => (int) $p->pakaian_id,
                            'name' => $p->pakaian_nama,
                            'price' => (int) $p->pakaian_harga,
                            'image' => $p->pakaian_gambar_url,
                        ] : null,
                    ];
                });

                return [
                    'id' => (int) $order->pembelian_id,
                    'date' => $order->pembelian_tanggal,
                    'status' => $order->pembelian_status,
                    'total' => (int) $order->pembelian_total_harga,
                    'payment' => $order->metodePembayaran ? [
                        'id' => (int) $order->metodePembayaran->metode_pembayaran_id,
                        'type' => $order->metodePembayaran->metode_pembayaran_jenis,
                        'number' => $order->metodePembayaran->metode_pembayaran_nomor,
                    ] : null,
                    'items' => $items,
                ];
            });

        return Inertia::render('Profile/Purchases', [
            'orders' => $orders,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Explicitly set each field to guarantee they are saved
        $user->user_fullname = $request->input('user_fullname');
        $user->user_email    = $request->input('user_email');
        $user->user_nohp     = $request->input('user_nohp');
        $user->user_alamat   = $request->input('user_alamat');

        if ($request->hasFile('user_profil')) {
            $file     = $request->file('user_profil');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/profiles'), $filename);

            // Delete old file if it exists and is a local upload
            if ($user->user_profil_url && str_starts_with($user->user_profil_url, '/uploads/')) {
                $oldPath = public_path($user->user_profil_url);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $user->user_profil_url = '/uploads/profiles/' . $filename;
        }

        if ($user->isDirty('user_email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
