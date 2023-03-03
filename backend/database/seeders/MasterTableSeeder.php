<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class MasterTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $profesiones = array(
          array('label' => 'Cédula Ciudadanía',"grupo"=>"ma_tipo_identificacion"),
          array('label' => 'Cédula extranjería',"grupo"=>"ma_tipo_identificacion"),
          array('label' => 'Pasaporte',"grupo"=>"ma_tipo_identificacion"),
          array('label' => 'NIT',"grupo"=>"ma_tipo_identificacion"),
          array('label' => 'Mujer',"icon"=>"icon-femenino x3","grupo"=>"ma_tipo_identificacion"),
          array('label' => 'Hombre',"icon"=>"icon-masculino x3","grupo"=>"ma_tipo_identificacion"),
          array('label' => 'Pendiente',"grupo"=>"ma_estatus_id","value"=>"1"),
          array('label' => 'Activo',"grupo"=>"ma_estatus_id","value"=>"2"),
          array('label' => 'Pendiente',"grupo"=>"ma_estatus_id","value"=>"4"),
          array('label' => 'Pagado(a)',"grupo"=>"ma_estatus_id","value"=>"7"),
          array('label' => 'Inactivo',"grupo"=>"ma_estatus_id","value"=>"9"),
          array('label' => 'Rechazado',"grupo"=>"ma_estatus_id","value"=>"9000"),
          array('label' => 'Pendiente Soporte',"grupo"=>"ma_estatus_id","value"=>"9003"),
          array('label' => 'Billetera Móvil',"grupo"=>"ma_tipo_cuenta_id","value"=>"0"),
          array('label' => 'Cuentas inscritas',"grupo"=>"ma_tipo_cuenta_id","value"=>"0"),
          array('label' => 'COP',"grupo"=>"ma_moneda_id","value"=>"0"),
          array('label' => 'USD',"grupo"=>"ma_moneda_id","value"=>"0"),
          array('label' => 'EUR',"grupo"=>"ma_moneda_id","value"=>"0"),

          array('label' => 'Ahorro',"icon"=>"icon-ahorro","grupo"=>"ma_proposito_id"),
          array('label' => 'Estudio',"icon"=>"icon-educacion","grupo"=>"ma_proposito_id"),
          array('label' => 'Ocio',"icon"=>"icon-ocio","grupo"=>"ma_proposito_id"),
          array('label' => 'Provisiones',"icon"=>"icon-provisiones","grupo"=>"ma_proposito_id"),
          array('label' => 'Vacaciones',"icon"=>"icon-vacaciones","grupo"=>"ma_proposito_id"),
          array('label' => 'Arriendo/casa',"icon"=>"icon-casa","grupo"=>"ma_proposito_id"),
          array('label' => 'Automovil',"icon"=>"icon-automovil","grupo"=>"ma_proposito_id"),
          array('label' => 'Otro',"icon"=>"icon-otro","grupo"=>"ma_proposito_id"),


          array('label' => 'Ahorros',"grupo"=>"ma_tipo_cuentas_bancarias"),
          array('label' => 'Corriente',"grupo"=>"ma_tipo_cuentas_bancarias"),
          array('label' => 'Eliminado',"grupo"=>"ma_estatus_id","value"=>"9000"),
        );



      foreach($profesiones as $key => $value){
          DB::table('master_tables')->insert(
            [
              'label' => $value["label"],
              'value' => (!empty($value["value"]))?$value["value"]:0,
              'grupo' => $value["grupo"],
              'icon'  => (!empty($value["icon"]))?$value["icon"]:"",
            ]
          );
      }
    }
}
