<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\MetodePembayaran;
use App\Models\Pembelian;
use App\Models\PembelianDetail;
use App\Models\Pakaian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $cartItems = Keranjang::with('pakaian')
            ->where('keranjang_user_id', Auth::id())
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return (int) $item->pakaian->pakaian_harga * (int) $item->keranjang_qty;
        });

        $paymentMethods = MetodePembayaran::where('metode_pembayaran_user_id', Auth::id())
            ->orderBy('metode_pembayaran_id', 'desc')
            ->get();

        return Inertia::render('Checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'total' => $subtotal,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'payment_method_id' => ['nullable', 'integer'],
            'payment_method_type' => ['required', 'in:DANA,OVO,BCA,COD'],
            'payment_method_number' => ['nullable', 'string', 'max:50'],
        ]);

        $userId = Auth::id();

        return DB::transaction(function () use ($data, $userId) {
            $cartItems = Keranjang::with('pakaian')
                ->where('keranjang_user_id', $userId)
                ->get();

            if ($cartItems->isEmpty()) {
                return redirect()->route('cart.index')->with('error', 'Keranjang kamu kosong.');
            }

            // Lock + validate stock first to avoid partially created orders
            $lockedProducts = [];
            foreach ($cartItems as $item) {
                $qty = (int) $item->keranjang_qty;
                $pakaianId = (int) $item->keranjang_pakaian_id;

                $pakaian = Pakaian::where('pakaian_id', $pakaianId)->lockForUpdate()->first();
                if (!$pakaian) {
                    throw new \RuntimeException('Produk tidak ditemukan.');
                }

                if ((int) $pakaian->pakaian_stok < $qty) {
                    return redirect()
                        ->route('checkout.index')
                        ->with('error', "Stok tidak cukup untuk {$pakaian->pakaian_nama}.");
                }

                $lockedProducts[$pakaianId] = $pakaian;
            }

            $paymentMethodId = null;

            if (!empty($data['payment_method_id'])) {
                $method = MetodePembayaran::where('metode_pembayaran_id', $data['payment_method_id'])
                    ->where('metode_pembayaran_user_id', $userId)
                    ->first();

                if ($method) {
                    $paymentMethodId = $method->metode_pembayaran_id;
                }
            }

            if (!$paymentMethodId) {
                $method = MetodePembayaran::create([
                    'metode_pembayaran_user_id' => $userId,
                    'metode_pembayaran_jenis' => $data['payment_method_type'],
                    'metode_pembayaran_nomor' => $data['payment_method_number'] ?? null,
                ]);
                $paymentMethodId = $method->metode_pembayaran_id;
            }

            $subtotal = 0;
            foreach ($cartItems as $item) {
                $subtotal += ((int) $item->pakaian->pakaian_harga) * ((int) $item->keranjang_qty);
            }

            $pembelian = Pembelian::create([
                'pembelian_user_id' => $userId,
                'pembelian_metode_pembayaran_id' => $paymentMethodId,
                'pembelian_tanggal' => now(),
                'pembelian_total_harga' => $subtotal,
                'pembelian_status' => 'Processing',
            ]);

            foreach ($cartItems as $item) {
                $qty = (int) $item->keranjang_qty;
                $pakaianId = (int) $item->keranjang_pakaian_id;
                $pakaian = $lockedProducts[$pakaianId];

                $unitPrice = (int) $pakaian->pakaian_harga;
                $lineTotal = $unitPrice * $qty;

                PembelianDetail::create([
                    'pembelian_detail_pembelian_id' => $pembelian->pembelian_id,
                    'pembelian_detail_pakaian_id' => $pakaian->pakaian_id,
                    'pembelian_detail_jumlah' => $qty,
                    'pembelian_detail_total_harga' => $lineTotal,
                ]);

                $pakaian->update([
                    'pakaian_stok' => (int) $pakaian->pakaian_stok - $qty,
                ]);
            }

            Keranjang::where('keranjang_user_id', $userId)->delete();

            return redirect()->route('katalog')->with('success', 'Pembelian berhasil dibuat. Pesanan kamu sedang diproses.');
        });
    }
}

