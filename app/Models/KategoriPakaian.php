<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriPakaian extends Model
{
    protected $table = 'kategori_pakaian';
    protected $primaryKey = 'kategori_pakaian_id';
    public $timestamps = false;

    protected $fillable = [
        'kategori_pakaian_nama',
        'kategori_pakaian_foto',
    ];
}
