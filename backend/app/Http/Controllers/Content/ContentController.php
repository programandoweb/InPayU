<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Content;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{

  /*
    One Content
  */

  public function contacto(){
      try {
          $data             =   Content::selectRaw(url_generator("id"))->where("slug","=",'contacto')->with("lang")->first();
          //$data          =   url_image($data,"video");
          $data             =   url_image($data);
          return response()->success($data, "Data founds");
      } catch (Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }
  }


  /*
    list Content
  */

  public function index(Request $request){
      $string   = $request->input('search');
      try {

          $users = Content::selectRaw(url_generator("id"))->when($string, function ($query, $string){
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

  /*
    update Packages
    label
    content_label
    content_content
    content_image optional
    content_video optional

    price
    offer optional

  */

  public function update(Request $request){

    try {

      $validator = Validator::make($request->all(),
          [
              'id' => 'required', /*este es el id del paquete*/
          ]
      );

      if($validator->fails()) {
          return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
      }

      $child            =   new Content;
      $fields           =   [];

      foreach ($child->getFillable() as $key => $value) {
        if (!empty($request->input($value))) {
          $fields[$value]   =   $request->input($value);
        }
      }

      Content::where("id","=", $request->input("id"))->update($fields);

      $content          =   Content::where("id","=",$request->input("id"))->first();

      return response()->success($content, "Content update");

    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }

  }


  /**
   * upload file and register comment.
   *
   * @return \Illuminate\Http\Response
   */
  public function upload_images(Request $request)
  {
      try {
        $imagesName   =   [];
        $response     =   [];



        $validator = Validator::make($request->all(),
            [
                'images' => 'required',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:8000'
            ]
        );


        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }



        if($request->has('images')) {
          $deposit      =   'uploads/images/content/';
          $filename     =   md5(date("Y-m-d H:i:s")).'.'.$request->file('images')->getClientOriginalExtension();
          $request->file('images')->move($deposit, $filename);
          $insert       =   [
                              "file"=>env('APP_URL').'/'.$deposit.$filename,
                              "token_relation"=>"content",
                              "user_id"=>$request->user()->id,
                              "comment"=>$request->user()->name." subió una imagen desde el módulo de contenido",
                            ];

          Comments::create($insert);

          return response()->success(env('APP_URL').'/'.$deposit.$filename, 'Imagen subida correctamente');
        }

        //return response()->success($comments, 'no se pudo subir la imagen');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

  }



}
