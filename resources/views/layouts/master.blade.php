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

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>

        <script type="text/javascript" src="{{ asset('js/all.js') }}"></script>

        @yield('javascripts')
    </body>
</html>
