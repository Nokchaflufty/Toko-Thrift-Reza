<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pakaian;
use App\Models\KategoriPakaian;
use App\Models\Pembelian;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Pakaian::count(),
            'total_categories' => KategoriPakaian::count(),
            'total_transactions' => Pembelian::count(),
            'total_users' => User::where('user_level', 'Pengguna')->count(),
        ];

        $recentTransactions = Pembelian::with(['user', 'metodePembayaran'])
            ->latest('pembelian_tanggal')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
