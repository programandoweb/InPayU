<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class LangsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $vars = array(
        array('label' => 'Español',"symbol"=>"es","ma_estatus_id"=>8),
        array('label' => 'English',"symbol"=>"en","ma_estatus_id"=>8),
      );

      foreach($vars as $key => $value){
        DB::table('langs')->insert($value);
      }
    }
}
