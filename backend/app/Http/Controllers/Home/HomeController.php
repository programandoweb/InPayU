<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductsCategories;
use App\Models\Multimedia;
use App\Models\Products;

class HomeController extends Controller
{

    public function main(){
      try {
        $multimedia             =   Multimedia::select("*")->selectRaw(fullpath())->where("group","=","banner_home")->get();
        $multimedia2            =   Multimedia::select("*")->selectRaw(fullpath())->where("group","=","banner_home2")->get();
        $productsCategories     =   Products::with("relacionados")->inRandomOrder()->first();
        return response()->success([
          "banners"=>$multimedia ,
          "banners2"=>$multimedia2 ,
          "relacionados"=>(!empty($productsCategories->relacionados))?$productsCategories->relacionados:[],
        ], "Data founds");
      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }
    }

    public function home(){
      try {

        return response()->success([
          "categorias"=>ProductsCategories::where("status","=",1)->get(),
        ], "Data founds");
      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }
    }
}
