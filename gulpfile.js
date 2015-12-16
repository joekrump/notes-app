var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass(['app.scss', 'latin.scss'], 'public/css/app.css');
    // mix.sass(['app.scss', 'materialize.scss'], 'public/css/app.css');

      // .version('public/css/app.css');
    // mix.sass('frontend.scss', 'public/css/frontend.css')
    //   .version('public/css/frontend.css');
    // mix.sass('backend.scss', 'public/css/backend.css')
    //   .version('public/css/backend.css');

    // Use .babel('somefile.js') to compile ES6 to plain js.
    // Note: In ES6 for example you can create classes. Check out more on babel's website: https://babeljs.io/docs/learn-es2015/

    // Use gulp watch to keep an eye on all the files that you are watching and auto compile when they are changed.
    // Use gulp --production to compile and minify.
    // mix.browserify("material-ui/index.js");

    // Note: We can concat ES6 scripts in the same way as above by substituting .babel for .scripts

    // In commandline running gulp tdd will watch all test files in phpUnit for example and run tests as any of the files
    // that are to be tested change.

    // To have phpSpec or phpUnit tests run through gulp, include .phpUnit() or phpSpec() (respectively)
    // Note: phpSpec is included out of the box in Laravel 5.
    //
    //
    mix.browserify('app.js', 'public/js/app.js')
    mix.browserify('nav.js', 'public/js/react-nav.js')
});
