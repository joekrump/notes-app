<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStatusToNotes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('notes', function($table)
        {
            $table->integer('status')->default(0); // can be 0,1 or 2. 0:active, 1:archived, 2:backup
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
            $table->dropColumn('status');
        });
    }
}
