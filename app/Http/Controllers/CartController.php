<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Pakaian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Keranjang::with('pakaian')
            ->where('keranjang_user_id', Auth::id())
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return $item->pakaian->pakaian_harga * $item->keranjang_qty;
        });

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'total' => $subtotal
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pakaian_id' => 'required|exists:pakaian,pakaian_id',
            'qty' => 'required|integer|min:1',
        ]);

        $existingItem = Keranjang::where('keranjang_user_id', Auth::id())
            ->where('keranjang_pakaian_id', $request->pakaian_id)
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'keranjang_qty' => $existingItem->keranjang_qty + $request->qty
            ]);
        } else {
            Keranjang::create([
                'keranjang_user_id' => Auth::id(),
                'keranjang_pakaian_id' => $request->pakaian_id,
                'keranjang_qty' => $request->qty,
            ]);
        }

        return redirect()->route('cart.index')->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    public function update(Request $request, $id)
    {
        $cartItem = Keranjang::where('keranjang_user_id', Auth::id())
            ->where('keranjang_id', $id)
            ->firstOrFail();

        $cartItem->update([
            'keranjang_qty' => $request->qty
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        Keranjang::where('keranjang_user_id', Auth::id())
            ->where('keranjang_id', $id)
            ->delete();

        return redirect()->back();
    }
}
