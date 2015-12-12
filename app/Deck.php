<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'decks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $fillable = ['title'];

    public function cards()
    {
        return $this->belongsToMany('App\Card');
    }
}
