<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

        <style>

        </style>
    </head>
    <body id="app">
        @yield('content')

        <script src="{{ asset('js/app.js') }}"></script>

        @yield('javascripts')
    </body>
</html>
