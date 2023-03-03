<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Multimedia;
use App\Models\RelProductsCharacteristics;
use App\Models\RelProductsMultimedia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductsController extends Controller
{

  public function delete_producto( Request $request ){

    try {
      Products::where("id","=",$request->input("id"))->delete();
      $products = Products::selectRaw(url_generator("id"))->paginate(env('RESULT_X_PAGE'));

      return response()->success($products, "Products Characteristics delete success");
    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }

  }

  private function save_characteristics($id,$request){

    try {
      $validator = Validator::make($request->all(),
          [
              "name"=>'required',
          ]
      );

      if($validator->fails()) {
          return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
      }

      $child                      =   new RelProductsCharacteristics;
      $fields                     =   $request->only($child->getFillable());
      $fields["valor"]            =   $request->input($fields["name"]);
      $fields["products_id"]      =   $id;
      RelProductsCharacteristics::create($fields);
      return response()->success(RelProductsCharacteristics::where("products_id","=",$id)->where("name","=",$fields["name"])->get(), "Products Characteristics save success");
    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }

  }

  private function delete_characteristicsDelete($id,$request){

    try {
      RelProductsCharacteristics::where("id","=",$request->input("id"))->delete();
      return response()->success(RelProductsCharacteristics::where("products_id","=",$request->input("products_id"))
                                                              ->where("name","=",$request->input("name"))
                                                              ->get(), "Products Characteristics delete success");
    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }

  }

  private function delete_multimedia($id,$request){

    try {

      RelProductsMultimedia::where("multimedia_id","=",$request->input("multimedia_id"))->where("products_id","=",$request->input("products_id"))->delete();
      $relProductsMultimedia    =   RelProductsMultimedia::select("*")->selectRaw(fullpath())
                                                        ->leftJoin("multimedia","rel_products_multimedia.multimedia_id","=","multimedia.id")
                                                        ->where("products_id","=",$request->input("products_id"))
                                                        ->get();

      return response()->success($relProductsMultimedia, "Product delete success");
    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }

  }

  public function save_producto($id=0,Request $request){
    try {



      if (!empty($request->input("characteristics")) && $request->input("characteristics")!='[object Object]') {
        return $this->save_characteristics($id,$request);
      }

      if (!empty($request->input("characteristicsDelete"))) {
        return $this->delete_characteristicsDelete($id,$request);
      }

      if (!empty($request->input("multimediaDelete"))) {
        return $this->delete_multimedia($id,$request);
      }

      $validator = Validator::make($request->all(),
          [
              "label"=>'required',
              "categoria_id"=>'required',
              "summary"=>'required',
          ]
      );

      if($validator->fails()) {
          return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
      }

      $child                      =   new Products;
      $fields                     =   $request->only($child->getFillable());

      if (empty($fields["description"])) {
        $fields["description"]="";
      }


      if ($id==0) {
        $fields["slug"]   =   Str::slug($request->input("label"));
        $products=Products::create($fields);
      }else {
        $products=Products::find($id);//where("id","=",$id)->first();
        foreach ($fields as $key => $value) {
            $products[$key] = $value;
        }
        $products["slug"]   =   Str::slug($request->input("label"));
        //p($products);
        $products->save();
      }


      return response()->success($products, "Products save success");

    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }

  }

    public function producto($id){
      try {
          $data = Products::selectRaw(url_generator("id"))
                            ->with("multimedia")
                            ->with("characteristics")
                            ->with("incluye")
                            ->with("ficha")
                            ->with("envio")
                            ->where("id","=",$id)->first();
          return response()->success($data, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }

    public function productos(Request $request){
      $string   = $request->input('search');
      try {

          $users = Products::selectRaw(url_generator("id"))->when($string, function ($query, $string){
              return $query
                  ->where('label', 'like', '%' . $string . '%');
          })->paginate(env('RESULT_X_PAGE'));
          return response()->success($users, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }

    public function publicaciones(Request $request){
      $string   = $request->input('search');
      try {

          $users = Multimedia::selectRaw(url_generator("id"))->when($string, function ($query, $string){
              return $query
                  ->where('name', 'like', '%' . $string . '%');
          })->where('group', '=', 'banner_home')->paginate(env('RESULT_X_PAGE'));
          return response()->success($users, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }

    public function publicaciones2(Request $request){
      $string   = $request->input('search');
      try {

          $users = Multimedia::selectRaw(url_generator("id"))->when($string, function ($query, $string){
              return $query
                  ->where('name', 'like', '%' . $string . '%');
          })->where('group', '=', 'banner_home2')->paginate(env('RESULT_X_PAGE'));
          return response()->success($users, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
    }
}
