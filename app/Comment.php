<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public static $data = [
      ['author' => "Pete Hunt", 'text' => "This is one comment"],
      ['author' => "Jordan Walke", 'text' => "This is *another* comment"]
    ];

    public static function getData(){
        return $data;
    }
}
