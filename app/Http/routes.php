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


Route::get('admin', array('before' => 'auth', function()
{
    // Only authenticated users may enter...
}));


// Route::post('register', array('before' => 'csrf', function()
// {
//     return 'You gave a valid CSRF token!';
// }));

Route::controllers([
  'auth'     =>'Auth\AuthController',
  'password' => 'Auth\PasswordController'
]);