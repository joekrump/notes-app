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
  protected $fillable = ['title', 'content', 'course_id', 'slug', 'status'];

  public function course()
  {
    return $this->belongsTo('\App\Course');
  }

  public function status_text(){
    $status_text = 'unknown';
    switch($this->status){
      case 0:
        $status_text = 'active';
        break;
      case 1:
        $status_text = 'archive';
        break;
      case 2:
        $status_text = 'backup';
        break;
      default:
        break;
    }
    return $status_text;
  }
}
