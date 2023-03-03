<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('razon_social');
            $table->string('nit')->nullable();
            $table->string('representante_legal')->nullable();
            $table->string('representante_legal_tipo_identificacion')->nullable();
            $table->string('representante_legal_nro_identificacion')->nullable();
            $table->string('representante_legal_expedicion_identificacion')->nullable();
            $table->date('representante_legal_fecha_identificacion')->nullable();
            $table->string('celular')->nullable();
            $table->string('telefono')->nullable();
            $table->string('email')->nullable();
            $table->string('token')->unique();
            $table->string('payu_merchantId')->nullable()->default("");
            $table->string('payu_accountId')->nullable()->default("");
            $table->string('payu_buyerEmail')->nullable()->default("");
            $table->string('payu_responseUrl')->nullable()->default("");
            $table->string('payu_confirmationUrl')->nullable()->default("");
            $table->integer('payu_environment_dev')->nullable()->default(0);
            $table->integer('ma_estatus_id')->unsigned()->nullable()->default(8);
            $table->foreign('ma_estatus_id')->on('master_tables')->references('id')->onDelete('cascade');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });

        DB::unprepared('
            CREATE TRIGGER Generador_token_empresas BEFORE INSERT ON `empresas`
              FOR EACH ROW SET NEW.token = CONCAT ("user_", MD5(RAND()))');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empresas');
    }
}
