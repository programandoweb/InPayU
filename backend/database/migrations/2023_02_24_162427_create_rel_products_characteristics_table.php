<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelProductsCharacteristicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rel_products_characteristics', function (Blueprint $table) {
          $table->increments('id');
          $table->string('name');
          $table->string('valor')->nullable();
          $table->integer('products_id')->unsigned();
          $table->foreign('products_id')->on('products')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rel_products_characteristics');
    }
}
