<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class TokensSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $value=[
                "tokenable_type"=>"App\Models\User",
                "tokenable_id"=>"3",
                "name"=>"Access Tokens",
                "token"=>"d3934bb99b89aaffbc99947721c1f8943d575addbf8fdd043c42c1f62fdd56e6",
                "abilities"=>'["*"]',
                "last_used_at"=>"2023-01-13 01:13:41",
                "created_at"=>"2023-01-13 01:07:34",
                "updated_at"=>"2023-01-13 01:07:34"
            ];
      DB::table('personal_access_tokens')->insert($value);
    }
}
