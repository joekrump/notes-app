<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function() {
	return view('dashboard');
});

Route::get('/comments', function(){
  // return response()->json(Comment::getData());
});

Route::get('/notes', 'NotesController@index');
Route::get('/notes/{note_id}', 'NotesController@show');
Route::post('/notes', 'NotesController@store');
Route::post('/notes/{note_id}', 'NotesController@update');
Route::get('/notes/new', 'NotesController@create');
Route::get('/courses', 'CoursesController@index');
Route::get('/courses/{course_id}', 'CoursesController@show');
Route::get('/courses/new', 'CoursesController@create');

Route::post('/comments', function(){
  // $initData = Comment::getData();
  $initData[] = Request::all();

  return response()->json($initData);
});

Route::get('admin', array('before' => 'auth', function()
{
    // Only authenticated users may enter...
}));


// Route::get('admin', ['middleware' => 'auth', function() {
//     // Only authenticated users may enter...
// }]);



// Route::post('register', array('before' => 'csrf', function()
// {
//     return 'You gave a valid CSRF token!';
// }));

Route::controllers([
  'auth'     =>'Auth\AuthController',
  'password' => 'Auth\PasswordController'
]);