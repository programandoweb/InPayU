<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UsersProfile;
use App\Models\UsersCuentasBancaria;
use App\Models\MasterTable;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Mail;

class UserController extends Controller
{
  /*primer paso para el registro de usuarios*/
  public function VerificarTelefono(Request $request){
    try {
      $user = User::select('id')->where('celular', $request->input('celular'))->first();
      if (!empty($user)) {
        return response()->error("Número ya asociado a una cuenta", 500);
      }else {
        return response()->success([], 'Número disponible para crear cuenta');
      }
    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }
  }

  /*SEGUNDO PASO REGISTRAR LA CUENTA*/
  public function CrearCuenta(Request $request)
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

        $child                      =   new User;
        $fields                     =   $request->only($child->getFillable());

        $fields["remember_token"]   =   md5(date("Y-m-d H:i:s"));
        $fields["password"]         =   Hash::make($request->input('password'));
        $fields["ma_estatus_id"]    =   1;
        /*cambiar en produccion*/
        if (env('APP_ENV')=='local') {
          $fields['codigo_sms']       =   123456;
        }else {
          $fields['codigo_sms']       =   rand(100000,999000);
        }


        $user                       =   User::select('id')->where('email', $request->input('email'))->orWhere('celular', $request->input('celular'))->first();

        if (empty($user)) {


          /*CREAMOS EL USUARIO*/
          $user                     =   User::create($fields);
          /*ASIGNAMOS EL ROL DE CLIENTE*/
          $user->assignRole('Cliente');

          /*
            Luego de crear el usuario,
            procedemos a crear el perfil del usuario o empresa según el caso
          */

          /*CREAMOS EL PERFIL*/
          $child_profile              =   new UsersProfile;
          $fields_profile             =   $request->only($child_profile->getFillable());
          $fields_profile["user_id"]  =   $insert_id  =   $user->id;
          //p($fields_profile);
          UsersProfile::create($fields_profile);


          /*determino se se está creando una cuenta usuario o empresa*/
          if (!empty($request->input('nombres'))) {
            $nombres  = $request->input('nombres').' '.$request->input('apellidos');
          }else {
            $nombres  = $request->input('razon_social');
          }


          foreach (['01'=>'COP','02'=>'USD','03'=>'EUR'] as $k => $v){
            $insert2[$k]['titular'] 		         =    $nombres;
            $insert2[$k]['usuario_id'] 		       =    $insert_id;
            $insert2[$k]['ma_moneda_id'] 	       =    MasterTable::where("label","=",$v)->first()->id;
            $insert2[$k]['nro_cuenta'] 		       =    $k.$user->celular;
            $insert2[$k]['ma_tipo_cuenta_id'] 	 =    MasterTable::where("label","=",'Billetera Móvil')->first()->id;
            $insert2[$k]['estatus'] 			       =    2;
            UsersCuentasBancaria::create($insert2[$k]);
          }

          //p($insert2);



          $mensaje	                =	  "Hola ".$nombres.", pagoslocales.com nunca te llamará para solicitarte este código, tu código de activación es: ".$fields['codigo_sms'];
          /*LO DESCOMENTAMOS AL TERMINAR DE PROGRAMAR*/
          //sms(3115000926,$mensaje);


          /*
            Esta sección está comentada porque hay que crear una vista para el email de registro
            Esta vista es con diseño pagos locales, la dejo de último para maquetar luego
          */
          if (env('APP_ENV')!='local') {
            $subject  =   "Creación de cuenta usuario";
            $for      =   $user->email;
            $send=[
                                              "name"=>$user->name,
                                              "message"=>"Hemos registrado una cuenta en nuestra plataforma con tu correo electrónico <b>".$user->email."</b>, Gracias por confiar en nuestra plataforma.",
                                            ];
            Mail::send('register_user_form',["variables"=>$send], function($msj) use($subject,$for){
                $msj->from("fesolafiliacion@gmail.com","Afiliaciones FESOL");
                $msj->subject($subject);
                $msj->to($for);
            });
          }

        }else {
          return response()->error("Email se encuentra registrado en nuestra base de datos", 500);
        }

        $user                       =   User::select('celular','codigo_sms')->where('email', $request->input('email'))->first();

        return response()->success($user, 'Usuario creado con éxito');
      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

  }

  public function VerificarTelefonoCodigoSMS(Request $request){

    try {
      /*UNIMOS LAS PIEZAS DEL CÓDIGO SMS*/
      $codigo = 		strtoupper(
                                $request->input('input_1').
                                $request->input('input_2').
                                $request->input('input_3').
                                $request->input('input_4').
                                $request->input('input_5').
                                $request->input('input_6')
                              );
      $user   =   User::select('id')
                        ->where('codigo_sms', $codigo)
                        ->where('celular', $request->input('celular'))
                        ->first();
      if (!empty($user)) {
        User::where( 'id', $user->id )->update(['codigo_sms' => 9000]);
        return response()->success(true, 'Usuario confirmado con éxito');
      }else {
        return response()->error("La confirmación ha fallado, no coincide el código o número de celular", 500);
      }

    } catch (\Exception $e) {
      return response()->error($e->getMessage(), $e->getCode());
    }



  }

}
