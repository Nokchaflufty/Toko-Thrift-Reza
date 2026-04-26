<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriPakaian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = KategoriPakaian::query();

        if ($request->search) {
            $query->where('kategori_pakaian_nama', 'like', '%' . $request->search . '%');
        }

        $categories = $query->paginate(5)->withQueryString();
        
        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'kategori_pakaian_nama' => 'required|string|max:50',
            'kategori_pakaian_foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5048',
        ]);

        $data = $request->only(['kategori_pakaian_nama']);

        if ($request->hasFile('kategori_pakaian_foto')) {
            $file = $request->file('kategori_pakaian_foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/categories'), $filename);
            $data['kategori_pakaian_foto'] = '/images/categories/' . $filename;
        }

        KategoriPakaian::create($data);

        return redirect()->route('admin.category.index')->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
        $category = KategoriPakaian::findOrFail($id);
        return Inertia::render('Admin/Category/Form', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kategori_pakaian_nama' => 'required|string|max:50',
            'kategori_pakaian_foto' => 'nullable', // Can be string (existing) or file (new)
        ]);

        $category = KategoriPakaian::findOrFail($id);
        $data = $request->only(['kategori_pakaian_nama']);

        if ($request->hasFile('kategori_pakaian_foto')) {
            $file = $request->file('kategori_pakaian_foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/categories'), $filename);
            $data['kategori_pakaian_foto'] = '/images/categories/' . $filename;
            
            // Delete old photo if exists
            if ($category->kategori_pakaian_foto && file_exists(public_path($category->kategori_pakaian_foto))) {
                @unlink(public_path($category->kategori_pakaian_foto));
            }
        }

        $category->update($data);

        return redirect()->route('admin.category.index')->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = KategoriPakaian::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
