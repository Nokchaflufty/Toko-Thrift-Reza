<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pakaian;
use App\Models\KategoriPakaian;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Pakaian::with('kategoriPakaian')
            ->orderBy('pakaian_id', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Product/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = KategoriPakaian::all()->map(function ($cat) {
            return [
                'id' => $cat->kategori_pakaian_id,
                'name' => $cat->kategori_pakaian_nama
            ];
        });

        return Inertia::render('Admin/Product/Form', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pakaian_nama' => 'required|string|max:255',
            'pakaian_kategori_pakaian_id' => 'required|integer|exists:kategori_pakaian,kategori_pakaian_id',
            'pakaian_stok' => 'required|string|max:100',
            'pakaian_harga' => 'required|string|max:255',
            'pakaian_gambar_url' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $imagePath = '';
        if ($request->hasFile('pakaian_gambar_url')) {
            $path = $request->file('pakaian_gambar_url')->store('pakaian', 'public');
            $imagePath = '/storage/' . $path;
        }

        Pakaian::create([
            'pakaian_nama' => $request->pakaian_nama,
            'pakaian_kategori_pakaian_id' => $request->pakaian_kategori_pakaian_id,
            'pakaian_stok' => $request->pakaian_stok,
            'pakaian_harga' => $request->pakaian_harga,
            'pakaian_gambar_url' => $imagePath,
        ]);

        return redirect()->route('admin.product.index')->with('success', 'Product created successfully.');
    }

    public function edit($id)
    {
        $product = Pakaian::findOrFail($id);
        $categories = KategoriPakaian::all()->map(function ($cat) {
            return [
                'id' => $cat->kategori_pakaian_id,
                'name' => $cat->kategori_pakaian_nama
            ];
        });

        return Inertia::render('Admin/Product/Form', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Pakaian::findOrFail($id);

        $request->validate([
            'pakaian_nama' => 'required|string|max:255',
            'pakaian_kategori_pakaian_id' => 'required|integer|exists:kategori_pakaian,kategori_pakaian_id',
            'pakaian_stok' => 'required|string|max:100',
            'pakaian_harga' => 'required|string|max:255',
            'pakaian_gambar_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $data = [
            'pakaian_nama' => $request->pakaian_nama,
            'pakaian_kategori_pakaian_id' => $request->pakaian_kategori_pakaian_id,
            'pakaian_stok' => $request->pakaian_stok,
            'pakaian_harga' => $request->pakaian_harga,
        ];

        if ($request->hasFile('pakaian_gambar_url')) {
            // Delete old image
            if ($product->pakaian_gambar_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->pakaian_gambar_url));
            }

            $path = $request->file('pakaian_gambar_url')->store('pakaian', 'public');
            $data['pakaian_gambar_url'] = '/storage/' . $path;
        }

        $product->update($data);

        return redirect()->route('admin.product.index')->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Pakaian::findOrFail($id);

        // Delete image
        if ($product->pakaian_gambar_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->pakaian_gambar_url));
        }

        $product->delete();

        return redirect()->route('admin.product.index')->with('success', 'Product deleted successfully.');
    }
}
