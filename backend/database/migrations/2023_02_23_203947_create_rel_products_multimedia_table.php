<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelProductsMultimediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rel_products_multimedia', function (Blueprint $table) {
          $table->increments('id');
          $table->string('label')->default("")->nullable();
          $table->longtext('summary')->default("")->nullable();
          $table->integer('products_id')->unsigned();
          $table->foreign('products_id')->on('products')->references('id')->onDelete('cascade');
          $table->integer('multimedia_id')->unsigned();
          $table->foreign('multimedia_id')->on('multimedia')->references('id')->onDelete('cascade');
          $table->integer('order')->unsigned()->default(1)->nullable();
          $table->integer('status')->unsigned()->default(1)->nullable();
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
        Schema::dropIfExists('rel_products_multimedia');
    }
}
