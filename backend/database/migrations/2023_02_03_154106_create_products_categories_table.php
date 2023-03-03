<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('label');
            $table->longtext('descripcion')->nullable()->default("Disfruta de las hiperofertas en Colchones ¡Ingresa ahora y compra ya! Estrena colchón pagando en línea y recibiendo en casa ¡Compra ahora!");
            $table->string('slug')->nullable()->default("");
            $table->integer('status')->default(1)->nullable()->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products_categories');
    }
}
