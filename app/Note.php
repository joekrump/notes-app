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
  protected $fillable = ['title', 'content', 'course_id', 'slug', 'status', 'original_note_id'];

  // list of subject names to search for in the title 
  // in priority order of presidence.
  protected static $subject_names = [
    'cold war',
    'wwii',
    'wwi',
    'enlightenment',
    'sheen',
    'saints',
    'noam chomsky'
  ];

  public function course()
  {
    return $this->belongsTo('\App\Course');
  }

  public function set_subject_name() {
    $title = strtolower($this->title);
    $this['courseName'] = null;

    $this['courseName'] = strtolower($this->course->name);

    foreach(Note::$subject_names as $subject_name){
      if(strpos($title, $subject_name) !== false){
        if($subject_name == 'wwii' && (strpos($title, 'japan') !== false)){
          $this['courseName'] = 'wwii_japanese';
        } else {
          $this['courseName'] = $subject_name;
        }
        break;
      }
    }
  }

  public function set_slug($title){
    $slug = str_slug($title);

    $num_with_slug = \App\Note::where('slug', $slug)->count();
    
    if($num_with_slug > 0){
      $slug = $slug . '-' . $num_with_slug;
    }

    $this->slug = $slug;
    return 0;
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
