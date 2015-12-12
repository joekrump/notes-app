<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'notes';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['title', 'content', 'course_id', 'slug'];

  public function course()
  {
    return $this->belongsTo('\App\Course');
  }
}
