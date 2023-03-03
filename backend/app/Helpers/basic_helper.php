<?php
//use DB;
if (! function_exists('sms')) {
    function sms($num,$mensaje)
    {
      if (empty($mensaje) || empty($mensaje)) {
        return false;
      }
      $apikey 	=  env('SMS_API_KEY');
  		$secret 	=  env('SMS_SECRET');
      $method 	=  "POST";
  		$uri 			=   env('SMS_URI');


      $data = json_encode(array(
  															  "name" => "Campaña",
  															  "notification" => false,
  															  "email"=>"",
  															  "receiver" => array(
  															        "indicative"=>"57",
  															        "phone"=>"$num",
  															        "message"=>$mensaje
  															  ),
  															  "idSmsCategory"=>"1159", // debe ir aqui la una id de categoria de sms que pertenecezca a la cuenta
  															  "datesend"=>"",
  															  "datenow"=>true,
  															  "timezone"=>"-0500",
  															  "morecaracter"=>false // si va a usar mas de 160 caracteres mandar en true, solo se permite hasta 300
  															));

      try {
  		 	$pwd 		= 	hash_hmac('sha1', $method . "|" . $uri . "|" . $data, $secret);
  			$ch 		= 	curl_init($uri);
  			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
  			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  			curl_setopt($ch, CURLOPT_HTTPHEADER, array(

  			'Authorization: Hmac '.base64_encode($apikey . ":" . $pwd),
  			'Content-Type: application/json',
  			'Content-Length: '.strlen ($data)));

  			curl_setopt($ch, CURLOPT_TIMEOUT, 5);
  			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

  			$result = curl_exec($ch);
  			if(curl_errno($ch)){
  				throw new Exception(curl_error($ch));
  			}
  			curl_close($ch);
  			return $result;
  		} catch (\Exception $ex) {
  			return "Error: ".$ex->getMessage();
  		}

    }
}

if (! function_exists('sum')) {
    function sum($key,$as)
    {
      return  " SUM(". $key .") as ".$as.", FORMAT(SUM(". $key ."),2) as ".$as."_string";
    }
}

if (! function_exists('decode_pay')) {
  function decode_pay($data)
  {
    $explode  = explode("/",$data);
    if (count($explode)) {
      list($table,$column,$value) = $explode;
      $result=DB::table($table)->where($column,'=',$value)->first();
      if (!empty($result->prices_id) &&  str_contains($data, "courses/id/") ) {
        $prices             =   DB::table("prices")->where("id",'=',$result->prices_id)->first();
        $result->saldo      =   ($prices->offer>0)?$prices->offer:$prices->price;
        $result->concepto   =   $result->label;
        $result->courses_id =   (!empty($result->id))?$result->id:false;
      }
      return $result;
    }else{
      return false;
    }

  }
}

if (! function_exists('fullpath')) {
    function fullpath( $column="path",$alias="fullpath" ){
      $uri  = env('APP_URL');
      return "CONCAT('". $uri ."','/',".$column.") as ".$alias;
    }
}

if (! function_exists('products_slug')) {
    function products_slug(){
      return "CONCAT(products_categories.slug,'/',products.label) as products_slug";
    }
}

if (! function_exists('url_image')) {
    function url_image( $data, $column="image" ){
      if (is_object($data) && !empty($data->{$column})) {
        $data->{$column}  =   URL::asset($data->{$column});
      }
      if (is_array($data) && !empty($data[$column])) {
        $data[$column]    =   URL::asset($data[$column]);
      }
      return $data;
    }
}

if (! function_exists('selectRawSlug')) {
    function selectRawSlug(){
      $uri  = "cms_programandoweb";
      return "CONCAT('". $uri ."','/',slug) as slug";
    }
}


if (! function_exists('response_concat_url')) {
    function response_concat_url($column,$alias)
    {
      $uri  = env('APP_URL');
      return "CONCAT('". $uri ."','/',".$column.") as ".$alias;
    }
}

if (! function_exists('format_php')) {
    function format_php($num,$decimal=true)
    {
      if($decimal){
    		return number_format($num, 2, ',', '.');
    	}else{
    		return number_format($num,0, '', '.');
    	}
    }
}

if (! function_exists('format')) {
    function format($key,$as)
    {
      return  " FORMAT(". $key .",2) as ".$as;
    }
}

if (! function_exists('url_generator')) {
    function url_generator($key="id",$columns="*",$is_erasable=false)
    {

      if (str_contains (url()->current(),"scraping")) {
        $explode1[]          =   explode("api",url()->current());
        $explode1[]          =   "/dashboard/scraping/categorias/list";
      }else {
        $explode1           =   explode("api",url()->current());
      }


      $explode2           =   explode("?",url()->full());
      $return             =   $columns;

      if (!empty($explode1) && count($explode1)>1) {
        list($none,$uri)    =   $explode1;
        $return.=",CONCAT('". $uri ."','/',".$key.") as edit";
      }

      if (!empty($explode2) && count($explode2)>1) {
        list($none,$uri2)   =   $explode2;
        $return.=",CONCAT('". $uri ."','/',".$key.") as destroy";
      }

      if ($is_erasable) {
        $return.=", IF(is_erasable>0,CONCAT('". $uri ."','/Delete/',".$is_erasable."),'')  as del";
      }

      return $return;

    }
}

if (! function_exists('punctuation_marks')) {
    function punctuation_marks()
    {
      return [
                ",",
                ";",
                ".",
                "¿",
                "?",
                "¡",
                "!",
                "*",
                "@",
                "_",
                "-",
                "#",
              ];
    }
}

if (! function_exists('set_lowercase')) {
    function set_lowercase($fields)
    {
      return $fields;
      $fields_lowercase=[];
      foreach ($fields as $key => $value) {
        $fields_lowercase[$key] = strtolower($value);
      }
      return $fields_lowercase;
    }
}

if (! function_exists('array_clients_columns')) {
    function array_clients_columns($vars)
    {
        $array=[
          "name"=>"Nombres",
          "surnames"=>"Apellidos",
          "gender"=>"Género",
          "marital_status"=>"Estado Civil",
          "document_type"=>"Tipo de documento",
          "identification"=>"Documento",
          "identification_expedition_place"=>"Fecha de expedición del documento",
          "nationality"=>"Nacionalidad",
          "place_birth"=>"Lugar de nacimiento",
          "date_birth"=>"Fecha de nacimiento",
          "dependents"=>"Personas a cargo",
          "direction"=>"Dirección",
          "neighborhood"=>"Barrio",
          "city"=>"Ciudad",
          "department"=>"Departamento",
          "phone"=>"Teléfono fijo",
          "cellphone"=>"Celular",
          "stratum"=>"Estrato",
          "email"=>"Correo electrónico",
          "education_level"=>"Nivel educativo",
          "date_into_employment"=>"Tiempo en el empleo",
          "business"=>"Empresa",
          "position"=>"Cargo",
          "salary"=>"Salario",
          "business_dependence"=>"Negocio o dependencia",
          "discount_amount"=>"Autoriza descontar del sueldo",
          "discount_amount_extra"=>"Porcentaje descuento del sueldo",
          "savings_program"=>"Programa de ahorros",
          "open_account"=>"Abrir cuenta",
          "open_account_amount"=>"Monto de apertura",
          "interest_cinema"=>"Interés en el cine",
          "interest_theater"=>"Interés en el teatro",
          "interest_concerts_shows"=>"Interés en el conciertos",
          "interest_subscriptions"=>"Interés en suscripciones",
          "interest_gym"=>"Interés en el gimnasio",
          "own_home"=>"Vivienda propia",
          "financed_home"=>"Vivienda financiada",
          "financed_home_bank"=>"El banco financiador de la vivienda",
          "own_vehicle"=>"Tiene vehiculo propio",
          "financed_vehicle"=>"Vehículo financiado",
          "financed_vehicle_bank"=>"Banco financiador del vehículo",
          "life_insurance"=>"Tiene seguros de vida",
          "life_insurance_bank"=>"Entidad seguro de vida",
          "funeral_insurance"=>"Desea tomar seguro exequial",
          "have_credit"=>"Tiene créditos",
          "have_credit_amount"=>"Si la respuesta es si en que rango (Millones)",
          "own_business"=>"Tiene algún tipo de negocio propio",
          "would_you_like_business"=>"Le gustaría tenerlo",
          "business_idea"=>"¿Cual es su idea de negocio?",
          "birth_spouse"=>"Fecha de nacimiento del cónyugue",
          "education_level_spouse"=>"Nivel educativo del cónyugue",
          "surnames_spouse"=>"Apellido del cónyugue",
          "spouse_names"=>"Nombres del cónyugue",
          "identification_expedition_date"=>"",
        ];



        $return = [] ;

        foreach ($array as $key => $value) {
          if (!empty($vars[$key]) && $vars[$key]!="null") {
            $return[$value]   =   $vars[$key];
          }
        }
        //p($return);

        return $return;

    }
}

if (! function_exists('p')) {
    function p($var,$exit=true)
    {
        echo '<pre>';
          print_r($var);
        echo '</pre>';
        if ($exit) {
          exit;
        }
    }
}

if (! function_exists('abstractionPost')) {
    function abstractionPost($request){
      $exceptions =   [ "pathname"=>true,
                        "created_at"=>true,
                        "updated_at"=>true,
                        "csrf_token"=>true,
                        "access_token"=>true];
      $return     =   [];
      foreach ($request->input() as $key => $value) {
        if (empty($exceptions[$key])) {
          $return[$key]=$value;
        }
      }
      return $return;
    }
}

if (! function_exists('dateFormatMysql')) {
    function dateFormatMysql($column,$format='%d/%m/%Y %H:%i %p',$alias=false){
      if ($alias) {
        return "DATE_FORMAT(".$column.",'".$format."') as ".$alias;
      }else {
        return "DATE_FORMAT(".$column.",'".$format."') as ".$column."_string";
      }

    }
}

if (! function_exists('selectRawStatus')) {
    function selectRawStatus($object,$column,$group="basic"){
      $object->leftjoin('ma_statuses', $column , '=', 'ma_statuses.value')->where("ma_statuses.group","=",$group);
      $object->selectRaw("ma_statuses.label AS ".str_replace(".","_",$column)."_string");
      return $object;
    }
}
