<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UsersProfile;
use App\Models\UsersCuentasBancaria;
use App\Models\MasterTable;
use Exception;
use Illuminate\Support\Facades\Hash;
use \Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\URL;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;
use Mail;
use App\Models\Lang;
use App\Models\Content;

class AuthController extends Controller
{

    var $lang = 1;

    /**
    * Instantiate a new UserController instance.
    */
    public function __construct()
    {
      $lang             =   Lang::select('id','symbol')->where("symbol","=",$_GET["lang"])->first();
      if (!empty($lang)) {
        $this->lang       =   $lang->id;
      }
    }

    public function auth_texts()
    {

      try {
          $content  =   Content::select(  'id',
                                          "label",
                                          "content",
                                          "summary")
                                ->where('slug', '=','auth-login')
                                ->where('langs_id', '=',$this->lang)
                                ->first();
          return response()->success($content, 'Bienvenido!');
      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }

    public function loginWithToken($id){
      $user = User::where('token', $id)->first();

      if (!empty($user->avatar)) {
        /*generate link*/
        $user->avatar   =   URL::asset($user->avatar);
      }else {
        /*img default*/
        $user->avatar   =   URL::asset("uploads/system/avatar.png");
      }

      $user->getRoleNames();

      $tokenResult = $user->createToken('Access Tokens');

      return response()->success([
          'dashboard' => "dashboard",
          'user' => $user,
          'access_token' => $tokenResult->plainTextToken,
          'token_type' => 'Bearer'
      ], 'Bienvenido!');

    }

    /**
     * Inicio de sesión y creación de token
     */
    public function login(Request $request)
    {
        try {
          $validator = Validator::make($request->all(),
              [
                  "email"=>'required|email',
                  "password"=>'required',
              ]
          );

          if($validator->fails()) {
              return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
          }

          $user = User::where('email', $request->input('email'))->first();

          if (!$user || !Hash::check($request->input('password'), $user->password)) {
              return response()->error('Usuario o contraseña incorrectos', 401);
          }

          /*elimino el token en uso anterior para evitar se pueda tener 2 sesiones abiertas al tiempo*/
          if (!empty($user->id)) {
            DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->delete();
          }

          if (!empty($user->avatar)) {
            /*generate link*/
            $user->avatar   =   URL::asset($user->avatar);
          }else {
            /*img default*/
            $user->avatar   =   URL::asset("uploads/system/avatar.png");
          }

          $user->getRoleNames();

          $tokenResult = $user->createToken('Access Tokens');


          return response()->success([
              'dashboard' => "/dashboard",
              'user' => $user,
              'access_token' => $tokenResult->plainTextToken,
              'token_type' => 'Bearer'
          ], 'Bienvenido!');

        } catch (\Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
        }

    }

    /**
     * Cierre de sesión (anular el token)
     */
    public function logout(Request $request)
    {
        try {

          if (!empty($request->user()->id)) {
            DB::table('personal_access_tokens')->where('tokenable_id', $request->user()->id)->delete();
          }

          return response()->success([
              'message' => 'Se ha cerrado sesión con éxito'
          ], 'Logout');

            // print_r($request->input("access_token"));
            // exit;
            //
            //
            // $request->user()->token()->revoke();
            // $request->user()->token()->delete();
            //
            // return response()->success([
            //     'message' => 'Se ha cerrado sesión con éxito'
            // ], 'Logout');

        } catch (Exception $e) {
            return response()->error($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Obtener el objeto User como json
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /*
      * Obtener estado de la conexión
    */

    public function status(){
      return response()->json([ "status"=>true,
                                "Dev"=>"Programandoweb",
                                "email"=>"lic.jorgemendez@gmail.com"]);
    }

    /*
      * Obtener csrf_token
    */

    public function csrf_token(Request $request){
      $token = $request->session()->token();
      $token = csrf_token();
      return response()->json([ "status"=>true,
                                "csrf_token"=>$token,
                                "Dev"=>"Programandoweb",
                                "email"=>"lic.jorgemendez@gmail.com"]);
    }


    /**
     * Cierre de sesión (anular el token)
     */
    public function exit(Request $request)
    {
        try {

            if (!empty($request->user()->id)) {
              DB::table('personal_access_tokens')->where('tokenable_id', $request->user()->id)->delete();
            }

            return response()->success([
                'message' => 'Se ha cerrado sesión con éxito'
            ], 'Logout');

        } catch (Exception $e) {
            return response()->error($e->getMessage(), $e->getCode());
        }
    }

}
