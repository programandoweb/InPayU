<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Multimedia;
use App\Models\RelProductsMultimedia;
use Illuminate\Support\Str;

class MultimediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function whatsapp(Request $request)
    {
        try {
          return response()->success(Multimedia::where("group","=","whatsapp")->orderBy('id','desc')->first(), 'multimedia Found');
        } catch (\Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
        }
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        try {
          if (!empty($request->q)) {
            return response()->success(Multimedia::where("group","=",$request->q)->orderBy('id','desc')->get(), 'list multimedia Found');
          }else {
            return response()->success(Multimedia::orderBy('id','desc')->get(), 'list multimedia Found');
          }

        } catch (\Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
      try {
        $multimedia           =   new Multimedia;
        $fields               =   $request->only($multimedia->getFillable());
        $multimedia           =   Multimedia::where("url","=",$fields["url"])->get();

        if ($multimedia) {
          $multimedia         =   Multimedia::where("url","=",$fields["url"])->update($fields);
        }

        return response()->success(Multimedia::orderBy('id','desc')->get(), 'Datos guardados con éxito');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadfile(Request $request)
    {
      try {
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
          $deposit      =   'uploads/images/multimedia/';
          $filename     =   md5(date("Y-m-d H:i:s")).'.'.$request->file('images')->getClientOriginalExtension();
          $request->file('images')->move($deposit, $filename);

          $insert       =   [
                              "name"    =>  "",
                              "slug"    =>  "",
                              "url"     =>  env('APP_URL').'/'.$deposit.$filename,
                              "path"   =>   $deposit.$filename,
                              "group"   =>  "",
                              "href"    =>  "",
                              "description"=>"",
                            ];

          $multimedia   =   Multimedia::create($insert);

          $return       =   [
                                "src"=>env('APP_URL').'/'.$deposit.$filename,
                                "deposit"=>$deposit,
                                "id"=>$multimedia->id
                              ];

          return response()->success($return, 'Imagen subida correctamente');
        }


      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }














    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save_producto(Request $request)
    {
      try {
        //p($request->input());
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
          $deposit      =   'uploads/images/multimedia/';
          $filename     =   md5(date("Y-m-d H:i:s")).'.'.$request->file('images')->getClientOriginalExtension();
          $request->file('images')->move($deposit, $filename);

          $insert       =   [
                              "name"    =>  "",
                              "slug"    =>  "",
                              "url"     =>  env('APP_URL').'/'.$deposit.$filename,
                              "group"   =>  "",
                              "path"   =>   $deposit.$filename,
                              "href"    =>  "",
                              "description"=>"",
                            ];

          $multimedia   =   Multimedia::create($insert);

          $return       =   [
                                "src"=>env('APP_URL').'/'.$deposit.$filename,
                                "deposit"=>$deposit,
                                "id"=>$multimedia->id
                              ];


          RelProductsMultimedia::create(
                                        [
                                          "label"=>"Imagen de producto ".$multimedia->id,
                                          "summary"=>"summary de producto " .$multimedia->id,
                                          "products_id"=>$request->input("id"),
                                          "multimedia_id"=>$multimedia->id,
                                        ]
                                      );
          return response()->success(RelProductsMultimedia::leftJoin("multimedia","rel_products_multimedia.multimedia_id","=","multimedia.id")
                                                              ->select("multimedia.*")
                                                              ->selectRaw(fullpath().',multimedia.id as multimedia_id,"'.$request->input("id").'" as products_id')
                                                              ->where("products_id","=",$request->input("id"))
                                                              ->get(), 'Imagen subida correctamente');
        }


      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit_file_producto(Request $request){
      try {
        if (!empty($request->input("label"))) {
          $insert["label"] = $request->input("label");
        }
        if (!empty($request->input("summary"))) {
          $insert["summary"]=$request->input("summary");
        }
        if (!empty($insert)) {
          RelProductsMultimedia::where("multimedia_id","=",$request->input("multimedia_id"))->where("products_id","=",$request->input("products_id"))->update($insert);
        }

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function banner_delete(Request $request){
      try {

        Multimedia::where("id","=",$request->input("id"))->delete();

        return response()->success([], 'Banner eliminado correctamente');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function banner_add(Request $request){
      try {

        //p($request->input());
        $validator = Validator::make($request->all(),
            [
                'img' => 'required',
                'description' => 'required',
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        $multimedia = Multimedia::where("group","=","banner_home")->get();

        $json   =   json_decode($request->input("img"));

        $count    =   count($multimedia) +  1;

        Multimedia::where("id","=",$json->id)->update([
                                                          "description"=>$request->input("description"),
                                                          "group"=>"banner_home",
                                                          "name"=>"Banner ".$count,
                                                          "slug"=>Str::slug("Banner ".$count),
                                                          "href"=>$request->input("href","#"),
                                                      ]);

        return response()->success([], 'Banner guardado correctamente');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }
    }




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function banner_add2(Request $request){
      try {

        //p($request->input());
        $validator = Validator::make($request->all(),
            [
                'img' => 'required',
                'description' => 'required',
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        $multimedia = Multimedia::where("group","=","banner_home2")->get();

        $json   =   json_decode($request->input("img"));

        $count    =   count($multimedia) +  1;

        if (!empty($request->input("name"))) {
          $name     =   $request->input("name");
        }else {
          $name     =   "Banner ".$count;
        }


        Multimedia::where("id","=",$json->id)->update([
                                                          "description"=>$request->input("description"),
                                                          "group"=>"banner_home2",
                                                          "name"=>$name,
                                                          "slug"=>Str::slug("banner_home2_".$name),
                                                          "href"=>$request->input("href","#"),
                                                      ]);

        return response()->success([], 'Banner guardado correctamente');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }
    }




}
