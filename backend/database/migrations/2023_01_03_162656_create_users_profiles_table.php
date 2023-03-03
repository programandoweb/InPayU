<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->on('users')->references('id')->onDelete('cascade');
            $table->string('nombres')->nullable();
            $table->string('apellidos')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->integer('ma_genero_id')->unsigned();
            $table->foreign('ma_genero_id')->on('master_tables')->references('id')->onDelete('cascade');
            $table->string('razon_social')->nullable();
            $table->integer('ma_tipo_identificacion_id')->unsigned();
            $table->foreign('ma_tipo_identificacion_id')->on('master_tables')->references('id')->onDelete('cascade');
            $table->string('nro_identificacion', 20)->nullable();
            $table->string('nombre_representante_legal', 50)->nullable();
            $table->integer('ma_tipo_identificacion_representante_id')->nullable();
            //$table->foreign('ma_tipo_identificacion_representante_id')->on('master_tables')->references('id')->onDelete('cascade'); // lo comenté porque no puedo dejarlo en blanco
            $table->string('nro_identificacion_representante_legal', 20)->nullable();
            $table->string('lugar_expedicion', 100)->nullable();
            $table->date('fecha_expedicion')->nullable();
            $table->string('pregunta_seguridad', 100)->nullable();
            $table->string('respuesta_seguridad', 200)->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_profiles');
    }
}
