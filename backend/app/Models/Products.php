<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'description',
        'summary',
        'slug',
        'price',
        'offer',
        'categoria_id',
        'status',
    ];

    public function multimedia()
    {
       return $this->hasMany(RelProductsMultimedia::class, 'products_id' ,'id')->select("*")->selectRaw(fullpath())->leftJoin("multimedia","rel_products_multimedia.multimedia_id","=","multimedia.id");
    }
    public function characteristics()
    {
       return $this->hasMany(RelProductsCharacteristics::class, 'products_id' ,'id')->select("*")->where("name","!=","Incluye")->where("name","!=","Ficha")->where("name","!=","Envio");
    }
    public function incluye()
    {
       return $this->hasMany(RelProductsCharacteristics::class, 'products_id' ,'id')->select("*")->where("name","=","Incluye");
    }
    public function ficha()
    {
       return $this->hasMany(RelProductsCharacteristics::class, 'products_id' ,'id')->select("*")->where("name","=","Ficha");
    }
    public function envio()
    {
       return $this->hasMany(RelProductsCharacteristics::class, 'products_id' ,'id')->select("*")->where("name","=","Envio");
    }
    public function relacionados()
    {
       return $this->hasMany(Products::class, 'categoria_id' ,'categoria_id')
                    ->select("products.*")
                    ->selectRaw("products_categories.label as categoria,CONCAT('/categorias/',products_categories.slug,'/',products.slug) as slugByCategory")
                    ->leftJoin("products_categories","products.categoria_id","=","products_categories.id")
                    ->with("multimedia")
                    ->limit(6)
                    ->inRandomOrder();
    }
    // public function characteristics()
    // {
    //    return $this->hasMany(RelProductsCharacteristics::class, 'id' ,'products_id');
    // }
}
