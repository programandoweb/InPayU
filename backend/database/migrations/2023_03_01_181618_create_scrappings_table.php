<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScrappingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scrappings', function (Blueprint $table) {
          $table->increments('id');
          $table->string('url')->default("")->nullable();
          $table->string('status')->default("standby")->nullable();
          $table->longtext('response')->default("")->nullable();
          $table->string('scrapear')->default("")->nullable();
          $table->string('response_scrapear')->default("")->nullable();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scrappings');
    }
}
