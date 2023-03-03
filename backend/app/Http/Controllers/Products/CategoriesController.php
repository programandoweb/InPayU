<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductsCategories;
use App\Models\Products;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoriesController extends Controller
{

  public function save($slug,Request $request){
    try {

        $validator = Validator::make($request->all(),
            [
                "label"=>'required',
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        $child                      =   new ProductsCategories;
        $fields                     =   $request->only($child->getFillable());
        $fields["slug"]             =   Str::slug($fields["label"]);

        if ($slug=='add') {
          $productsCategories       =   ProductsCategories::create($fields);
        }else {
          $productsCategories       =   ProductsCategories::where("id","=",$slug)->update($fields);
        }
        return response()->success($productsCategories, "Categoría ha sido guardada con éxito");
    } catch (Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
    }
  }

  public function productoXSlug($category,$slug){
    try {
        $productsCategories = Products::with("multimedia")
                                        ->with("characteristics")
                                        ->with("incluye")
                                        ->with("ficha")
                                        ->with("envio")
                                        ->with("relacionados")
                                        ->where("slug","=",$slug)->first();
        return response()->success($productsCategories, "productsCategories founds");
    } catch (Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
    }
  }

  public function productosXCategoria($slug){
    try {
        $productsCategories = ProductsCategories::with("productos")->where("slug","=",$slug)->first();
        //p($productsCategories);
        return response()->success($productsCategories, "productsCategories founds");
    } catch (Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
    }
  }

    public function getCategories(){
      try {
          $productsCategories = ProductsCategories::where("status","=",1)->get();
          return response()->success($productsCategories, "productsCategories founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }

    public function categorias(Request $request){
      $string   = $request->input('search');

      try {
          $users = ProductsCategories::selectRaw(url_generator("id"))->when($string, function ($query, $string){
              return $query->where('label', 'like', '%' . $string . '%');
          })->paginate(env('RESULT_X_PAGE'));
          return response()->success($users, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }


    public function categoria($id){
      try {
          $users = ProductsCategories::selectRaw(url_generator("id"))->where("id","=",$id)->first();
          return response()->success($users, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }

    public function delete(Request $request){
      try {
          ProductsCategories::where("id","=",$request->input("id"))->delete();
          return response()->success([], "Categoría eliminada");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }



    public function configuracion(Request $request){
      $string   = $request->input('search');
      try {

          $users = ProductsCategories::selectRaw(url_generator("id"))->when($string, function ($query, $string){
              return $query
                  ->where('label', 'like', '%' . $string . '%');
          })->with("lang")
            ->with("status")
            ->paginate(env('RESULT_X_PAGE'));
          return response()->success($users, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }
}
