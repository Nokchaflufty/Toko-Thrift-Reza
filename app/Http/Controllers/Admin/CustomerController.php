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
        $onlineCutoff = now()->subMinutes(5)->timestamp;
        $customerUserIds = User::where('user_level', 'Pengguna')->pluck('user_id')->all();
        $onlineUserIds = DB::table('sessions')
            ->whereNotNull('user_id')
            ->whereIn('user_id', $customerUserIds)
            ->where('last_activity', '>=', $onlineCutoff)
            ->distinct()
            ->pluck('user_id')
            ->all();

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
            $query->whereIn('user_id', $onlineUserIds);
        } elseif ($request->status === 'offline') {
            $query->whereNotIn('user_id', $onlineUserIds);
        }

        $users = $query
            ->paginate(10)
            ->through(fn ($user) => array_merge($user->toArray(), [
                'is_online' => in_array($user->user_id, $onlineUserIds, true),
            ]));
        
        $totalUsers = count($customerUserIds);
        $onlineUsers = count($onlineUserIds);
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
