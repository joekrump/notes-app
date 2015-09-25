<!DOCTYPE html>
<html>
    <head>
        <title>Note Taking App</title>

        <!-- <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css"> -->
        @yield('stylesheets')
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

        <meta name="_token" content="{{ csrf_token() }}" />
        
    </head>
    <body>
        @yield('content')

        <script src="{{ asset('js/jquery-1.11.0.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        
        @yield('javascripts')
    </body>
</html>
