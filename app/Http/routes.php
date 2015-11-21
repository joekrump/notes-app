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

// Notes
// 
Route::get('/notes', 							'NotesController@index');
Route::get('/notes/{note_id}', 		'NotesController@show');
Route::post('/notes', 						'NotesController@store');
Route::post('/notes/{note_id}', 	'NotesController@update');
Route::get('/notes/new', 					'NotesController@create');
Route::delete('/notes/{note_id}', 'NotesController@destroy');

// Courses 
// 
Route::get('/courses', 							'CoursesController@index');
Route::get('/courses/{course_id}', 	'CoursesController@show');
Route::get('/courses/new', 					'CoursesController@create');
Route::post('/courses', 						'CoursesController@store');
Route::post('/courses/{note_id}', 	'CoursesController@update');

// Cards
// 
Route::get('/cards/new', 										'CardsController@create');
Route::get('/cards/list', 									'CardsController@cards_list');
Route::get('/cards/{card_id}', 	'CardsController@show');
Route::get('/cards/category/{card_type}', 	'CardsController@index');
Route::post('/cards', 											'CardsController@store');
Route::post('/cards/{card_id}', 						'CardsController@update');
Route::delete('/cards/{card_id}', 					'CardsController@destroy');
Route::get('/cards/search/{search}', 'CardsController@search');


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