<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pakaian', function (Blueprint $table) {
            $table->text('pakaian_deskripsi')->nullable()->after('pakaian_nama');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pakaian', function (Blueprint $table) {
            $table->dropColumn('pakaian_deskripsi');
        });
    }
};
