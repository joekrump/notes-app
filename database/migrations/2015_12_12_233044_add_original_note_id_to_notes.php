<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOriginalNoteIdToNotes extends Migration
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
            $table->integer('original_note_id')->unsigned();
            $table->index('original_note_id');
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
            $table->dropColumn('original_note_id');
            $table->dropIndex('original_note_id');
        });
    }
}
