<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id')->unsigned()->nullable()->default(0);
            $table->string('label');
            $table->string('slug')->nullable()->default("");
            $table->string('category')->nullable()->default("");
            $table->longText('content')->nullable()->default("");
            $table->longtext('summary')->default("")->nullable();
            $table->longText('image')->nullable()->default("uploads/fakes/empty.jpg");
            $table->longText('video')->nullable()->default("");
            $table->integer('langs_id')->unsigned();
            $table->integer('is_topic')->unsigned(0);
            $table->foreign('langs_id')->on('langs')->references('id')->onDelete('cascade');
            $table->integer('ma_estatus_id')->unsigned();
            $table->foreign('ma_estatus_id')->on('master_tables')->references('id')->onDelete('cascade');
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
        Schema::dropIfExists('contents');
    }
}
