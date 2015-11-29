<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCompleteFieldToCards extends Migration
{
    public function up()
    {
        Schema::table('cards', function($table)
        {
            $table->boolean('marked_complete')->default(0);
            $table->integer('word_type');
            $table->integer('word_category');
        });
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        Schema::table('cards', function($table)
        {
            $table->dropColumn('marked_complete');
            $table->dropColumn('word_type');
            $table->dropColumn('word_category');
        });
    }
}
