<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSlugToNotes extends Migration
{
    public function up()
    {
        Schema::table('notes', function($table)
        {
            $table->string('slug');
        });
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        Schema::table('notes', function($table)
        {
            $table->dropColumn('slug');
        });
    }
}
