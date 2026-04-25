<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\KategoriPakaian;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an Admin user if not exists
        if (!User::where('user_username', 'admin')->exists()) {
            User::create([
                'user_username' => 'admin',
                'user_password' => Hash::make('password123'),
                'user_fullname' => 'Administrator',
                'user_email' => 'admin@tokothrift.com',
                'user_nohp' => '081234567890',
                'user_alamat' => 'Jl. Admin Malang No. 1',
                'user_level' => 'Admin',
            ]);
        }

        // Create default categories
        $categories = ['Outerwear', 'Tops', 'Denim', 'Footwear', 'Accessories'];
        foreach ($categories as $category) {
            KategoriPakaian::firstOrCreate(['kategori_pakaian_nama' => $category]);
        }
    }
}
