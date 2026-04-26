<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('user_level', 'Pengguna')->latest('user_id');

        // Search
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('user_fullname', 'like', '%' . $request->search . '%')
                  ->orWhere('user_email', 'like', '%' . $request->search . '%');
            });
        }

        // Filtering
        if ($request->status === 'online') {
            $query->whereIn('user_id', DB::table('sessions')->whereNotNull('user_id')->pluck('user_id'));
        } elseif ($request->status === 'offline') {
            $query->whereNotIn('user_id', DB::table('sessions')->whereNotNull('user_id')->pluck('user_id'));
        }

        $users = $query->paginate(10);
        
        $totalUsers = User::where('user_level', 'Pengguna')->count();
        $onlineUsers = DB::table('sessions')
            ->whereIn('user_id', User::where('user_level', 'Pengguna')->pluck('user_id'))
            ->whereNotNull('user_id')
            ->distinct('user_id')
            ->count();
        $offlineUsers = $totalUsers - $onlineUsers;

        return Inertia::render('Admin/Customer/Index', [
            'users' => $users,
            'filters' => $request->only(['status']),
            'stats' => [
                'total' => $totalUsers,
                'online' => $onlineUsers,
                'offline' => $offlineUsers > 0 ? $offlineUsers : 0,
            ]
        ]);
    }
}
