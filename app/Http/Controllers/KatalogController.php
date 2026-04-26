<?php

namespace App\Http\Controllers;

use App\Models\KategoriPakaian;
use App\Models\Pakaian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KatalogController extends Controller
{
    public function index(Request $request)
    {
        $query = Pakaian::with('kategoriPakaian');

        // Filter by category
        if ($request->category) {
            $query->where('pakaian_kategori_pakaian_id', $request->category);
        }

        // Filter by search
        if ($request->search) {
            $query->where('pakaian_nama', 'like', '%' . $request->search . '%');
        }

        $products = $query->orderBy('pakaian_id', 'desc')->paginate(9)->withQueryString();
        $categories = KategoriPakaian::all();

        return Inertia::render('Katalog', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
        ]);
    }

    public function show($id)
    {
        $product = Pakaian::with('kategoriPakaian')->findOrFail($id);
        
        // Get all products (excluding current product) for the carousel
        $allProducts = Pakaian::with('kategoriPakaian')
            ->where('pakaian_id', '!=', $id)
            ->inRandomOrder() // Mix them up for variety
            ->get();

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'allProducts' => $allProducts
        ]);
    }
}
