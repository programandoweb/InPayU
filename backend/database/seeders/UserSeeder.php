<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $super = User::create([
          'email' => 'system@programandoweb.net',
          'name'  => 'Bot',
          'celular'  => '3115000926',
          'avatar'=>'uploads/fakes/bestgreen-logo.jpg',
          'ma_estatus_id'=>8,
          'password' => \Hash::make('NoPasswordToThisAccount'),
      ]);
      $super->assignRole('Super Admin');

      $super = User::create([
          'email' => 'admin@programandoweb.net',
          'name'  => 'Admin',
          'celular'  => '3115000927',
          'avatar'=>'uploads/fakes/bestgreen-logo.jpg',
          'ma_estatus_id'=>8,
          'password' => \Hash::make('admin'),
      ]);
      $super->assignRole('Super Admin');

    }
}
