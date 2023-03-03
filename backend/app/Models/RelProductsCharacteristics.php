<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelProductsCharacteristics extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'valor',
        'products_id',
    ];
}
