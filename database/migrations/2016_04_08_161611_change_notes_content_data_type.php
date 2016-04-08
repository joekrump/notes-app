<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNotesContentDataType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE notes MODIFY COLUMN content MEDIUMTEXT');
    }

    public function down()
    {
        DB::statement('ALTER TABLE notes MODIFY COLUMN content TEXT');
    }   
}
