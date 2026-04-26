<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembelian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Pembelian::with(['user', 'metodePembayaran']);

        // Filtering
        if ($request->date) {
            $query->whereDate('pembelian_tanggal', $request->date);
        }
        if ($request->month) {
            $query->whereMonth('pembelian_tanggal', $request->month);
        }
        if ($request->year) {
            $query->whereYear('pembelian_tanggal', $request->year);
        }

        // Search by User Name
        if ($request->search) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('user_fullname', 'like', '%' . $request->search . '%');
            });
        }

        $transactions = $query->latest('pembelian_tanggal')->paginate(10);

        // Stats calculation (respecting filters)
        $totalPayments = $query->sum('pembelian_total_harga');
        $completedCount = (clone $query)->where('pembelian_status', 'Completed')->count();
        $processingCount = (clone $query)->where('pembelian_status', 'Processing')->count();
        $refundCount = (clone $query)->where('pembelian_status', 'Refund')->count();

        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['date', 'month', 'year']),
            'stats' => [
                'total_payments' => $totalPayments,
                'completed' => $completedCount,
                'processing' => $processingCount,
                'refund' => $refundCount,
            ]
        ]);
    }
}
