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
        Schema::create('keranjang', function (Blueprint $box) {
            $box->increments('keranjang_id');
            $box->unsignedInteger('keranjang_user_id');
            $box->unsignedInteger('keranjang_pakaian_id');
            $box->integer('keranjang_qty');
            
            $box->foreign('keranjang_user_id')->references('user_id')->on('user')->onDelete('cascade');
            $box->foreign('keranjang_pakaian_id')->references('pakaian_id')->on('pakaian')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keranjang');
    }
};
