<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'cards';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['latin', 'english', 'origin', 'lesson_num', 'type'];
}
