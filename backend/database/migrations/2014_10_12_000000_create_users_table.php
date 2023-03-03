<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('celular')->unique();
            $table->string('avatar')->nullable()->default("uploads/system/avatar.png");
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('codigo_sms')->nullable()->default("9000");
            $table->integer('ma_estatus_id')->unsigned();
            $table->foreign('ma_estatus_id')->on('master_tables')->references('id')->onDelete('cascade');
            $table->string('token')->unique();
            $table->rememberToken();
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER Generador_token_usuarios BEFORE INSERT ON `users`
              FOR EACH ROW SET NEW.token = CONCAT ("user_", MD5(RAND()))');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
