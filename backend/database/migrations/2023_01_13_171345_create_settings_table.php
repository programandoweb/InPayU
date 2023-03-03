<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default("Programandoweb")->nullable();
            $table->string('logo')->default("")->nullable();
            $table->string('description')->default("")->nullable();
            $table->string('domain')->default("")->nullable();
            $table->string('email')->default("")->nullable();
            $table->string('phone')->default("")->nullable();
            $table->string('payu_merchantId')->default("508029")->nullable();
            $table->string('payu_accountId')->default("512321")->nullable();
            $table->string('payu_description')->default("Test PAYU")->nullable();
            $table->string('payu_referenceCode')->default("Test PAYU")->nullable();
            $table->string('payu_amount')->default("20000")->nullable();
            $table->string('payu_currency')->default("USD")->nullable();
            $table->string('payu_signature')->default("7ee7cf808ce6a39b17481c54f2c57acc")->nullable();
            $table->string('payu_test')->default("0")->nullable();
            $table->string('payu_buyerEmail')->default("info@programandoweb.net")->nullable();
            $table->string('payu_responseUrl')->default("https://backend.clickconexion.com/api/payU/responseUrl")->nullable();
            $table->string('payu_confirmationUrl')->default("https://backend.clickconexion.com/api/payU/confirmationUrl")->nullable();
            $table->string('payu_environment_dev')->default("https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/")->nullable();
            $table->string('payu_environment_prod')->default("https://checkout.payulatam.com/ppp-web-gateway-payu/")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}