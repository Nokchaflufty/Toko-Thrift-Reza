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
        Schema::create('pembelian_detail', function (Blueprint $table) {
            $table->increments('pembelian_detail_id');
            $table->unsignedInteger('pembelian_detail_pembelian_id');
            $table->unsignedInteger('pembelian_detail_pakaian_id');
            $table->integer('pembelian_detail_jumlah');
            $table->integer('pembelian_detail_total_harga');

            $table->foreign('pembelian_detail_pembelian_id')->references('pembelian_id')->on('pembelian')->onDelete('cascade');
            $table->foreign('pembelian_detail_pakaian_id')->references('pakaian_id')->on('pakaian')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembelian_detail');
    }
};
