<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductsCategories extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'label',
        'slug',
        'descripcion',
    ];

    public function productos()
    {
       return $this->hasMany(Products::class, 'categoria_id' ,'id')->select("products.*")->with("multimedia");
    }

}
