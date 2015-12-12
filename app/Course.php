<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'courses';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'year', 'instructor_id'];

	public function notes()
	{
		return $this->hasMany('\App\Note');
	}
}
