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
        Schema::create('pakaian', function (Blueprint $table) {
            $table->increments('pakaian_id');
            $table->unsignedInteger('pakaian_kategori_pakaian_id');
            $table->string('pakaian_nama', 255);
            $table->string('pakaian_harga', 255);
            $table->string('pakaian_stok', 100);
            $table->string('pakaian_gambar_url', 255);

            $table->foreign('pakaian_kategori_pakaian_id')->references('kategori_pakaian_id')->on('kategori_pakaian')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pakaian');
    }
};
