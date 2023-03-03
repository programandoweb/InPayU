<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(BancosSeeder::class);
        $this->call(MasterTableSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(LangsSeeder::class);
        $this->call(TokensSeeder::class);
        $this->call(SettingSeeder::class);
    }
}
