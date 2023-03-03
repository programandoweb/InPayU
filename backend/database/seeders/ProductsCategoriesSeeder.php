<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str as Str;
use App\Models\ProductsCategories;

class ProductsCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items[]  = [
          "label"=>"Colchones",
          "slug"=>Str::slug("Colchones"),
        ];
        $items[]  = [
          "label"=>"Base Camas",
          "slug"=>Str::slug("Base Camas"),
        ];
        $items[]  = [
          "label"=>"Ropa de Cama",
          "slug"=>Str::slug("Ropa de Cama"),
        ];

        foreach ($items as $key => $value) {
          ProductsCategories::create($value);
        }

    }
}
