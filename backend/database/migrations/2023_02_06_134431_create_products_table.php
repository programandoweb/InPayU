<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('label');
            $table->longtext('description');
            $table->longtext('summary');
            $table->string('slug')->nullable()->default("");
            $table->decimal('price',15,2)->default(0)->nullable();
            $table->decimal('offer',15,2)->default(0)->nullable();
            $table->integer('categoria_id')->unsigned();
            $table->foreign('categoria_id')->on('products_categories')->references('id')->onDelete('cascade');
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
        Schema::dropIfExists('products');
    }
}
